require('should');

var fail = function (done) {
    return function (err) {
        if (!err) err = new Error();
        expect(err.toString()).toBe(null);
        done();
    };
};

var app = require('express')(),
    options = {
        uiClientUrl: '#mozzacrust',
        serverUrl: 'http://localhost:5201'
    },
    http = require('q-io/http'),
    server;
app.use(require('body-parser').json());

describe('Learner Profile Endpoint', function () {

    beforeEach(function(){
        server = app.listen('5210');
        require('../src/index')(app, options);
    });


    afterEach(function(){
        server.close();
    });

    it('should respond with 400 when no Persona assertion', function (done) {
        http
            .request({
                url: 'http://localhost:5210/login',
                method: 'POST'
            })
            .then(function (response) {

                response.status.should.be.exactly(400);
                done();
            })
            .catch(fail(done));
    });

    it('should authenticate the user', function (done) {
        http
            .request({
                url: 'http://localhost:5210/login',
                method: 'POST',
                body: [
                    JSON.stringify({
                        assertion: 'FAKE ASSERTION'
                    })
                ],
                headers: {
                    'Content-Type' : 'application/json'
                }
            })
            .then(function (response) {
                response.status.should.be.exactly(200);
                return response.body.read();
            })
            .then(function(body){
                JSON.parse(body.toString()).user.should.have.properties('email','firstname','lastname');
                JSON.parse(body.toString()).token.should.have.type('string');
                token = body.toString().token;
                done();
            })
            .catch(fail(done));
    });

    it('Should response with 401 when no authorization headers', function (done) {
        http
            .request({
                url: 'http://localhost:5210/me',
                method: 'GET'
            })
            .then(function (response) {
                response.status.should.be.exactly(401);
                done();
            })
            .catch(fail(done));
    });

    it('Should respond with a 401 status when no auth token provided', function (done) {
        http
            .request({
                url: 'http://localhost:5210/me',
                method: 'GET'
            })
            .then(function (response) {
                response.status.should.be.exactly(401);
                done();
            })
            .catch(fail(done));
    });


    //todo make it pass
    it('Should respond with a 200 status and a user object',function(done){
        http
            .request({
                url: 'http://localhost:5210/login',
                method: 'POST',
                body: [
                    JSON.stringify({
                        assertion: 'FAKE ASSERTION'
                    })
                ],
                headers: {
                    'Content-Type' : 'application/json'
                }
            })
            .then(function (response) {
                return response.body.read();
            })
            .then(function(body) {
                http
                    .request({
                        url: 'http://localhost:5210/me',
                        method: 'GET',
                        headers: {
                            'Authorization' :'Bearer '+JSON.parse(body.toString()).token,
                            'Content-Type' : 'application/json'
                        }
                    })
                    .then(function (response) {
                        response.status.should.be.exactly(200);
                        return response.body.read();
                    })
                    .then(function(body){
                        JSON.parse(body.toString()).should.have.properties('email','firstname','lastname');
                        done();
                    })
                    .catch(fail(done));
            });



    })

});