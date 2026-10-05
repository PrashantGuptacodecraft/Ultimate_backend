import cors from 'cors';
import express from 'express';

const app = express();
const port = Number(process.env.PORT) || 3000;

app.use(cors({ origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173' }));
app.use(express.json({ limit: '16kb' }));

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok' });
});

app.post('/api/profile', (request, response) => {
  const name = request.body?.name?.trim();
  const email = request.body?.email?.trim();
  const city = request.body?.city?.trim();

  if (!name || !email || !city) {
    return response.status(400).json({ message: 'Name, email, and city are required.' });
  }

  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return response.status(400).json({ message: 'Please provide a valid email address.' });
  }

  return response.status(201).json({
    message: 'Your profile details were saved successfully.',
    profile: { name, email, city },
  });
});

app.use((_request, response) => {
  response.status(404).json({ message: 'Route not found.' });
});

app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`);
});
