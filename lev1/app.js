import http from 'http';
import reqHandler from './practice.js';
import testingSyntax from './syntex.js';

const server = http.createServer(reqHandler);

server.listen(3001, () => {
  console.log('Server is running on port 3001');
});
