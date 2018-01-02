import connect from 'connect'
import http from 'http'
import mylogger from './backend/lib/log'

import {handler} from './backend/Routes'

let app = connect();
let PORT = 3000;

app.use('/', handler);

http.createServer(app).listen(PORT);
mylogger.info('MockServer listen on:', PORT);
