import { OptionsMetadata } from '../metadata';
import { Option } from '../models';
import { decorateIfNot } from '../utils';


export function option(flags?: string, description?: string, defaultValue?: any): PropertyDecorator;
export function option(flags?: string, description?: string, fn?: ((arg1: any, arg2: any) => void) | RegExp, defaultValue?: any): PropertyDecorator;
export function option(...args: any[]): PropertyDecorator {
	return ((target: object, propertyKey: string | symbol) => {
		args[0] = args[0] || `--${String(propertyKey)}`;

		decorateIfNot(OptionsMetadata, [], target, propertyKey);

		const options = Reflect.getMetadata(OptionsMetadata, target, propertyKey) as any[];

		options.push(new Option(propertyKey, args));
	}) as PropertyDecorator;
}
