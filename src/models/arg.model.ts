export class CommandArg {
	constructor(readonly name: string|symbol, readonly index: number) {
		if (typeof name === 'symbol') {
			throw new TypeError('Symbols are not supported as argument names.');
		}
	}
}

export class OptionalArg extends CommandArg {
	toString() {
		return `[${String(this.name)}]`;
	}
}
export class RequiredArg extends CommandArg {
	toString() {
		return `<${String(this.name)}>`;
	}
}
export class VariadicArg extends CommandArg {
	toString() {
		return `[${String(this.name)}...]`;
	}
}
