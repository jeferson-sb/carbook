import express from 'express';

const app = express();

app.get('/', (request, response) => {
  return response.end('Hello world');
});

app.listen(3333, () => console.log(`Server is up and running on port 3333`));
