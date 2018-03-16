
import * as program from 'commander';

export function description(text: string): ClassDecorator {
	return (target: object) => {
		program.description(text);
	};
}
