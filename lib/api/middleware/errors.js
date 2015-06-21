'use strict';

const
    render = require( '../util/views' );


function errors(app){
    app.use( _404 );
};

function *_404( next ) {

    yield next;

    if ( this.body || !this.idempotent ) {
        return;
    }

    this.status = 404;
    this.body = yield render( '404' );
}

module.exports = errors;
