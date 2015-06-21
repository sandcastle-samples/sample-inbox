
'use strict';

const
    route       = require( 'koa-route' ),
    body        = require( 'koa-parse-json' ),
    rethinkdb   = require('../../helpers/rethinkdb'),
    config      = require('../../helpers/config'),
    home        = require( './home' ),
    user        = require( './user' ),
    message     = require( './message' );


function routes(app){

    // Open the db connection
    app.use(create);

    // parse json body
    app.use(body());

    // Wire up routes
    app.use(route.get('/api/user', user.list));
    app.use(route.post('/api/user', user.create));
    app.use(route.get('/api/home', home.list));
    app.use(route.post('/api/message', message.create));
    app.use(route.post('/api/comment', message.comment));

    // clean up the database connection
    app.use(close);
}

function *create(next) {

    try{
        this.db = yield rethinkdb.create();
    }
    catch(err) {
        console.error(err);
        this.status = 500;
        this.body = err.message || http.STATUS_CODES[this.status];
    }

    yield next;
}

function *close(next) {

    if (this.db){
        yield rethinkdb.close(this.db);
    }

    yield next;
}

module.exports = routes;
