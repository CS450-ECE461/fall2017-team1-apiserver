var blueprint = require ('@onehilltech/blueprint'),
expect    = require ('chai').expect;

describe ( "MatchTest", function() {
    describe ( "Match True", function() {
        it ('Should return a 200 with a response of matching true', function (done) {
            blueprint.testing.request ()
                .post ('/v1/user/5a069b13bd9143509882c583/match')
                .send ({
                        "id":"5a069b13bd9143509882c584",
                        "liked": true
                })
                .expect(200)
                .end(function(err, res){
                    // check to see if the list messages is returned true
                    expect(res.body).to.have.property('matched', true);
                    done();
                });

        });
    });

    describe ( "Match False", function() {
        it ('Should return a 200 with a response of matching false', function (done) {
            blueprint.testing.request ()
                .post ('/v1/user/5a069b13bd9143509882c583/match')
                .send ({
                    "id":"5a069b13bd9143509882c584",
                    "liked": false
                })
                .expect(200)
                .end(function(err, res){
                    // check to see if the list messages is returned false
                    expect(res.body).to.have.property('matched', false);
                    done();
                });
    
        });
    });

});