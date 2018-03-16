import * as commander from 'commander';
import { ProgramMetadata } from '../metadata';


export function initCommander(target: any) {
	if (!Reflect.hasMetadata(ProgramMetadata, target)) {
		const decorator = Reflect.metadata(ProgramMetadata, commander);
		Reflect.decorate([decorator], target);
	}
}
