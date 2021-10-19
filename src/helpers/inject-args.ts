import { ArgsMetadata } from '../metadata';
import { CommandArg, VariadicArg } from '../models/index';

export function injectArgs(program, target: object, propertyKey: string | symbol) {
	if (Reflect.hasMetadata(ArgsMetadata, target, propertyKey)) {
		const args = Reflect.getMetadata(ArgsMetadata, target, propertyKey) as CommandArg[];

		const predicate = (arg) => arg instanceof VariadicArg;
		const variadic = args.find(predicate);

		if (variadic && (args.findIndex(predicate) !== (args.length - 1))) {
			throw new TypeError(`Variadic argument must be specified last the argument list of the ${String(propertyKey)}() function.`)
		}

		const argv = [];
		let index = 0

		for (let i = 0; i < args.length; i += 1) {
			if (args.find(arg => arg.index === i)) {
				argv.push(program.args[index]);
				index += 1;
			} else {
				argv.push(undefined);
			}
		}

		return argv;
	}
}
