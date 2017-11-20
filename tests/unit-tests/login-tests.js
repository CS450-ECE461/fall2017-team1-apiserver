//login-tests.js

var blueprint = require ('@onehilltech/blueprint')
  , expect    = require ('chai').expect
  ;

//Maybe there is a way to refer to the username and password in question rather than just hard coding it.
//TODO: look into that.

describe ( 'LoginTestReturn', function() {
  it ('Should return a 200 http code when a valid registration is made.', function (done) {
    blueprint.testing.request ()
      .post ('/gatekeeper/v1/oauth2/token')
      .send ({
        'grant_type': 'password',
        'client_id': '5a03e9fdd2900e1af884c34f',
        'username': 'tester1',
        'password': 'tester1'
      })
      .expect (200, done);
        
  });
});

describe ( 'LoginTestContent', function() {
  it ('Should return an access token and refresh token when given valid credentials.', function (done) {
    blueprint.testing.request ()
      .post ('/gatekeeper/v1/oauth2/token')
      .send ({
        'grant_type': 'password',
        'client_id': '5a03e9fdd2900e1af884c34f',
        'username': 'tester1',
        'password': 'tester1'
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
