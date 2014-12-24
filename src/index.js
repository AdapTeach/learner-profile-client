var authVerifier = require('./lib/verifier'),
    config = require('./config'),
    middleware = require('./lib/middleware');

module.exports = function(app,options){
    if(!options){
        throw new Error('missing the options parameter');
    }else{
        config.setOptions(options);
        app.post('/login', function (request, response) {
            if(!request.body || !request.body.assertion){
                response.status(400).send('must provide an assertion');
                return;
            }
            authVerifier.verify(request.body.assertion)
                .then(function authenticateIfOkay(user) {
                    response.json(user);
                })
                .catch(function (error) {
                    response.status(500).send(error);
                });
        });
        app.get('/me', middleware.ensureAuthenticated,function(request,response){
            response.json(request.user);
        })
    }
};
