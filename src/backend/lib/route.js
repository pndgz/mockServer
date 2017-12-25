//route
let routes = new Map();

function dispatch(path) {
    if (path.startsWith('/mockserver/')) {
        let fn = routes.get(path);
        if (fn) {
            return fn();
        } else {
            return {code: 404, msg: "not found"};
        }
    } else {
        return mock(path);
    }
}

function mock(path) {
    switch (path) {
        case "/":
            return {code: 200, msg: "ok"};
            break;
        default:
            return {code: 404, msg: "not found"};
    }
}

function def(path, fn) {
    routes.put(path, fn);
}

function use(module) {
    if (module) {
        module();
    }
}

exports.dispatch = dispatch;
exports.get = def;
exports.post = def;
exports.all = def;
exports.use = use;