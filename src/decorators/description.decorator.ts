
import { description as programDescription } from 'commander';

export function description(text: string): ClassDecorator {
	return (target: object) => {
		programDescription(text);
	};
}
