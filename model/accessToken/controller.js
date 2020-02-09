const OAuth2Server = require('oauth2-server');
const accessTokenFacade = require('./facade');
const { Request } = OAuth2Server;
const { Response } = OAuth2Server;

class AccessTokenController {
  async obtainToken(req, res, next) {
    // https://github.com/oauthjs/node-oauth2-server/issues/428
    req.body.client_id = 'application';
    const request = new Request(req);
    const response = new Response(res);
    return app.oauth
      .token(request, response)
      .then(async (token) => {
        token.memberId = token.user.id;
        token.roles = await token.user.getRoles();
        delete token.client;
        delete token.user;
        res.json(token);
      })
      .catch((err) => {
        const error = new Error(err.message);
        if (err.message === 'Member not found') {
          err.code = 204;
        }
        if (err.inner) {
          error.message = err.inner.message;
          error.statusCode = err.inner.statusCode;
        }
        if (!error.statusCode) error.statusCode = 403;
        return next(error);
      });
  }
}

module.exports = new AccessTokenController(accessTokenFacade);
