import { action as commanderAction } from 'commander';

export function action(): MethodDecorator {
	return (target: object, propertyKey: string|symbol, descriptor: PropertyDescriptor) => {
		commanderAction(target[propertyKey]);
	};
}
