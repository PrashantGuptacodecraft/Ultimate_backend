import http from 'http';
import reqHandler from './practice.js';
const server = http.createServer(reqHandler);
server.listen(3000, () => {
  console.log('Server is running on port 3000');
});