//registry-tests.js

var blueprint = require ('@onehilltech/blueprint')
  , expect    = require ('chai').expect
  ;

describe ( "RegTestReturn", function() {
  it ('Should return a 200 http code when a valid registration is made.', function (done) {
    blueprint.testing.request ()
      .post ('/v1/reg')
      .send ({
        FirstName : 'test',
        LastName : 'test',
        Email : 'test@gmail.com',
        Password : 'No'
      })
      .expect (200, done);
        
  });
});

describe ( "RegTestContent", function() {
  it ('Should return a valid user variable when a valid registration is made.', function (done) {
    blueprint.testing.request ()
      .post ('/v1/reg')
      .send ({
        FirstName : 'Johnny',
        LastName : 'Carlo',
        Email : 'tijohask@gmail.com',
        Password : 'No'
      })
      .expect (function(res) {
        if(!(res.body.length == 24)) throw new Error("The given key doesn't look quite right");      
      })
      .end(done);        
  });
});


