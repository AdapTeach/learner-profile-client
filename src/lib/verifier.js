var config = require('../config.js').getOptions(),
    http = require('q-io/http'),
    q = require('q'),
    authVerifier = {};

authVerifier.verify = function (assertion) {
    var options = {
        url: config.serverUrl+'/login',
        method: 'POST',
        body: [
            JSON.stringify({
                assertion: assertion,
                audience: config.uiClientUrl
            })
        ],
        headers: {
            'Content-Type': 'application/json'
        }
    };
    return http.request(options)
        .then(function (verificationResult) {
            return verificationResult.body.read().then(function (body) {
                return JSON.parse(body);
            });
        });
};

authVerifier.decodeToken = function (token) {
    var deferred = q.defer();
    var options = {
        url: config.authUrl + '/me',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    };
    http.request(options)
        .then(function (verificationResult) {
            verificationResult.body.read().then(function (body) {
                deferred.resolve(JSON.parse(body));
            });
        });
    return deferred.promise;
};

module.exports = authVerifier;