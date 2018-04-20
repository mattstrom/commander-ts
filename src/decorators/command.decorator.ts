import * as commander from 'commander';

import { prepareSubcommand } from '../helpers';
import { ArgsMetadata, CommandOptionsMetadata } from '../metadata';
import { CommandArg, OptionalArg, RequiredArg, VariadicArg } from '../models';


export type OptionArgs = [any, any, any, any];

export function command(): MethodDecorator {
	return (target: object, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
		try {
			const cmd = prepareSubcommand(target, propertyKey);
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
