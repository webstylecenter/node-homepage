/**
 * @param err error
 * @param req the request
 * @param res the response
 * @param next next handler
 */
var errorHandler = function(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.render('error');
};

module.exports = errorHandler;