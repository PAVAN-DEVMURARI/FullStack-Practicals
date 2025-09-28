import http from 'node:http';
import { once } from 'node:events';
import createApp from '../src/app.js';

async function run() {
  const app = createApp();
  const server = http.createServer(app);
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const { port } = server.address();

  const expected = 'Welcome to our site';
  const req = http.request({ hostname: '127.0.0.1', port, path: '/', method: 'GET' });
  req.end();

  const [res] = await once(req, 'response');
  let body = '';
  res.setEncoding('utf8');
  res.on('data', (chunk) => (body += chunk));

  await once(res, 'end');
  server.close();

  if (res.statusCode !== 200) {
    console.error('Unexpected status:', res.statusCode);
    process.exit(1);
  }
  if (body.trim() !== expected) {
    console.error('Unexpected body:', JSON.stringify(body));
    process.exit(1);
  }

  console.log('Smoke test passed. Home route returned expected text.');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
