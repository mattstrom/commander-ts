import {
	action, command, commandOption, description, option,
	optionalArg, program, requiredArg, usage,
	variadicArg, version
} from './index';
import { Command } from 'commander';

@program()
@version('1.0.0')
@description('A basic program')
@usage('--help')
export class Program {
	@option('--env')
	env: string;

	constructor() {}

	@command()
	@commandOption('--lowercase')
	print(
		this: Command,
		@requiredArg('first') first,
		@optionalArg('last') last,
		@variadicArg('credentials') credentials
	) {
		if (this.lowercase) {
			console.log(`Name: ${first} ${last}, ${credentials.join(', ')}`.toLowerCase());
		} else {
			console.log(`Name: ${first} ${last}, ${credentials.join(', ')}`);
		}
	}

	run() {}
}

const p = new Program();
