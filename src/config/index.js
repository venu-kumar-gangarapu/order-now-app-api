require('dotenv').config();

module.exports = {
  port: process.env.PORT,
  db: {
    uri:process.env.DB_URI
  },
  jwt: process.env.JWT,
  pass: process.env.PASS
};