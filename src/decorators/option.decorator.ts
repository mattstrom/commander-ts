import * as commander from 'commander';
import { isFunction, isUndefined } from 'util';
import { OptionsMetadata } from '../metadata';
import { decorateIfNot } from '../utils';


export function option(flags?: string, description?: string, defaultValue?: any): ParameterDecorator;
export function option(flags?: string, description?: string, fn?: ((arg1: any, arg2: any) => void) | RegExp, defaultValue?: any): ParameterDecorator;
export function option(...args: any[]): ParameterDecorator {
	return (target: object, propertyKey: string | symbol, parameterIndex: number) => {
		args[0] = args[0] || `--${propertyKey}`;

		decorateIfNot(OptionsMetadata, [], target, propertyKey);

		const options = Reflect.getMetadata(OptionsMetadata, target, propertyKey) as any[];

		options.push(args);
	};
}
