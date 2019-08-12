import "reflect-metadata";
import { createExpressServer } from "routing-controllers";
import mongoose from "./api/services/mongoose";
import { mongoUri, port } from "./config";

import "./cronjobs";

import swaggerUi from "swagger-ui-express";
import * as swaggerDocument from "./swagger.json";

mongoose.connect(mongoUri, {
	// bufferMaxEntries: 0,
	reconnectTries: Number.MAX_VALUE,
	reconnectInterval: 2000,
	useNewUrlParser: true,
	useFindAndModify: false
});
mongoose.Promise = Promise;

// base directory. we use it because file in "required" in another module
const baseDir = __dirname;

const app = createExpressServer({
	controllers: [baseDir + "/api/**/controllers/*{.js,.ts}"]
});

app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => {
	console.log(`Server is running on port ${port}.`);
});

// Export our app for testing purposes
export default app;
