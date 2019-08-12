import dotenv from "dotenv-safe";
import path from "path";

dotenv.config({
	allowEmptyValues: true
});

dotenv.load({
	path: path.join(__dirname, "../.env"),
	sample: path.join(__dirname, "../.env.example")
});

export const mongoUri = process.env.MONGODB_URI;
export const port = process.env.SERVER_PORT;
