function getRequestParams<T extends object>(params: T) {
	const urlSearchParams = new URLSearchParams();
	Object.keys(params).forEach((param: string) => {
		const value: any = params[param as keyof T];
		if (!value) return;
		if (Array.isArray(value) && value.length == 0) return;

		urlSearchParams.append(param, String(value));
	});
	return urlSearchParams;
}

export default getRequestParams;