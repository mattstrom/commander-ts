import * as commander from 'commander';

export function on(event: string, handler: (eventArgs?: any) => void): MethodDecorator {
	return (target: object, propertyKey: string|symbol, descriptor: PropertyDescriptor) => {
		commander.on(event, handler);
	};
}
