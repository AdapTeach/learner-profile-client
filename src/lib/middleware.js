var verifier = require('./verifier');

var authMiddleware = {};

authMiddleware.ensureAuthenticated = function (req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).send({message: 'Please make sure your request has an Authorization header'});
    }

    var token = req.headers.authorization.split(' ')[1];
    verifier.decodeToken(token)
        .then(function(user){
            req.user = user;
            next();
        });
};

module.exports = authMiddleware;