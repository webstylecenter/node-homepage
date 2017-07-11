/**
 * @param app
 * @constructor
 */
var ControllerRouter = function (app) {
    /**
     * @param req   
     * @param res
     * @param next
     */
    var ControllerRoute = function (req, res, next) {
        res.render('controller', {room: req.params.room});
    };

    app.get('/:room/controller/', ControllerRoute);
};

/**
 * @type {ControllerRouter}
 */
module.exports = ControllerRouter;
