commander-ts
================================

TypeScript decorators for [commander](https://github.com/tj/commander.js/) that makes developing command line tools with Node even easier.

## Usage
1. Import `commander-ts` into your project.
	```
	$ npm install --save commander-ts
	```

## Example
_index.ts_
```
import {
	action, command, commandOption, description, option,
	optionalArg, program, requiredArg, usage,
	variadicArg, version,
	Command
} from 'commander-ts';

@program()
@version('1.0.0')
@description('A basic program')
@usage('--help')
export class Program {
	@option('--env <env>')
	env: string = null;

	constructor() {}

	run(@requiredArg('message') message) {
		console.log(`Message: ${message}`);
	}

	@command()
	@commandOption('--reverse')
	print(
		this: Command,
		@requiredArg('first') first,
		@optionalArg('last') last,
		@variadicArg('credentials') credentials
	) {
		if (this.reverse) {
			console.log(`Name: ${last}, ${first}, ${credentials.join(', ')}`);
		} else {
			console.log(`Name: ${first} ${last}, ${credentials.join(', ')}`);
		}
	}
}

const p = new Program();

```

```
$ node index.js "Hello world"
  Hello world

$ node index.js print Jack Bauer
  Jack Bauer

$ node index.js print James Bond --reverse
  Bond, James
