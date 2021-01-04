require('dotenv')
  .config();
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

const publicKEY = fs.readFileSync(
  path.join(`${__dirname}/keys/public.key`),
  'utf8',
);
const privateKEY = fs.readFileSync(
  path.join(`${__dirname}/keys/private.key`),
  'utf8',
);

const { issuer } = process.env;
const { subject } = process.env;
const { audience } = process.env;

module.exports = {
  sign: (payload) => {
    const signOptions = {
      issuer,
      subject,
      audience,
      expiresIn: '30d',
      algorithm: 'RS256',
    };
    return jwt.sign(
      payload,
      {
        key: privateKEY,
        passphrase: process.env.key_pass_phrase,
      },
      signOptions,
    );
  },
  verify: (token) => {
    try {
      return jwt.verify(token, publicKEY);
    } catch {
      return false;
    }
  },
};
