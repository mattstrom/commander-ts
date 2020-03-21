import * as commander from 'commander';

import { initCommander, prepareCommand, injectArgs } from '../helpers';
import { OptionsMetadata } from '../metadata';
import { Option } from '../models';

let instances = 0;

export function program() {
	instances += 1;

	if (instances > 1) {
		throw new Error('Only one instance of @program is permitted.');
	}

	return function <R extends { new(...args: any[]): {} }>(constructor: R) {
		const mixin = class extends constructor {
			run: () => void;

			constructor(...args: any[]) {
				super(...args);

				if (!this.run) {
					console.error('Program class must define a run() method.');
					process.exit(1);
				}

				const cmd = prepareCommand(this, 'run');

				if (cmd) {
					commander.command(cmd);
				}

				const options: Option[] = Object.keys(this).reduce((list, prop) => {
					if (Reflect.hasMetadata(OptionsMetadata, this, prop)) {
						const metadata = Reflect.getMetadata(OptionsMetadata, this, prop);
						list.push(metadata);
					}

					return list;
				}, []);

				const chainAfterOptions = options
					.reduce((prev, option: Option) => {
						return prev.option.apply(prev, option[0].args);
					}, commander);

				commander.parse(process.argv);

				if (this.run) {
					this.run.apply(commander, injectArgs(commander, this, 'run'));
				}
			}
		};

		initCommander(constructor);

		return mixin;
	} as ClassDecorator;
}

function prepareProgram(target: object) {
	let argList = '';

	if (Reflect.hasMetadata(OptionsMetadata, target)) {
		const args = Reflect.getMetadata(OptionsMetadata, target);



		argList = args
			.map((arg) => {
				return arg.toString();
			})
			.join(' ')
			.replace(/^(.)/, ' $1');

	}

	return `${argList}`;
}
