var Promise = require('promise');
var FeedItem = require('../entities/feedItem');

/**
 * @constructor
 * @param database
 */
var FeedMapper = function (database) {
    this.database = database;
};

FeedMapper.prototype.getFeedItems = function (searchQuery) {
    var that = this;

    return new Promise((resolve, reject) => {
        this.database
            .select('feed_data.*', 'feeds.name', 'feeds.feedUrl', 'feeds.color')
            .from('feed_data')
            .leftJoin('feeds', 'feed_data.feed', 'feeds.id')
            .whereRaw('title LIKE :query OR description LIKE :query', {query: '%' + searchQuery + '%'})
            .andWhere('feed_data.dateAdded', '>', '1970-01-01 00:00:01')
            .orderBy('feed_data.pinned', 'desc')
            .orderBy('feed_data.dateAdded', 'desc')
            .offset(0)
            .limit(20)
            .timeout(1000)
        .then((response) => {
            resolve(response.map((entry) => that.toEntity(entry)));
        })
        .catch((err) => {
            reject(err);
        })
    });
};

FeedMapper.prototype.toEntity = function (response) {
    var feedItem = new FeedItem;

    feedItem.id = response.id;
    feedItem.feedId = response.feed;
    feedItem.feedUrl = response.feedUrl;
    feedItem.feedColor = response.color;
    feedItem.guid = response.guid;
    feedItem.title = response.title;
    feedItem.description = response.description;
    feedItem.url = response.url;
    feedItem.dateAdded = new Date(response.dateAdded);
    feedItem.viewed = response.viewed;
    feedItem.pinned = response.pinned;
    feedItem.name = response.name;

    return feedItem;
};

/**
 * @type {SocketHandler}
 */
module.exports = FeedMapper;
