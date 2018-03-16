import * as commander from 'commander';

import { ArgsMetadata, OptionsMetadata } from '../metadata';
import { CommandArg, OptionalArg, RequiredArg, VariadicArg } from '../models';


export type OptionArgs = [any, any, any, any];

export function subcommand(): MethodDecorator {
	return (target: object, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
		const cmd = prepareCommand(target, propertyKey);
		let chain = commander.command(cmd);

		if (Reflect.hasMetadata(OptionsMetadata, target, propertyKey)) {
			const options = Reflect.getMetadata(OptionsMetadata, target, propertyKey) as OptionArgs[];
			chain = options.reduce((prev, opt: OptionArgs) => {
				const [arg1, arg2, arg3, arg4] = opt;
				return chain.option(arg1, arg2, arg3, arg4);
			}, chain);
		}

		chain.action(target[propertyKey]);
	};
}

function prepareCommand(target: object, propertyKey: string | symbol) {
	let argList = '';

	if (Reflect.hasMetadata(ArgsMetadata, target, propertyKey)) {
		const args = Reflect.getMetadata(ArgsMetadata, target, propertyKey) as CommandArg[];

		const predicate = (arg) => arg instanceof VariadicArg;
		const variadic = args.find(predicate);

		if (variadic && (args.findIndex(predicate) !== (args.length - 1))) {
			throw new TypeError(`Variadic argument must be specified last.`)
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
