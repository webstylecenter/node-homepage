/**
 * @param app
 * @constructor
 */
var IndexRouter = function (app) {
    /**
     * @param req   
     * @param res
     * @param next
     */
    var IndexRoute = function (req, res, next) {
        res.render('index', {app: app.globals});
    };

    app.get('/', IndexRoute);
};

/**
 * @type {IndexRouter}
 */
module.exports = IndexRouter;
