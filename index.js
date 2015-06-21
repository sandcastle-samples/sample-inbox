'use strict';

const
    http        = require( 'http' ),
    socketIo    = require( 'socket.io' ),
    api         = require( './lib/api' ),
    realtime    = require( './lib/realtime' ),
    config      = require( './lib/helpers/config' );


// Bootstrap rethinkdb
require('./lib/helpers/rethinkdb').bootstrap().then(function(){

    // Server
    let server = http.Server(api.callback());

    // Socket.io
    realtime.init(server);

    // Listen
    server.listen(process.env.PORT || config.port);
    console.log( 'Listening on port', process.env.PORT || '14320' );
});
