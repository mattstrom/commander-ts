import {
	command, commandOption, description, option,
	optionalArg, program, requiredArg, usage,
	variadicArg, version,
	Command
} from './index';

@program()
@version('1.0.0')
@description('A basic program')
@usage('--help')
export class Program {
	@option('--env <env>', 'Set the environment')
	env: string = null;

	constructor() {}

	run(@requiredArg('message') message) {
		console.log(`Message: ${message}`);
	}

	@command()
	@commandOption('--reverse')
	print(
		this: Command & { reverse: boolean },
		@requiredArg('first') first: string,
		@optionalArg('last') last: string,
		@variadicArg('credentials') credentials: string[]
	) {
		if (this.reverse) {
			console.log(`Name: ${last}, ${first}, ${credentials.join(', ')}`);
		} else {
			console.log(`Name: ${first} ${last}, ${credentials.join(', ')}`);
		}
	}
}

const p = new Program();
