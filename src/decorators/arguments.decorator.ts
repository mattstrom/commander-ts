import * as commander from 'commander';

export function args(): ParameterDecorator {
	return (target: object, propertyKey: string|symbol, parameterIndex: number) => {
		commander
			.option(propertyKey as string)
			.action(target[propertyKey]);
	};
}
