import mongoose, { Schema } from "mongoose";

export const trmSchema = new Schema({
	source: {
		type: String,
		required: "source is required"
	},
	target: {
		type: String,
		required: "target is required"
	},
	rate: {
		type: Number,
		required: "rate is required"
	},
	time: {
		type: String,
		required: "time is required"
	},
	created_date: {
		type: Date,
		default: Date.now
	}
});

const model = mongoose.model("trm", trmSchema);

export const schema = model.schema;
export default model;
