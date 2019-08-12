import { Body, Delete, Get, JsonController, Post, QueryParam } from "routing-controllers";

import { getCurrencyRate } from "../../services/currency";
import { handleError, handleSuccess } from "../../services/response";
import Trm from "../models/trm";

@JsonController()
export class TrmController {
	@Post("/trm")
	public async addCurrencyInfo(@Body() params: any) {
		try {
			const res = await getCurrencyRate(params.source, params.target);
			const currencyInfo = JSON.parse(res);

			await currencyInfo.forEach(async (element) => {
				const trm = {
					...element
				};
				const query = {source: trm.source, target: trm.target, time: trm.time};

				await Trm.deleteMany(query);
				await Trm.create(trm);
			});
			const msg =
				currencyInfo.length === 0
					? "No data has been inserted."
					: currencyInfo.length + " trm datas have been inserted.";
			return handleSuccess({ message: msg });
		} catch (err) {
			return handleError(err);
		}
	}

	@Get("/trm")
	public async getAll(@QueryParam("page") page: number, @QueryParam("limit") limit: number) {
		try {
			const start = (page - 1) * limit;
			const data = await Trm.find().limit(limit).skip(start);
			return handleSuccess(JSON.parse(JSON.stringify(data)));
		} catch (err) {
			return handleError(err);
		}
	}

	@Delete("/trm")
	public async deleteAll() {
		try {
			await Trm.deleteMany();
			return handleSuccess({ message: "All trm data has been deleted." });
		} catch (err) {
			return handleError(err);
		}
	}
}
