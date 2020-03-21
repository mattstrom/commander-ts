import { ArgsMetadata } from '../metadata';
import { CommandArg, VariadicArg } from '../models/index';

export function injectArgs(program, target: object, propertyKey: string | symbol) {
	if (Reflect.hasMetadata(ArgsMetadata, target, propertyKey)) {
		const args = Reflect.getMetadata(ArgsMetadata, target, propertyKey) as CommandArg[];

		const predicate = (arg: CommandArg) => arg instanceof VariadicArg;
		const variadic = args.find(predicate);

		if (variadic && (args.findIndex(predicate) !== (args.length - 1)))
			throw new TypeError(`Variadic argument must be specified last the argument list of the ${String(propertyKey)}() function.`)

		return args.map((elm, index) => args.find(arg => arg.index === index) && program.args[index]);
	}
}
