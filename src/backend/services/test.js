
var route = require('../lib/route');

route.get("/test", function(request, response) {
    return {code: 200, msg: "test ok"};
});

module.exports = route;