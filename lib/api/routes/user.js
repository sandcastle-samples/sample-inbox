'use strict';

const r = require('rethinkdb');


function *create(){

    let user = this.request.body;
    user.created = new Date();

    yield r.table('user')
        .insert(user)
        .run(this.db);

    this.status = 201;
    this.body = user;
}

function *list(){
    this.body = yield r.table('user')
        .limit(20)
        .run(this.db);
}

module.exports = {
    create: create,
    list: list
}
