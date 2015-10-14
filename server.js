'use strict';

var liveServer = require('live-server');

liveServer.start({
    port: process.env.PORT || 8000,
    root: './client',
    // When false, it won't load your browser by default
    open: process.env.HEROKU ? false : true,
    // comma-separated string for paths to ignore
    // ignore: 'scss,my/templates',
    // When set, serve this file for every 404 (useful for single-page applications)
    file: 'index.html',
    // Waits for all changes, before reloading. Defaults to 0 sec
    wait: 1000
});
