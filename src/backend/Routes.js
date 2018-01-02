//routes
import url from 'url'
import mylogger from './lib/log'
import requireContext from 'require-context'

class Routes {

  constructor() {
    this.routes = new Map()
    let modules = requireContext(__dirname + '/services', true, /.js$/)

    modules.keys().forEach(key => {
      // this.routes.put(file(key).basename, modules(key));
      // routes = routes.concat(modules(key).default)
    })
  }

  dispatch(path) {
    if (path.startsWith('/mockserver/')) {
      let fn = this.routes.get(path)
      if (fn) {
        return fn()
      } else {
        return {code: 404, msg: 'not found'}
      }
    } else {
      return this.mock(path)
    }
  }

  mock(path) {
    switch (path) {
      case '/':
        return {code: 200, msg: 'ok'}
      default:
        return {code: 404, msg: 'not found'}
    }
  }

  def(path, fn) {
    this.routes.put(path, fn)
  }

  use(module) {
    if (module) {
      module()
    }
  }
}

let routes = new Routes()

function handler(request, response) {
  let pathname = url.parse(request.url).pathname
  mylogger.debug('user request:', pathname)
  let ret = routes.dispatch(pathname)
  mylogger.debug('server response:', ret)
  response.writeHead(200, {
    'Content-Type': 'application/json'
  })
  response.write(JSON.stringify(ret))
  response.end()
}
export {handler, routes};
