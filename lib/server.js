'use strict';

//Third part dependencies
const express = require('express');


const app = express();

// Export an object with the whole server and a separate method that can start the server
module.exports = {
    //exporting app for testing
    apiServer: app,
    start: (port) => {
      app.listen(port, () => console.log(`Listening on ${port}`));
    }
  };