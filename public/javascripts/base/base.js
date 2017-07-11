var Base = function (WOW, Handlebars) {
    Handlebars.registerHelper('trim', function(value) {
        var cutAt = value.lastIndexOf(' ', 120);
        if (cutAt !== -1) {
            value = value.substring(0, cutAt) + '...';
        }

        return value;
    });

    new WOW.WOW({
        scrollContainer: '.scroll',
        mobile: false
    }).init();

    if (!navigator.onLine && localStorage.getItem('feed_items')) {
        var source = $("#feed-item-entry").html();
        var template = Handlebars.compile(source);

        $('.list').html(
            JSON.parse(localStorage.getItem('feed_items')).map(function (feedItem) {
                return template(feedItem);
            }).join('')
        );
    }
};

module.exports = Base;
