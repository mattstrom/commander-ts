export function decorateIfNot(metadataKey: any, value: any, target: object, propertyKey?: string|symbol) {
	if (!Reflect.hasMetadata(metadataKey, target, propertyKey)) {
		const decorator = Reflect.metadata(metadataKey, value);
		Reflect.decorate([decorator], target, propertyKey);
	}

	return Reflect.getMetadata(metadataKey, target, propertyKey);
}
