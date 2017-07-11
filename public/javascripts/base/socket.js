var Socket = function (Handlebars) {
    var socket = io('http://localhost:3000');
    socket.on('connect', function(){
        console.log('Socket connection established');
    });

    socket.on('feedItemUpdate', function(feedItems){
        localStorage.setItem('feed_items', JSON.stringify(feedItems));

        var source = $("#feed-item-entry").html();
        var template = Handlebars.compile(source);

        $('.list').html(
            feedItems.map(function (feedItem) {
                return template(feedItem);
            }).join('')
        );
    });

    $('.btn').on('click', 'a', function () {

    });

    socket.on('disconnect', function(){
        console.log('Socket connection lost');
    });
};

module.exports = Socket;
