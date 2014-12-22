var authVerifier = require('./lib/verifier'),
    config = require('./config');

module.exports = {
    init :function(app,options){
        if(!options){
            throw new Error('missing the options parameter');
        }else{
            config.setOptions(options);
            app.post('/login', function (request, response) {
                authVerifier.verify(request.body.assertion)
                    .then(function authenticateIfOkay(user) {
                        response.json(user);
                    })
                    .catch(function (error) {
                        console.log(error);
                        response.status(500).send(error);
                    });
            });
        }

    },
    middleware: require('./lib/middleware')
};