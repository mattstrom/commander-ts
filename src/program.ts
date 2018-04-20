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
	@option('--env <env>')
	env: string = null;

	constructor() {}

	run(@requiredArg('type') type) {
		console.log('here with ' + type);
	}

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
}

const p = new Program();
