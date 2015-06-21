'use strict';

const
    r   = require('rethinkdb'),
    co  = require('co'),
    db  = require('../../helpers/rethinkdb');


function setup(io, socket){

    socket.on('home:join', function(data){

        socket.join('home');

        let conn;

        co(function*() {

            conn = yield db.create();

            let cursor = yield r.table('message')
                .orderBy({index: r.desc('created')})
                .limit(10)
                .run(conn);

            let values = yield cursor.toArray();

            socket.emit('home:msgs:init', values);
        })
        .then(function(){
            if (conn){
                db.close(conn);
            }
        })
        .catch(function(err){
            console.error(err);
        });
    });

    socket.on('home:leave', function(data){
        socket.leave('home');
    });
}

module.exports = setup;
