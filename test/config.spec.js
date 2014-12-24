require('should');

describe('Config getter and setter',function(done){

    var config = require('../src/config');

    afterEach(function(){
        config.setOptions(undefined);
    });


    it('Should set the value of the config Object',function(){
        config.setOptions({
            serverUrl: 'aaaaaa',
            uiClientUrl:  'zzzzzz'
        });
        config.getOptions().should.have.type('object');
        config.getOptions().should.have.properties('serverUrl','uiClientUrl');
        //config.getOptions().foo.should.equal('bar');
    });
});