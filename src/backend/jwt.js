require('dotenv').config()
const fs = require('fs')
const path = require('path')
const jwt = require('jsonwebtoken')

const publicKEY = fs.readFileSync(
  path.join(__dirname + '/keys/public.key'),
  'utf8'
)
const privateKEY = fs.readFileSync(
  path.join(__dirname + '/keys/private.key'),
  'utf8'
)

const issuer = process.env.issuer
const subject = process.env.subject
const audience = process.env.audience

module.exports = {
  sign: (payload) => {
    const signOptions = {
      issuer: issuer,
      subject: subject,
      audience: audience,
      expiresIn: '30d',
      // expiresIn: "10s",
      algorithm: 'RS256',
    }
    return jwt.sign(
      payload,
      {
        key: privateKEY,
        passphrase: process.env.key_pass_phrase,
      },
      signOptions
    )
  },
  verify: (token) => {
    try {
      return jwt.verify(token, publicKEY)
    } catch {
      return false
    }
  },
}
