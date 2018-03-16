import * as commander from 'commander';
import { initCommander } from '../helpers';
import { ProgramMetadata } from '../metadata';


export function version(text: string): ClassDecorator {
	return (target: Function) => {
		initCommander(target);

		const program = Reflect.getMetadata(ProgramMetadata, target);
		program.version(text);
	};
}
