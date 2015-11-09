/*
 * Module Dependencies
 */
var express = require('express');

var server = express();
server.set('port', 3000);
// Serve static directory where our angular app is located.
server.use(express.static(__dirname + '/app'));

server.listen(server.get('port'), function() {
    console.log('Express server listening on port ' + server.get('port'));
});
