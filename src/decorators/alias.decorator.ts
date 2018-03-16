
import * as program from 'commander';

export function alias(text: string): ClassDecorator {
	return (target: object) => {
		program.usage(text);
	};
}
