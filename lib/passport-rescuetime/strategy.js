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
  this._userProfileURL = options.userProfileURL || 'https://www.rescuetime.com/api/oauth/data/';
}

/**
 * Inherit from `OAuth2Strategy`.
 */
util.inherits(Strategy, OAuth2Strategy);


/**
 * Retrieve user profile from RescueTime.
 *
 * This function constructs a normalized profile, with the following properties:
 *
 *   - `provider`         always set to `rescuetime`
 *   - `id`               the user's RescueTime ID
 *   - `username`         the user's RescueTime username
 *   - `displayName`      the user's full name
 *   - `profileUrl`       the URL of the profile for the user on RescueTime
 *   - `emails`           the user's email addresses
 *
 * @param {String} accessToken
 * @param {Function} done
 * @api protected
 */
Strategy.prototype.userProfile = function(accessToken, done) {
  this._oauth2.get(this._userProfileURL, accessToken, function (err, body, res) {
    console.log(res);
    if (err) {       console.log("AHH "+error);
return done(new InternalOAuthError('failed to fetch user profile', err)); }

    try {
      console.log("heyhey " + body);
      var json = JSON.parse(body);
      console.log('YOYO ' + json);

      var profile = { provider: 'rescuetime' };
      // profile.id = json.id;
      // profile.displayName = json.name;
      // profile.username = json.login;
      // profile.profileUrl = json.html_url;
      // profile.emails = [{ value: json.email }];
      //
      // profile._raw = body;
      // profile._json = json;

      done(null, profile);
    } catch(e) {
      console.log('messed up: ' + e);
      done(e);
    }
  });
}


/**
 * Expose `Strategy`.
 */
module.exports = Strategy;
