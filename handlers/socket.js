/**
 * @param app
 * @param socket
 * @constructor
 */
var SocketHandler = function (app, socket, feedMapper) {
    this.socket = socket;
    this.app = app;
    this.registerEvents();
    this.feedMapper = new feedMapper(app.database);
};

SocketHandler.prototype.registerEvents = function () {
    var that = this;

    this.socket.on('connection', function (socket) {
        that.onClientConnected(socket);
    });

    this.socket.on('disconnect', function (socket) {
        that.onClientDisconnected(socket);
    });
};

/**
 * @param socket
 */
SocketHandler.prototype.onClientConnected = function (socket) {
    var that = this;
    console.log('Client connected #' + socket.id);


    this.feedMapper.getFeedItems('')
        .then(function (response) {
            socket.emit('feedItemUpdate', response)
        })
        .catch(function (err) {
            console.log(err)
        });

    socket.on('searchRunner', function (data) {
        that.onRunnersRequested(data, socket);
    });

    socket.on('selectRunner', function (data) {
        that.onRunnerSelected(data, socket);
    });

    socket.on('deselectRunner', function () {
        that.onRunnerDeselected(socket);
    });

    socket.on('chooseDisplayText', function (data) {
        that.onDisplayTextChosen(data, socket);
    });
};

/**
 * @param socket
 */
SocketHandler.prototype.onClientDisconnected = function (socket) {
    console.log('Client disconnected #' + socket.id);
};

/**
 * @param data
 * @param socket
 */
SocketHandler.prototype.onRunnerSelected = function (data, socket) {
    var that = this;
    this.app.mylapsHandler.getRunTimeForRunner(data)
        .then(function (runTime) {
            data.runTime = runTime;
            if (!runTime) {
                that.socket.in(Object.keys(socket.rooms)[1]).emit('runnerFailedSelecting', data);
            } else {
                that.socket.in(Object.keys(socket.rooms)[1]).emit('runnerSelected', data);
                that.selectedRunner = data;
            }
        })
        .catch(function (error) {
            console.log(error);
        });
};

/**
 * @param socket
 */
SocketHandler.prototype.onRunnerDeselected = function (socket) {
    this.socket.in(Object.keys(socket.rooms)[1]).emit('runnerDeselected');
};

/**
 * @param data
 * @param socket
 */
SocketHandler.prototype.onDisplayTextChosen = function (data, socket) {
    this.socket.in(Object.keys(socket.rooms)[1]).emit('displayTextSet', data);
};

/**
 * @param socket
 * @param data
 */
SocketHandler.prototype.onRunnersRequested = function (data, socket) {
    var that = this;
    this.app.mylapsHandler.getRunnersByQuery(data.query)
        .then(function (runners) {
            that.socket.in(Object.keys(socket.rooms)[1]).emit('foundRunners', runners);
        })
        .catch(function (error) {
            console.log(error);
        });
};

/**
 * @return socket
 */
SocketHandler.prototype.attachServer = function (server) {
    return this.socket.attach(server);
};

/**
 * @type {SocketHandler}
 */
module.exports = SocketHandler;
