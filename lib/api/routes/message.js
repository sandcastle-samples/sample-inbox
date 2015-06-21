'use strict';

const r = require('rethinkdb');


function *create(){

    let msg = this.request.body;
    msg.created = new Date();

    yield r.table('message')
        .insert(msg)
        .run(this.db);

    this.status = 201;
    this.body = msg;
}

function *comment(){

    let comment = this.request.body;
    comment.created = new Date();

    yield r.table('comment')
        .insert(comment)
        .run(this.db);

    this.status = 201;
    this.body = comment;
}

module.exports = {
    create: create,
    comment: comment
}
