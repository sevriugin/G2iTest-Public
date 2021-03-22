module.exports = {
  "root": true,
  "parserOptions": {
    // Required for certain syntax usages
    "ecmaVersion": 2017,
  },
  "env": {
    es6: true,
    node: true,
  },
  "extends": [
    "eslint:recommended",
    "google",
  ],
  "rules": {
    "no-unused-vars": "off",
    "new-cap": "off",
    "camelcase": "off",
    "cap-is-new": "off",
    "quotes": ["error", "double"],
  },
};
