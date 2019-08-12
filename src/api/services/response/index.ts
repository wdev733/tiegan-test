export const handleSuccess = (result = {}, status = 200) => {
	return {
		success: true,
		data: result
	};
};

export const handleError = (
	err = { message: "Internal Server Error" },
	status = 500
) => {
	console.error(new Date(), "handleError : ", err);
	const errorMessage = typeof err === "string" ? err : err.message;

	return {
		success: false,
		message: errorMessage || "Something went wrong"
	};
};
