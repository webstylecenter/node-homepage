/**
 * @param req the request
 * @param res the response
 * @param next next handler
 */
var notFoundHandler = function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
};

module.exports = notFoundHandler;