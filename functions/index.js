const functions = require("firebase-functions");
const {error, warn, info, log} = require("firebase-functions/lib/logger");

const bodyParser = require("body-parser");
const express = require("express");
const ejs = require("ejs");
const app = express();
const FuzzySet = require("fuzzyset");
const FUZZY_SCORE = 0.5; // minimum scoree to serach match
const crypto = require("crypto");

// test only
const API_SECRET = "4ce97915-0df7-4d27-b2a6-6eb350d4b932";
const API_TOKEN = "61dcc619-97ef-4198-b132-bd70d7380244";

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// admin interface
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);

const cors = require("cors")({
  origin: true,
});

app.use(cors);

app.use((req, res, next) => {
  info("API V1: ", {
    method: req.method,
    url: req.originalUrl,
  });
  next();
});

exports.api = functions.https.onRequest(app);

const data = require("./data.json");

app.post("/echo", async (request, response) => {
  const requestBody = request.body;

  response.status(200).json(requestBody);
});

/**
 * Add acronym to Firebase
 * @param {string} name acronym name.
 * @param {string} definition acronym definition.
 * @return {reference} reference to the new document.
 */
async function addAcronym(name, definition) {
  const acronyms = admin.firestore().collection("acronyms");
  const acronym = {name, definition};

  try {
    const ref = await acronyms.add(acronym);
    return ref;
  } catch (e) {
    error(e);
    return null;
  }
}

app.post("/load", async (request, response) => {
  info("Data load...");
  let count = 0;

  if (data.length === 0 ) {
    response.status(200).json({count});
  }

  data.forEach(async (item) => {
    const name = Object.keys(item)[0];
    const definition = item[name];

    try {
      const ref = await addAcronym(name, definition);
      count += 1;
      if (count === data.length) {
        response.status(200).json({count});
      }
    } catch (e) {
      error(e);
      response.status(500).send({error: e});
    }
  });
});

/**
 * Get all acronyms from Firebase that fuzzy match against search parameter
 * @param {string} search seach string yo match
 * @return {[string]} acronym array
 */
async function getAcronyms(search) {
  const acronyms = admin.firestore().collection("acronyms");
  try {
    const snapshot = await acronyms.get();

    if (snapshot.empty) {
      info("No acronyms has been found");
      return [];
    }
    const items = [];
    snapshot.forEach((doc) => {
      items.push(doc.data());
    });

    if (!search) {
      return items;
    }

    const a = FuzzySet();
    const result = [];
    a.add(search);
    info(a.get(search));

    items.forEach((item) => {
      const {name} = item;
      const match = a.get(name);

      if (match) {
        const [score, matched_value] = match[0];

        if (score > FUZZY_SCORE) {
          result.push(item);
        }
      }
    });
    return result;
  } catch (e) {
    error(e);
    return null;
  }
}

/**
 * Compact map acronym object from {name, definition}
 * @param {[{name,definition}]} items input acronyms array to compact
 * @return {[acronym]} acronym compact array
 */
function compactAcronyms(items) {
  return items.map((item) => {
    const acronym = {};
    const {name, definition} = item;
    acronym[name] = definition;
    return acronym;
  });
}

/**
  GET /acronym?from=50&limit=10&search=:search
**/
app.get("/acronym", async (request, response) => {
  const from = parseInt(request.query.from, 10);
  const limit = parseInt(request.query.limit, 10);
  const search = request.query.search;
  info("from", from);
  info("limit", limit);
  info("search", search);
  try {
    const seachResult = await getAcronyms(search);
    const start = Number.isNaN(from) ? 0 : from;
    const end = Number.isNaN(limit) ? seachResult.length : start + limit;
    info(start, start);
    info(end, end);
    const result = compactAcronyms(seachResult.slice(start, end));
    const count = result.length;
    const total = seachResult.length;
    response.set("X-Total-Count", `${total}`);
    response.status(200).json({start, end, count, total, result});
  } catch (e) {
    error(e);
    response.status(500).send({error: e});
  }
});


/**
 * Get acronym document for given acronym
 * @param {string} name acronym
 * @return {acronym} acronym record {name, definition}
 */
async function getAcronym(name) {
  const acronyms = admin.firestore().collection("acronyms");
  const query = acronyms.where("name", "==", name);

  try {
    const snapshot = await query.get();

    if (snapshot.empty) {
      info("No acronyms has been found");
      return null;
    }

    return snapshot.docs[0].data();
  } catch (e) {
    error(e);
    return null;
  }
}

/**
 * Get acronym document reference for given acronym
 * @param {string} name acronym
 * @return {reference} acronym record reference {name, definition}
 */
async function getAcronymRef(name) {
  const acronyms = admin.firestore().collection("acronyms");
  const query = acronyms.where("name", "==", name);

  try {
    const snapshot = await query.get();

    if (snapshot.empty) {
      info("No acronyms has been found");
      return null;
    }

    return snapshot.docs[0].ref;
  } catch (e) {
    error(e);
    return null;
  }
}

/**
 * Compact map acronym object from {name, definition}
 * @param {{name,definition}} item input acronyms to compact
 * @return {acronym} acronym
 */
function compactAcronym(item) {
  const acronym = {};
  const {name, definition} = item;
  acronym[name] = definition;
  return acronym;
}

/**
  GET /acronym/:acronym
**/
app.get("/acronym/:acronym", async (request, response) => {
  const name = request.params.acronym;
  info("acronym", name);
  try {
    const searchResult = await getAcronym(name);

    if (!searchResult) {
      response.status(204).send();
      return;
    }

    const result = compactAcronym(searchResult);

    response.status(200).json({result});
  } catch (e) {
    error(e);
    response.status(500).send({error: e});
  }
});

/**
 * Rundom shuffle array
 * @param {[Any]} array input array to shuffle
 * @return {[Any]} result array shaffled
 */
function shuffle(array) {
  let currentIndex = array.length; let temporaryValue; let randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

/**
  GET /random/:count?
**/
app.get("/random/:count?", async (request, response) => {
  const count = request.params.count;
  info("count", count);

  let limit = 1;

  if (count) {
    limit = parseInt(count, 10);

    if (Number.isNaN(limit)) {
      limit = 1;
    }
  }

  try {
    const seachResult = await getAcronyms(null);
    const shuffled = shuffle(seachResult);
    const start = 0;
    const end = start + limit;
    const result = compactAcronyms(shuffled.slice(start, end));
    const count = result.length;
    const total = seachResult.length;
    response.set("X-Total-Count", `${total}`);
    response.status(200).json({start, end, count, total, result});
  } catch (e) {
    error(e);
    response.status(500).send({error: e});
  }
});

/**
  POST /acronym
**/
app.post("/acronym", async (request, response) => {
  const requestBody = request.body;
  const acronym = requestBody.acronym;
  const definition = requestBody.definition;
  try {
    const ref = await addAcronym(acronym, definition);
    response.status(200).json({acronym, definition});
  } catch (e) {
    error(e);
    response.status(500).send({error: e});
  }
});

/**
 * Check if signature is valid
 * @param {{signature, secret, payload}} data input data for signature check
 * @return {bool} result for signature check
 */
function isSignatureValid(data) {
  const {signature, secret} = data;
  let {payload} = data;

  if (data.payload.constructor === Object) {
    payload = JSON.stringify(data.payload);
  }
  if (payload.constructor !== Buffer) {
    payload = new Buffer.from(payload, "utf8");
  }
  const hash = crypto.createHash("sha256");
  hash.update(payload);
  hash.update(new Buffer.from(secret));
  const digest = hash.digest("hex");
  return digest === signature.toLowerCase();
}

/**
 * Genereate signature
 * @param {Object} payload input data for signature generation
 * @param {string} secret secret
 * @return {string} signature for data and secret
 */
function generateSignature(payload, secret) {
  if (payload.constructor === Object) {
    payload = JSON.stringify(payload);
  }

  if (payload.constructor !== Buffer) {
    payload = Buffer.from(payload, "utf8");
  }

  const signature = crypto.createHash("sha256");
  signature.update(payload);
  signature.update(new Buffer.from(secret, "utf8"));
  return signature.digest("hex");
}

/**
  PUT /acronym/:acronym
**/
app.put("/acronym/:acronym", async (request, response) => {
  const name = request.params.acronym;
  const payload = request.body;
  const acronym = request.body.acronym;
  const definition = request.body.definition;
  const signature = request.get("x-signature");
  const secret = API_SECRET;
  const isValid = isSignatureValid({signature, secret, payload});
  info("signature", signature);
  info("secret", secret);
  info("payload", payload);
  info("isValid", isValid);

  if (!isValid) {
    response.status(401).send({
      error: "Server Not Authorized. Please check your server permission."});
    return;
  }

  try {
    const ref = await getAcronymRef(name);
    if (!ref) {
      response.status(204).send();
      return;
    }
    const result = await ref.set({name: acronym, definition}, {merge: true});

    response.status(200).send();
  } catch (e) {
    error(e);
    response.status(500).send({error: e});
  }
});

/**
  DELETE /acronym/:acronym
**/
app.delete("/acronym/:acronym", async (request, response) => {
  const name = request.params.acronym;
  const signature = request.get("x-signature");
  const secret = API_SECRET;

  info("signature", signature);
  info("secret", secret);
  info("name", name);

  try {
    const ref = await getAcronymRef(name);
    if (!ref) {
      response.status(204).send();
      return;
    }
    const snapshot = await ref.get();
    const {name: acronym, definition} = snapshot.data();
    const payload = {acronym, definition};
    info("payload", payload);
    const isValid = isSignatureValid({signature, secret, payload});

    if (!isValid) {
      response.status(401).send({
        error: "Server Not Authorized. Please check your server permission."});
      return;
    }

    const res = await ref.delete();

    response.status(200).send();
  } catch (e) {
    error(e);
    response.status(500).send({error: e});
  }
});
