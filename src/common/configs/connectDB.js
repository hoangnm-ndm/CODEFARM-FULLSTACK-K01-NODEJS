import mongoose from "mongoose";
import { DB_URI, NGROK_AUTH_TOKEN, PORT } from "./environments.js";
import { confirmWebhook } from "../../modules/order/order.controler.js";

function connectDB() {
  mongoose
    .connect(DB_URI)
    .then(() => console.log("MongoDB connected successfully"))
    .then(async () => {
      const ngrok = await import("@ngrok/ngrok");
      const listener = await ngrok.forward({
        addr: PORT,
        authtoken: NGROK_AUTH_TOKEN,
      });
      const urlNgrokWebhook = `${listener.url()}/webhook`;

      confirmWebhook(urlNgrokWebhook);
    })
    .catch((err) => console.error("MongoDB connection error:", err));
}

export default connectDB;
