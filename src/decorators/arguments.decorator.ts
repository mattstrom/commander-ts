import { option } from 'commander';

export function args(): ParameterDecorator {
	return (target: object, propertyKey: string|symbol, parameterIndex: number) => {
		option(propertyKey as string)
			.action(target[propertyKey]);
	};
}
