'use strict';

const
    r   = require('rethinkdb'),
    co  = require('co'),
    db  = require('../../helpers/rethinkdb');


function watch(io){

    changes(io).catch(function(err){

        // log error
        console.error(err);

        // avoid sync recursion
        setTimeout(function(){
            watch(io);
        },0);
    });
};

function changes(io){

    let conn;

    return co(function*() {

        conn = yield db.create();

        let cursor = yield r.table('message')
            .orderBy({index: r.desc('created')})
            .changes()
            .run(conn);

        if(cursor){
            cursor.each(function(err, record){

                if (err) {

                    // TODO: Test if this brings down the connection..

                    console.error('Error on watcher::home cursor', err);
                    throw err;
                }

                // insert
                if (!record.old_val){
                    io.to('home').emit('home:msgs:new', record.new_val);
                    return;
                }

                // delete
                if (!record.new_val){
                    io.to('home').emit('home:msgs:del', record.old_val.id);
                    return;
                }

                io.to('home').emit('home:msgs:upd', record.new_val);
            });
        }
    });
}

module.exports = watch;
