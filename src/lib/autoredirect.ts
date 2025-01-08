const localStorageKey = 'autoRedirects';

export class RedirectAllowlist {
	#allowed!: Set<string>;

	constructor() {
		this.load();
	}

	get allowed() {
		return [...this.#allowed].sort();
	}

	isAllowed(url: URL) {
		return this.#allowed.has(autoRedirectStorageKey(url));
	}

	allow(url: URL) {
		this.#allowed.add(autoRedirectStorageKey(url));
		this.save();
	}

	disallow(url: URL) {
		this.#allowed.delete(autoRedirectStorageKey(url));
		this.save();
	}

	load() {
		this.#allowed = new Set<string>();
		try {
			this.#allowed = new Set<string>(JSON.parse(localStorage.getItem(localStorageKey) || '[]'));
		} catch (err) {
			console.error('Failed to load auto redirects', err);
		}
	}

	save() {
		try {
			localStorage.setItem(localStorageKey, JSON.stringify(Array.from(this.#allowed)));
		} catch {}
	}
}

export function autoRedirectStorageKey(toUrl: URL) {
	return `${toUrl.protocol}//${toUrl.host}`;
}
