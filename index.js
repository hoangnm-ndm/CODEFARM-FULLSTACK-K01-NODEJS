import express from 'express';
import router from './src/routes/index.js';

const hostname = '127.0.0.1';
const port = 3000;

const app = express();

app.use(express.json())

app.use("/api", router)

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});