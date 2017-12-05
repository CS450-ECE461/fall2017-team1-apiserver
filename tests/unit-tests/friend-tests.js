
var blueprint = require ('@onehilltech/blueprint'),
    expect    = require ('chai').expect;

describe ( "FriendTest", function() {
    describe ( "getFriend", function() {
        it ('Should return a 200 and a list of friends for user 2', function (done) {
            blueprint.testing.request ()
                .get ('/v1/friend/5a069b13bd9143509882c584')
                .expect (200)
                .end(function(err, res){
                    // check to see if the list of friends is returned
                    expect(res.body[0]).to.have.property('user1');
                    expect(res.body[0]).to.have.property('user2');
                    done();
                });

        });
    });

    describe ( "postFriend", function() {
        it ('Should return a 201 and create a new friendship between user 2 and 4', function (done) {
            blueprint.testing.request ()
                .post ('/v1/friend/5a069b13bd9143509882c584')
                .send({
                    "user2": "5a069b13bd9143509882c585"
                })
                .expect (201)
                .end(function(err, res){
                    // assert the newly created friendship
                    expect(res.body).to.have.property('user1', '5a069b13bd9143509882c584');
                    expect(res.body).to.have.property('user2', '5a069b13bd9143509882c585');
                    done();
                });
        });
    });

});