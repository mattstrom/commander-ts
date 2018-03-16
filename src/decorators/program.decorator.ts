import * as commander from 'commander';

import { initCommander } from '../helpers';
import { ProgramMetadata } from '../metadata';


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

				commander.parse(process.argv);

				if (this.run) {
					this.run();
				}
			}
		};

		initCommander(constructor);

		return mixin;
	} as ClassDecorator;
}
