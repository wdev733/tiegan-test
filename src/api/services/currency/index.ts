import rpn from "request-promise-native";

export const getCurrencyRate = (source = "", target = "") => {
	if (source === "" || target === "") {
		throw new Error("Parameter is missing");
	}

	return rpn(
		"https://transferwise.com/gb/currency-converter/api/historic?source=" +
		source +
		"&target=" +
		target +
		"&period=30"
	);
};
