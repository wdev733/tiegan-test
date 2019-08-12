import { CronJob } from "cron";
import uuidv1 from "uuid/v1";
import { getCurrencyRate } from "../api/services/currency";
import Trm from "../api/trm/models/trm";

const getCurrencyRateJob = async () => {
	const source = "USD";
	const target = "UYU";

	console.log(
		"Getting currency rate data from " +
		"https://transferwise.com/gb/currency-converter/api/historic?source=" +
		source +
		"&target=" +
		target +
		"&period=30"
	);

	const res = await getCurrencyRate(source, target);
	const currencyInfo = res.data;
	await currencyInfo.forEach((element) => {
		const trm = {
			id: uuidv1(),
			...element
		};
		Trm.create(trm);
	});

	console.log("Created " + currencyInfo.length + " Trm datas");
};

// 7 AM every day
new CronJob("0 7 * * *", getCurrencyRateJob, null, true, "America/Montevideo");
