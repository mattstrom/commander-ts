import * as commander from 'commander';

import { prepareSubcommand } from '../helpers';
import { CommandOptionsMetadata } from '../metadata';


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

			chain.action(async (...args) => {
				const context = args[args.length - 1];
				const cmdArgs = args.slice(0, args.length - 1);

				try {
					const result = target[propertyKey].apply(context, cmdArgs);

					if (result instanceof Promise) {
						await result;
					}
				} catch {
					process.exit(1);
				} finally {
					process.exit(0);
				}
			});
		} catch (e) {
			console.error(e.message);
			process.exit(1);
		}
	};
}
