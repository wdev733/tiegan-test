// Import the dependencies for testing
import chai from "chai";
import chaiHttp from "chai-http";
import app from "../app";

// Configure chai
chai.use(chaiHttp);
chai.should();

describe("Trms", () => {
	describe("GET /trm", () => {
		// Test to get all trm record
		it("should get all trm record", (done) => {
			chai.request(app)
				.get("/trm")
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a("object");
					done();
				});
		});
	});

	describe("DELETE /trm", () => {
		// Test to delete all trm record
		it("should delete all trm records", (done) => {
			chai.request(app)
				.delete("/trm")
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a("object");
					done();
				});
		});
	});

	describe("POST /trm", () => {
		// Retrive data from external api and insert
		it("should insert all trm records", (done) => {
			chai.request(app)
				.post("/trm")
				.send({source: "USD", target: "UYU"})
				.end(async (err, res) => {
					res.should.have.status(200);
					res.should.be.json;
					res.body.should.be.a("object");
					res.body.should.have.property("success");
					res.body.success.should.equal(true);
					res.body.should.have.property("data");
					await done();
				});
		});
	});
});
