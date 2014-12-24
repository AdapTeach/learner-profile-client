require('should');

describe('middleware component',function(){

    //todo find how to test this shit !!
    var middleware = require('../../src/lib/middleware'),
        request = {
            headers : ''
        },
        response = {
            status: function(){
                return {
                    send: function(){

                    }
                }
            }
        },
        cb = function(){

        };

    it('Should respond give the response a 401 status',function(){

    });
});