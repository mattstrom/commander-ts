import * as commander from 'commander';

import { ArgsMetadata, CommandOptionsMetadata } from '../metadata';
import { CommandArg, OptionalArg, RequiredArg, VariadicArg } from '../models';


export type OptionArgs = [any, any, any, any];

export function command(): MethodDecorator {
	return (target: object, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
		try {
			const cmd = prepareCommand(target, propertyKey);
			let chain = commander.command(cmd);

			if (Reflect.hasMetadata(CommandOptionsMetadata, target, propertyKey)) {
				const options = Reflect.getMetadata(CommandOptionsMetadata, target, propertyKey) as OptionArgs[];
				chain = options.reduce((prev, opt: OptionArgs) => {
					const [arg1, arg2, arg3, arg4] = opt;
					return chain.option(arg1, arg2, arg3, arg4);
				}, chain);
			}

			chain.action((...args) => {
				const context = args[args.length - 1];
				const cmdArgs = args.slice(0, args.length - 1);
				target[propertyKey].apply(context, cmdArgs);
			});
		} catch (e) {
			console.error(e.message);
			process.exit(1);
		}
	};
}

function collectOptions(target: object, propertyKey: string | symbol) {

}

function prepareCommand(target: object, propertyKey: string | symbol) {
	let argList = '';

	if (Reflect.hasMetadata(ArgsMetadata, target, propertyKey)) {
		const args = Reflect.getMetadata(ArgsMetadata, target, propertyKey) as CommandArg[];

		const predicate = (arg) => arg instanceof VariadicArg;
		const variadic = args.find(predicate);

		if (variadic && (args.findIndex(predicate) !== (args.length - 1))) {
			throw new TypeError(`Variadic argument must be specified last the argument list of the ${propertyKey}() function.`)
		}

		argList = args
			.map((arg) => {
				return arg.toString();
			})
			.join(' ')
			.replace(/^(.)/, ' $1');

	}

	return `${propertyKey}${argList}`;
}
