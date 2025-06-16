import dotenv from "dotenv";

dotenv.config({
	path: ".env", // Nếu bạn chắc chắn file .env nằm ở root
	encoding: "utf8",
	debug: true, // In log debug khi load biến môi trường
	override: true, // Ghi đè process.env nếu biến đã tồn tại
	// expand: true,   // 👉 Chỉ khả dụng nếu bạn dùng thêm gói dotenv-expand
});

export const { DB_URI, HOST, PORT } = process.env;
