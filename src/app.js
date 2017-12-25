var PORT = 3000;

var http = require('http');
var url = require('url');
var route = require('./backend/lib/route');
var logger = require('log4js').getLogger();


var moduleTest = require('./backend/services/test');

logger.level = 'debug';

var server = http.createServer(function (request, response) {
    var pathname = url.parse(request.url).pathname;
    logger.debug("user request:", pathname);
    route.use(moduleTest);
    var ret = route.dispatch(pathname);
    logger.debug("server response:", ret);
    response.writeHead(200, {
        'Content-Type': 'application/json'
    });
    response.write(JSON.stringify(ret));
    response.end();
});
server.listen(PORT);
logger.info("MockServer listen on:", PORT);