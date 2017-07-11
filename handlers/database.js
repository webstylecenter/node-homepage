var Database = function(config) {
    return require('knex')({
        client: 'mysql',
        connection: {
            host : config.database.host,
            user : config.database.username,
            password : config.database.password,
            database : config.database.database
        }
    });
};

module.exports = Database;
