# Passport-RescueTime

[Passport](http://passportjs.org/) strategy for authenticating with [RescueTime](https://rescuetime.com/)
using the OAuth 2.0 API.

This module lets you authenticate using RescueTime in your Node.js applications.
By plugging into Passport, RescueTime authentication can be easily and
unobtrusively integrated into any application or framework that supports
[Connect](http://www.senchalabs.org/connect/)-style middleware, including
[Express](http://expressjs.com/).

## Install

    $ npm install passport-rescuetime

## Usage

#### Configure Strategy

The RescueTime authentication strategy authenticates users using a RescueTime account
and OAuth 2.0 tokens.  The strategy requires a `verify` callback, which accepts
these credentials and calls `done` providing a user, as well as `options`
specifying a client ID, client secret, and callback URL.

```js
    passport.use(new RescueTimeStrategy({
        clientID: RESCUETIME_CLIENT_ID,
        clientSecret: RESCUETIME_CLIENT_SECRET,
        callbackURL: "http://127.0.0.1:3000/auth/rescuetime/callback"
      },
      function(accessToken, refreshToken, profile, done) {
        User.findOrCreate({ .. }, function (err, user) {
          return done(err, user);
        });
      }
    ));
```

Note that RescueTime does not return user profile information so the profile
option will remain empty.

#### Authenticate Requests

Use `passport.authenticate()`, specifying the `'rescuetime'` strategy, to
authenticate requests.

For example, as route middleware in an [Express](http://expressjs.com/)
application:

```js
    app.get('/auth/rescuetime',
      passport.authenticate('rescuetime'));

    app.get('/auth/rescuetime/callback',
      passport.authenticate('rescuetime', { failureRedirect: '/login' }),
      function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
      });
```

## Credits

  - [Ben Brook](http://github.com/bencmbrook)
  - [Jared Hanson](https://github.com/jaredhanson)

## License

[The MIT License](http://opensource.org/licenses/MIT)

