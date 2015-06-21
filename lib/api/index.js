'use strict';

const
    koa         = require( 'koa' ),
    logger      = require( 'koa-logger' ),
    errors      = require( './middleware/errors' ),
    frontend    = require( './middleware/frontend' ),
    routes      = require( './routes' );


const app = koa();

// Config
app.use( logger() );

// Handle errors
errors( app );

// Render static
frontend( app );

// Handle routes
routes( app );

// Export composable app
module.exports = app;
