'use strict';

const r = require('rethinkdb');


function *list(){
    this.body = yield r.table('message')
        .orderBy('created')
        .limit(100)
        .run(this.db);
}

module.exports = {
    list: list
};
