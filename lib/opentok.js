const OpenTok = require('opentok');

const API_KEY = process.env.OPENTOK_API_KEY;
const API_SECRET = process.env.OPENTOK_API_SECRET;

const opentok = new OpenTok(API_KEY, API_SECRET);

module.exports = opentok;
