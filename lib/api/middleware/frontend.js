'use strict';

const
    path  = require( 'path' ),
    serve = require( 'koa-static' );


function frontend(app){
    app.use( serve( path.join( __dirname, '../../../public' ) ) );
};

module.exports = frontend;
