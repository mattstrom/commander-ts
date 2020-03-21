import { usage as commanderUsage } from 'commander';

export function usage(text: string): ClassDecorator {
	return (target: object) => {
		commanderUsage(text);
	};
}
