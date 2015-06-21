'use strict';

const
    socketIo    = require( 'socket.io' ),
    routes      = require('./routes'),
    watchers    = require('./watchers');


function socket(){ }

socket.init = function(server){

    let io = socketIo(server);

    io.on('connection', function(socket){
        routes(io, socket);
    });

    watchers(io);
}

module.exports = socket;
