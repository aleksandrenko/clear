
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

export const deepCopy = (obj: any) => {
	//TODO: optimize this. Check "structuredClone"
	return JSON.parse((JSON.stringify(obj, replacerFn)), reviver);
}
