import {routes} from '../Routes'

routes.def('/test', function (request, response) {
  return {code: 200, msg: 'test ok'}
})

