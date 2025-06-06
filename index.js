import express from 'express';
import router from './src/routes/index.js';
import connectDB from './src/configs/db.js';
import { HOST, PORT } from './src/configs/enviroments.js';

connectDB()

const app = express();

app.use(express.json())

app.use("/api", router)

app.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}/`);
});