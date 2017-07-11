/**
 * @constructor
 */
var FeedItem = function() {};

/**
 * @param feedId integer
 */
FeedItem.prototype.feedId = 0;

/**
 * @param feedUrl string
 */
FeedItem.prototype.feedUrl = '';

/**
 * @param feedColor string
 */
FeedItem.prototype.feedColor = '';

/**
 * @param guid string
 */
FeedItem.prototype.guid = '';

/**
 * @param title string
 */
FeedItem.prototype.title = '';

/**
 * @param description string
 */
FeedItem.prototype.description = '';

/**
 * @param url string
 */
FeedItem.prototype.url = '';

/**
 * @param dateAdded date
 */
FeedItem.prototype.dateAdded = null;

/**
 * @param viewed integer
 */
FeedItem.prototype.viewed = 0;

/**
 * @param pinned integer
 */
FeedItem.prototype.pinned = 0;

/**
 * @param viewed integer
 */
FeedItem.prototype.viewed = 0;

/**
 * @type {FeedItem}
 */
module.exports = FeedItem;
