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
		this: Command,
		@requiredArg('first') first: string,
		@optionalArg('last') last: string,
		@variadicArg('credentials') credentials: Array<string>
	) {
		console.log(`Name: ${ this.reverse ? `${last}, ${first}` : `${first} ${last}` }, ${credentials.join(', ')}`)
	}
}

const p = new Program();
