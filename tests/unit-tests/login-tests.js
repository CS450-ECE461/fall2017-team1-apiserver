//login-tests.js

var blueprint = require ('@onehilltech/blueprint')
  , expect    = require ('chai').expect
  ;

describe ( 'LoginTestReturn', function() {
  it ('Should return a 200 http code when a valid registration is made.', function (done) {
    blueprint.testing.request ()
      .post ('/gatekeeper/v1/oauth2/token')
      .send ({
        'grant_type': 'password',
        'client_id': blueprint.app.configs.environment.environment.client_id,
        'username': blueprint.app.seeds.$default.accounts[0].username,
        'password': blueprint.app.seeds.$default.accounts[0].username
      })
      .expect (200, done);
  });
});

describe ( 'LoginTestReturn', function() {
  it ('Should return a 400 http code when a bad request is made.', function (done) {
    blueprint.testing.request ()
      .post ('/gatekeeper/v1/oauth2/token')
      .send ({
        'grant_type': 'password',
        'client_id': blueprint.app.configs.environment.environment.client_id,
        'username': blueprint.app.seeds.$default.accounts[0].username,
        'password': blueprint.app.seeds.$default.accounts[0].username + "No"
      })
      .expect (400, done);
  });
});

describe ( 'LoginTestContent', function() {
  it ('Should return an access token and refresh token when given valid credentials.', function (done) {
    blueprint.testing.request ()
      .post ('/gatekeeper/v1/oauth2/token')
      .send ({
        'grant_type': 'password',
        'client_id': blueprint.app.configs.environment.environment.client_id,
        'username': blueprint.app.seeds.$default.accounts[0].username,
        'password': blueprint.app.seeds.$default.accounts[0].username
      })
      .expect (200)
      .end(function(err, res){
        expect(res.body).to.have.property("token_type", "Bearer");
        expect(res.body).to.have.property("access_token");
        expect(res.body.access_token).to.not.equal(null);
        expect(res.body).to.have.property("refresh_token");
        expect(res.body.refresh_token).to.not.equal(null);
        done();      
      });
  });
});
