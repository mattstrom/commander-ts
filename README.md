commander-ts
================================

TypeScript decorators for [commander](https://github.com/tj/commander.js/) that makes developing command line tools with Node even easier.

## Usage
1. Import `commander-ts` into your project.
	```
	$ npm install --save commander-ts
	```

## Example
```
import {
	action, command, description, option, optionalArg,
	program, requiredArg, subcommand, usage, version
} from 'commander-ts';


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
```

```
$ node index.js
