'use strict';

const r = require('rethinkdb');
const config = require('./config');


function create() {
    return r.connect(config.rethinkdb);
}

function close(connection) {
    return connection.close();
}

function bootstrap(connection){

    if (!(r.dbList().contains('inbox').run(connection))){

        r.dbCreate('inbox').run(connection);
        r.db('inbox').tableCreate('user').run(connection);
        r.db('inbox').tableCreate('message').run(connection);
        r.db('inbox').tableCreate('comment').run(connection);
    }
}

module.exports = {
    create: create,
    bootstrap: bootstrap,
    close: close
}
