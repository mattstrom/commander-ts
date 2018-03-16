import * as commander from 'commander';

export function usage(text: string): ClassDecorator {
	return (target: object) => {
		commander.usage(text);
	};
}
