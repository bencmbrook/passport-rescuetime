/**
 * Module dependencies.
 */
var util = require('util')
  , OAuth2Strategy = require('passport-oauth').OAuth2Strategy
  , InternalOAuthError = require('passport-oauth').InternalOAuthError;


/**
 * `Strategy` constructor.
 *
 * The RescueTime authentication strategy authenticates requests by delegating to
 * RescueTime using the OAuth 2.0 protocol.
 *
 * Applications must supply a `verify` callback which accepts an `accessToken`,
 * `refreshToken` and service-specific `profile`, and then calls the `done`
 * callback supplying a `user`, which should be set to `false` if the
 * credentials are not valid.  If an exception occured, `err` should be set.
 *
 * Options:
 *   - `clientID`      your RescueTime application's Client ID
 *   - `clientSecret`  your RescueTime application's Client Secret
 *   - `callbackURL`   URL to which RescueTime will redirect the user after granting authorization
 *   - `scope`         array of permission scopes to request.  valid scopes include:
 *                     'time_data', 'category_data', 'productivity_data', 'alert_data', 'highlight_data', 'focustime_data', or none.
 *                     (see https://www.rescuetime.com/apidoc#connection-methods for more info)
 *
 * Examples:
 *
 *     passport.use(new RescueTimeStrategy({
 *         clientID: '123-456-789',
 *         clientSecret: 'shhh-its-a-secret'
 *         callbackURL: 'https://www.example.net/auth/rescuetime/callback',
 *         userAgent: 'myapp.com'
 *       },
 *       function(accessToken, refreshToken, profile, done) {
 *         User.findOrCreate(..., function (err, user) {
 *           done(err, user);
 *         });
 *       }
 *     ));
 *
 * @param {Object} options
 * @param {Function} verify
 * @api public
 */
function Strategy(options, verify) {
  options = options || {};
  options.authorizationURL = options.authorizationURL || 'https://www.rescuetime.com/oauth/authorize/';
  options.tokenURL = options.tokenURL || 'https://www.rescuetime.com/oauth/token/';
  options.scopeSeparator = options.scopeSeparator || ' ';

  OAuth2Strategy.call(this, options, verify);
  this.name = 'rescuetime';
}

/**
 * Inherit from `OAuth2Strategy`.
 */
util.inherits(Strategy, OAuth2Strategy);


/**
 * Expose `Strategy`.
 */
module.exports = Strategy;
