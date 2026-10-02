import fs from 'fs';

const reqHandler = (req, res) => {

  res.setHeader('Content-Type', 'text/html');

  console.log(req.url, req.method);

  // Form page
  if (req.url === '/' && req.method === 'GET') {

    res.write(`
      <form action="/submit-details" method="POST">
        <input type="text" name="name" placeholder="Enter your name">
        <input type="email" name="email" placeholder="Enter your email">
        <input type="submit" value="Submit">
      </form>
    `);

    return res.end();
  }

  // Home page
  else if (req.url === '/home' && req.method === 'GET') {
    res.write(`<h1>Home Page</h1>`);
    return res.end();
  }

  // About page
  else if (req.url === '/about' && req.method === 'GET') {
    res.write(`<h1>About Page</h1>`);
    return res.end();
  }

  // Contact page
  else if (req.url === '/contact' && req.method === 'GET') {
    res.write(`<h1>Contact Page</h1>`);
    return res.end();
  }

  // Form submission
  else if (req.url === '/submit-details' && req.method === 'POST') {

    const body = [];

    req.on('data', (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });

    req.on('end', () => {

      const parseBody = Buffer.concat(body).toString();

      console.log(parseBody);

      const params = new URLSearchParams(parseBody);

      const bodyObject = Object.fromEntries(params.entries());

      console.log(bodyObject);

      fs.writeFileSync(
        'data.txt',
        JSON.stringify(bodyObject, null, 2)
      );

      res.write(`
        <h1>Details Submitted Successfully</h1>
        <p>Name: ${bodyObject.name}</p>
        <p>Email: ${bodyObject.email}</p>
      `);

      res.end();
    });

    return;
  }

  // 404
  else {
    res.statusCode = 404;
    res.write(`<h1>404 - Page Not Found</h1>`);
    return res.end();
  }
};


export default reqHandler;