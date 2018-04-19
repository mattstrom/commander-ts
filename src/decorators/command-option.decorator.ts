import * as commander from 'commander';
import { isFunction, isUndefined } from 'util';
import { CommandOptionsMetadata } from '../metadata';
import { decorateIfNot } from '../utils';


export function commandOption(flags?: string, description?: string, defaultValue?: any): MethodDecorator;
export function commandOption(flags?: string, description?: string, fn?: ((arg1: any, arg2: any) => void) | RegExp, defaultValue?: any): MethodDecorator;
export function commandOption(...args: any[]): MethodDecorator {
	return ((target: object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<any>) => {
		args[0] = args[0] || `--${propertyKey}`;

		decorateIfNot(CommandOptionsMetadata, [], target, propertyKey);

		const options = Reflect.getMetadata(CommandOptionsMetadata, target, propertyKey) as any[];

		options.push(args);
	}) as MethodDecorator;
}
