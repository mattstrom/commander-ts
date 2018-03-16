import * as commander from 'commander';

export function action(): MethodDecorator {
	return (target: object, propertyKey: string|symbol, descriptor: PropertyDescriptor) => {
		commander.action(target[propertyKey]);
	};
}
