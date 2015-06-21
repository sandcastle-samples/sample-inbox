'use strict';

const r      = require('rethinkdb'),
      co     = require('co'),
      config = require('./config');


function create() {
    return r.connect(config.rethinkdb);
}

function close(connection) {
    return connection.close();
}

function bootstrap(){

    return co(function *(){

        let conn = yield create();

         if (!(yield r.dbList().contains('inbox').run(conn))){

            yield r.dbCreate('inbox').run(conn);
            yield r.db('inbox').tableCreate('user').run(conn);
            yield r.db('inbox').tableCreate('message').run(conn);
            yield r.db('inbox').tableCreate('comment').run(conn);
        }

        yield conn.close();
    });
}

module.exports = {
    create: create,
    bootstrap: bootstrap,
    close: close
}
