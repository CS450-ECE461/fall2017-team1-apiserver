
var blueprint = require ('@onehilltech/blueprint'),
expect    = require ('chai').expect;

describe ( "MessageTest", function() {
describe ( "getConversation", function() {
    it ('Should return a 200 and an array of messages between user0 and user1', function (done) {
        blueprint.testing.request ()
            .get ('/v1/messages/5a069b13bd9143509882c581?userId=5a069b13bd9143509882c583')
            .expect (200)
            .end(function(err, res){
                // check to see if the list messages is returned
                expect(res.body[0]).to.have.property('to');
                expect(res.body[0]).to.have.property('from');
                expect(res.body[0]).to.have.property('message');
                done();
            });

    });
});

describe ( "createMessage", function() {
    it ('Should return a 201 and send a new message from user2 to user4', function (done) {
        blueprint.testing.request ()
            .post ('/v1/messages/5a069b13bd9143509882c584')
            .send({
                "to":"5a069b13bd9143509882c585",
                "message":"new message"
            })
            .expect (201, done);
    });
});

});