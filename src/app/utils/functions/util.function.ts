import { v4 as uuidv4 } from 'uuid';

export const generateUniqueCode = (length = 5): string =>
	(uuidv4() as string).substring(0, length);

export const generateRandomName = (rootWord = 'project') =>
	String(`${rootWord}-${generateUniqueCode(6)}`);

export const groupBy = <T>(list: T[], key: string): any => {
	return list.reduce(function (rv, x) {
		(rv[x[key]] = rv[x[key]] || []).push(x);
		return rv;
	}, {});
};
