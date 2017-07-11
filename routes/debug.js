/**
 * @param app
 * @constructor
 */
var DebugRouter = function (app) {
    /**
     * @param req   
     * @param res
     * @param next
     */
    var ResetTimeStartedRoute = function (req, res, next) {
        app.globals = {
            runtime: {
                timeStarted: Date.now()
            },
        };

        res.end('Done, refresh (F5)');
    };

    app.get('/debug/update-timestart', ResetTimeStartedRoute);
};

/**
 * @type {DebugRouter}
 */
module.exports = DebugRouter;
