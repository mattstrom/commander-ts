import * as commander from 'commander';
import { isFunction, isUndefined } from 'util';

import { ArgsMetadata } from '../metadata';
import { CommandArg, OptionalArg, RequiredArg, VariadicArg } from '../models';
import { decorateIfNot } from '../utils';


export function optionalArg(name: string): ParameterDecorator {
	return (target: object, propertyKey: string | symbol, parameterIndex: number) => {
		const args = decorateIfNot(ArgsMetadata, [], target, propertyKey);

		args.unshift(new OptionalArg(name, parameterIndex));
	};
}

export function requiredArg(name: string): ParameterDecorator {
	return (target: object, propertyKey: string | symbol, parameterIndex: number) => {
		const args = decorateIfNot(ArgsMetadata, [], target, propertyKey);

		args.unshift(new RequiredArg(name, parameterIndex));
	};
}

export function variadicArg(name: string): ParameterDecorator {
	return (target: object, propertyKey: string|symbol, parameterIndex: number) => {
		const args = decorateIfNot(ArgsMetadata, [], target, propertyKey) as CommandArg[];

		args.unshift(new VariadicArg(name, parameterIndex));
	};
}
