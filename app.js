var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var socket = require('socket.io');
var readRecursive = require('fs-readdir-recursive');
var moduleImporter = require('sass-module-importer');
var browserify = require('browserify-middleware');

var feedMapper = require('./mappers/feedMapper');
var socketHandler = require('./handlers/socket');

/**
 * Basic setup
 */
var app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');

/**
 * Global handlers
 */
app.config = require('./config.json')[app.get('env')];
app.database = require('./handlers/database')(app.config);
app.socketHandler = new socketHandler(app, socket(), feedMapper);

app.globals = {
    runtime: {
        timeStarted: Date.now()
    },
};

/**
 * Middlewares
 */
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(require('cookie-parser')());
app.use(require('node-sass-middleware')({
    src: path.join(__dirname, 'public'),
    dest: path.join(__dirname, 'public'),
    indentedSyntax: false,
    sourceMap: true,
    importer: moduleImporter(),
    debug: app.get('env') === 'development'
}));

app.use(express.static(path.join(__dirname, 'node_modules/font-awesome')));
app.use(express.static(path.join(__dirname, 'node_modules/lato-font')));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/javascripts/bundle.js', browserify('./public/javascripts/main.js'));
app.get('/offline.manifest', function(req, res){
    res.header('"Content-Type", "text/cache-manifest"');

    var recursiveFiles = readRecursive('public');
    recursiveFiles.push('socket.io/socket.io.js');
    recursiveFiles.push('javascripts/bundle.js');
    recursiveFiles.push('fonts/fontawesome-webfont.woff2?v=4.7.0');
    recursiveFiles.push('fonts/fontawesome-webfont.woff?v=4.7.0');
    recursiveFiles.push('fonts/fontawesome-webfont.ttf?v=4.7.0');

    var cacheHeader = 'CACHE MANIFEST\n\n#v' + app.globals.runtime.timeStarted + '\n\nCACHE:\n/';
    for (var fileKey in recursiveFiles) {
        cacheHeader = cacheHeader + '\n/' + recursiveFiles[fileKey];
    }

    cacheHeader = cacheHeader + '\n\n' + 'NETWORK:\n*';
    res.end(cacheHeader);
});

/**
 * Routes
 */
require('./routes/index')(app);
require('./routes/controller')(app);

if (app.get('env') === 'development') {
    require('./routes/debug')(app);
}

/**
 * Handlers
 */
app.use(require('./handlers/error'));
app.use(require('./handlers/notfound'));

module.exports = app;
