import { ArgsMetadata } from '../metadata';
import { CommandArg, VariadicArg } from '../models/index';

export function prepareCommand(target: object, propertyKey: string | symbol) {
	let argList = '';

	if (Reflect.hasMetadata(ArgsMetadata, target, propertyKey)) {
		const args = Reflect.getMetadata(ArgsMetadata, target, propertyKey) as CommandArg[];

		const predicate = (arg) => arg instanceof VariadicArg;
		const variadic = args.find(predicate);

		if (variadic && (args.findIndex(predicate) !== (args.length - 1))) {
			throw new TypeError(`Variadic argument must be specified last the argument list of the ${String(propertyKey)}() function.`);
		}

		argList = args
			.map((arg) => {
				return arg.toString();
			})
			.join(' ')
			.replace(/^(.)/, '$1');

	}

	return `${argList}`;
}

export function prepareSubcommand(target: object, propertyKey: string | symbol) {
	const argList = prepareCommand(target, propertyKey);
	return `${String(propertyKey)} ${argList}`;
}
