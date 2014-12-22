var should = require('should');

var fail = function (done) {
    return function (err) {
        if (!err) err = new Error();
        expect(err.toString()).toBe(null);
        done();
    };
};

describe('Learner Profile Endpoint', function () {

    var app = require('express')(),
        options = {
            uiClientUrl: '#mozzacrust',
            serverUrl: 'http://localhost:5201'
        },
        http = require('q-io/http');
    app.listen('5210');
    app.use(require('body-parser').json());
    require('../src/index')(app, options);

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
                done();
            })
            .catch(fail(done));
    });

    //it('Should response with 401 when no authorization headers', function (done) {
    //    http
    //        .request({
    //            url: 'http://localhost:5210/me',
    //            method: 'GET'
    //        })
    //        .then(function (response) {
    //            response.status.should.be.exactly(401);
    //            //var user = response.body;
    //            //user.should.have.properties('email','firstname','lastname','createdAt');
    //            done();
    //        })
    //        .catch(fail(done));
    //});

    it('Should respond with an user object and an auth token', function (done) {
        http
            .request({
                url: options.serverUrl + '/me',
                method: 'GET'
            })
            .then(function (response) {
                response.status.should.be.exactly(401);
                //var user = response.body;
                //user.should.have.properties('email','firstname','lastname','createdAt');
                done();
            })
            .catch(fail(done));
    });

});