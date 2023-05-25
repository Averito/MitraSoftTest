type QueryObjectValue = string[] | string | number | number[] | undefined

export type QueryObject = {
	[key: string]: QueryObjectValue
}

export const generateQueryString = (params: QueryObject) => {
	const queryString = new URLSearchParams()

	for (const key in params) {
		const currentValue = params[key]
		if (currentValue === undefined) continue

		if (Array.isArray(currentValue)) {
			currentValue.forEach(item => queryString.set(key, String(item)))
			continue
		}

		queryString.set(key, String(currentValue))
	}

	const questionSymbol = queryString.toString().length > 0 ? '?' : ''

	return `${questionSymbol}${queryString.toString()}`
}
