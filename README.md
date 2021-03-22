# G2i Test

## React Web - Trivia Game.

https://g2itest.web.app

## NodeJS - Messaging acronyms.

Postman Collection: <a href="https://raw.githubusercontent.com/sevriugin/G2iTest/main/G2i-Test.postman_collection.json" download>Click to download</a>

Postman Enviroment: <a href="https://raw.githubusercontent.com/sevriugin/G2iTest/main/G2i-Test.postman_environment.json" download>Click to download</a>

### Search 

https://us-central1-g2itest.cloudfunctions.net/api/acronym?from=0&limit=10&search=asap

### Get

https://us-central1-g2itest.cloudfunctions.net/api/acronym/AAK

### Rundom

https://us-central1-g2itest.cloudfunctions.net/api/random/100

### Add

https://us-central1-g2itest.cloudfunctions.net/api/acronym

body:
```
{
    "acronym": "ttt",
    "definition": "test test test"
}
```

## Update

https://us-central1-g2itest.cloudfunctions.net/api/acronym/ttt

body:
```
{
    "acronym": "ttt",
    "definition": "test test test and test"
}
```
header:
```
x-auth-client: 61dcc619-97ef-4198-b132-bd70d7380244
x-signature: 13bf54fe83da3707e58ee0989dcfcab4d55d59d6998c839025aca12dbb24c478
```


### Delete

https://us-central1-g2itest.cloudfunctions.net/api/acronym/ttt

header:
```
x-auth-client: 61dcc619-97ef-4198-b132-bd70d7380244
x-signature: 13bf54fe83da3707e58ee0989dcfcab4d55d59d6998c839025aca12dbb24c478
```

### Generate Signature 
```
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
```
