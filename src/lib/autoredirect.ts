const localStorageKey = 'autoRedirects';

type AllowList = Set<string>;

export function canAutoRedirect(allowed: AllowList, toUrl: URL) {
	return allowed.has(autoRedirectStorageKey(toUrl));
}

export function removeAutoRedirect(allowed: AllowList, toUrl: URL | string) {
	allowed.delete(typeof toUrl === 'string' ? toUrl : autoRedirectStorageKey(toUrl));
	saveAutoRedirects(allowed);
}

export function addAutoRedirect(allowed: Set<string>, toUrl: URL) {
	allowed.add(autoRedirectStorageKey(toUrl));
	saveAutoRedirects(allowed);
}

function saveAutoRedirects(redirects: Set<string>) {
	localStorage.setItem(localStorageKey, JSON.stringify(Array.from(redirects)));
}

export function loadAutoRedirects(_constructor: typeof Set<string> = Set): Set<string> {
	try {
		const redirects = new _constructor(JSON.parse(localStorage.getItem(localStorageKey) || '[]'));
		return redirects;
	} catch (err) {
		console.error('Failed to load auto redirects', err);
		return new _constructor();
	}
}

export function autoRedirectStorageKey(toUrl: URL) {
	return `${toUrl.protocol}//${toUrl.host}`;
}
