import chai from "chai";
import request from "supertest";
import app from "../app";

describe("GET /trm - get all trm data", () => {
	it("Trm get api", async () => {
		const result = await request(app).get("/trm");
		chai.expect(result.statusCode).equal(200);
	});
});
