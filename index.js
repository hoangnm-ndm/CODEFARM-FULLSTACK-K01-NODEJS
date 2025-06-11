import express from "express";
import connectDB from "./src/common/configs/connectDB.js";
import { PORT, HOST } from "./src/common/configs/enviroments.js";
import router from "./src/routes/index.js";
import errorHandler from "./src/common/middlewares/errorHandle.js";

connectDB();

const app = express();

app.use(express.json());

app.use("/api", router);

app.use(errorHandler);

app.listen(PORT, HOST, () => {
	console.log(`Server running at http://${HOST}:${PORT}/`);
});
