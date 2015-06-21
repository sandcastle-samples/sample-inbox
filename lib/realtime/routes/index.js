'use strict';


function setup(io, socket){

    require('./home')(io, socket);
}

module.exports = setup;
