var blueprint = require ('@onehilltech/blueprint')
  , expect    = require ('chai').expect
  ;

describe ('NoPageReturn', function () {
  it ('should return 404 when a nonexistent page is requested', function (done) {
    blueprint.testing.request ()
      .get ('/hellodoc')
      .expect (404, done);
  });
});
