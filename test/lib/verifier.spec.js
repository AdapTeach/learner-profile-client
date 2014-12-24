require('should');

describe('verifier component',function(){

    var verifier = require('../../src/lib/verifier');

    it('Should respond with a user object and a token',function(done){
        verifier
            .verify('fake assertion')
            .then(function(response){
                response.user.should.have.properties('email','firstname','lastname');
                response.token.should.have.type('string');
                done()
            })
    });
});