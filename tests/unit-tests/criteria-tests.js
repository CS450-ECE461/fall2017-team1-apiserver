
var blueprint = require ('@onehilltech/blueprint'),
expect    = require ('chai').expect;

describe ( "MatchCriteriaTest", function() {
    describe ( "update status", function() {
        it ('should return a 200 after updating that matchCriteria status', function (done) {
            blueprint.testing.request ()
                .put ('/v1/user/5a069b13bd9143509882c583/status')
                .send ({
                    "status":"adventurous"
                }).expect (200, done);

        });
    });

});