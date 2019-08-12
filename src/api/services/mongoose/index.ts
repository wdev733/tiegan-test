import mongoose from "mongoose";

mongoose.Types.ObjectId.prototype.view = function() {
	return { id: this.toString() };
};

export default mongoose;
