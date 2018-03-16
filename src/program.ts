import * as commander from 'commander';
import { Command } from 'commander';

import {
	action, command, description, option, optionalArg,
	program, requiredArg, subcommand, usage, version
} from './decorators';


@program()
@version('1.0.0')
@description('A basic program')
@usage('--help')
export class Program {
	env: string;

	constructor() {}

	@subcommand()
	print(
		@requiredArg('first') first,
		@optionalArg('last') last,
		@option() name: string
	) {
		console.log(`Name: ${first} ${last}`);
	}

	run() {}
}

const p = new Program();
