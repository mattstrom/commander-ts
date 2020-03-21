
import { usage } from 'commander';

export function alias(text: string): ClassDecorator {
	return (target: object) => {
		usage(text);
	};
}
