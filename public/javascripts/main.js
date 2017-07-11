/**
 * Vendors
 */
$ = require('../../node_modules/jquery/dist/jquery');
var WOW = require('../../node_modules/wowjs/dist/wow');
var Handlebars = require('../../node_modules/handlebars/dist/handlebars');

$(function () {
    /**
     * Base
     */
    require('./base/base')(WOW, Handlebars);

    /**
     * Base
     */
    require('./base/socket')(Handlebars);
});
