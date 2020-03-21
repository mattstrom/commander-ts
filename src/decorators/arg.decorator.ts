import { ArgsMetadata } from '../metadata';
import { CommandArg, OptionalArg, RequiredArg, VariadicArg } from '../models';
import { decorateIfNot } from '../utils';

/**
 * Parameter decorator used in subcommand function to denote an optional argument.
 *
 * @export
 * @param {string} name
 * @returns {ParameterDecorator}
 */
export function optionalArg(name: string): ParameterDecorator {
	return (target: object, propertyKey: string | symbol, parameterIndex: number) => {
		const args = decorateIfNot(ArgsMetadata, [], target, propertyKey);

		args.unshift(new OptionalArg(name, parameterIndex));
	};
}

/**
 * Parameter decorator to denotade a required argument.
 *
 * @export
 * @param {string} name
 * @returns {ParameterDecorator}
 */
export function requiredArg(name: string): ParameterDecorator {
	return (target: object, propertyKey: string | symbol, parameterIndex: number) => {
		const args = decorateIfNot(ArgsMetadata, [], target, propertyKey);

		args.unshift(new RequiredArg(name, parameterIndex));
	};
}

/**
 * Parameter decorator to denotade variadic arguments.
 *
 * @export
 * @param {string} name
 * @returns {ParameterDecorator}
 */
export function variadicArg(name: string): ParameterDecorator {
	return (target: object, propertyKey: string|symbol, parameterIndex: number) => {
		const args = decorateIfNot(ArgsMetadata, [], target, propertyKey) as CommandArg[];

		args.unshift(new VariadicArg(name, parameterIndex));
	};
}
