import { base } from '$app/paths';

export function internalUrl(path: string) {
	if (!base) return path;
	return `${base}${path}`;
}
