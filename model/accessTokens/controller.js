const accessTokenFacade = require("./facade");
const uid = require("uid2");

class AccessTokenController {}
module.exports = new AccessTokenController(accessTokenFacade);
