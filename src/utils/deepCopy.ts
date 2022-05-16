
const replacerFn = (key: string, val: any) => {
	return (typeof val === 'function')
		? val.toString().replace(/(\r\n|\n|\r)/gm, "")
		: val
};

const reviver = (key: string, value: string) => {
	if (key === 'func') {
		const wrapperFunction = new Function("return " + value);
		const storedFunction = wrapperFunction();
		return storedFunction;
	}

	return value;
}

export const safeParse = (text: string) =>  JSON.parse(text, reviver);
export const safeStringify = (obj: any) => JSON.stringify(obj, replacerFn);

export const deepCopy = (obj: any) => {
	//TODO: optimize this. Check "structuredClone"
	const string = safeStringify(obj);
	return safeParse(string);
}
