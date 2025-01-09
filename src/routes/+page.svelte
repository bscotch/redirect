<script lang="ts">
	import { page } from '$app/state';
	import {
		faArrowUpRightFromSquare,
		faCopy,
		faInfoCircle,
		faLink,
		faVial,
		faX
	} from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import { SvelteSet } from 'svelte/reactivity';
	import {
		addAutoRedirect,
		autoRedirectStorageKey,
		canAutoRedirect,
		loadAutoRedirects,
		removeAutoRedirect
	} from '../lib/autoredirect.js';

	let error: null | string = $state(null);
	let redirectAllowlist = $state(loadAutoRedirects(SvelteSet));
	let redirectTo = $derived.by(() => {
		const url = page.url.searchParams.get('to');
		try {
			return url ? new URL(url) : null;
		} catch (err) {
			error = 'Could not parse URL';
		}
	});

	// svelte-ignore state_referenced_locally
	if (redirectTo && canAutoRedirect(redirectAllowlist, redirectTo)) {
		redirect(redirectTo);
	}

	let newRedirectInput: string = $state('');
	let linkText: string = $state('');
	let newRedirectUrl: null | URL = $derived.by(() => {
		try {
			const asUrl = new URL(newRedirectInput);
			const currentUrl = new URL(window.location.href);
			// Clear all search params
			currentUrl.searchParams.forEach((_, key) => {
				currentUrl.searchParams.delete(key);
			});
			// Add the new search param
			currentUrl.searchParams.set('to', asUrl.href);
			return currentUrl;
		} catch (err) {
			return null;
		}
	});

	function redirect(url: URL) {
		window.location.href = url.href;
	}
</script>

<svelte:head>
	{#if redirectTo}
		<title>Redirect to {redirectTo.href}</title>
	{/if}
</svelte:head>

{#snippet copy(type: string, text: string)}
	<button
		class="reset copy"
		onclick={() => {
			navigator.clipboard.writeText(text);
		}}
	>
		<Fa icon={faCopy} title={`Copy as ${type}`} size="xs" />
	</button>
{/snippet}

<section>
	{#if error}
		<aside>
			<p class="error">{error}</p>
		</aside>
	{/if}

	<section id="redirect">
		<h2>Redirect To...</h2>
		{#if redirectTo}
			<p id="redirect-target">
				<a class="redirect" href={redirectTo.href} rel="noopener noreferrer">{redirectTo.href}</a>
			</p>
			<h3 class="sr-only">Actions</h3>
			<form>
				<label>
					<input
						type="checkbox"
						id="auto-redirect"
						checked={canAutoRedirect(redirectAllowlist, redirectTo)}
						onchange={(e) => {
							// @ts-expect-error
							if (e.target.checked) {
								addAutoRedirect(redirectAllowlist, redirectTo);
							} else {
								removeAutoRedirect(redirectAllowlist, redirectTo);
							}
						}}
					/>
					Auto-redirect links from <code>{autoRedirectStorageKey(redirectTo)}</code>
				</label>
			</form>
			<ul>
				<li>
					<a href={redirectTo.href} rel="noopener noreferrer">
						<Fa icon={faLink} /> Visit URI
					</a>
				</li>
				<li>{@render copy('plaintext', redirectTo.href)}</li>
			</ul>
		{:else}
			<p><i>No redirect provided. Create a new one!</i></p>
		{/if}

		{#if redirectAllowlist.size > 0}
			<section class="allowlist">
				<h3>Allowed Auto-redirects</h3>
				{#if [...redirectAllowlist].find((i) => !i.match(/^https?:\/\//))}
					<p>
						<Fa icon={faInfoCircle} size="xs" />
						<i>Non-HTTP URIs will only redirect if they have a registered handler.</i>
					</p>
				{/if}
				<ul class="reset allowlist">
					{#each [...redirectAllowlist] as hostKey}
						<li>
							<span>
								{hostKey}
							</span>
							<button
								class="reset"
								onclick={() => {
									removeAutoRedirect(redirectAllowlist, hostKey);
								}}
							>
								<Fa icon={faX} title="Remove from allowlist" size="xs" />
							</button>
						</li>
					{/each}
				</ul>
			</section>
		{/if}
	</section>

	<section id="new-redirect">
		<h2>Create a Redirect URL</h2>
		<form id="new-url-form">
			<div class="inputs">
				<label for="to"> Destination </label>
				<input
					bind:value={newRedirectInput}
					type="url"
					id="to"
					name="to"
					placeholder="https://example.com"
					required
				/>
				<label for="text"> Link Text </label>
				<input
					bind:value={linkText}
					type="text"
					id="text"
					name="text"
					placeholder="(optional) Link text"
				/>
			</div>
		</form>

		<h3>
			Result
			{#if newRedirectUrl}
				<a href={newRedirectUrl.href} rel="noopener noreferrer">
					<Fa icon={faVial} size="xs" title="Open redirect URL here" />
				</a>
				<a href={newRedirectUrl.href} target="_blank" rel="noopener noreferrer">
					<Fa icon={faArrowUpRightFromSquare} size="xs" title="Open redirect URL in new tab" />
				</a>
			{/if}
		</h3>

		<output form="new-url-form">
			{#if newRedirectUrl}
				<dl class="results">
					<dt>{@render copy('plaintext', newRedirectUrl.href)} Plaintext</dt>
					<dd>{newRedirectUrl.href}</dd>
					<dt>{@render copy('markdown', `[${linkText}](${newRedirectUrl.href})`)} Markdown</dt>
					<dd>[{linkText}]({newRedirectUrl.href})</dd>
					<dt>{@render copy('HTML', `<a href="${newRedirectUrl.href}">${linkText}</a>`)} HTML</dt>
					<dd>
						<code>&lt;a href="{newRedirectUrl.href}"&gt;{linkText}&lt;/a&gt;</code>
					</dd>
				</dl>
			{:else if newRedirectInput}
				<i class="error"
					>Invalid <a
						href="https://en.wikipedia.org/wiki/Uniform_Resource_Identifier"
						target="_blank">URI format</a
					>.</i
				>
			{:else}
				<i class="warning">Submit a URI to create a redirect!</i>
			{/if}
		</output>
	</section>
</section>

<style>
	a {
		overflow-wrap: anywhere;
	}
	section {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}
	form {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
	.inputs {
		display: grid;
		grid-template-columns: min-content 1fr;
		gap: 0.5rem;
		align-items: center;

		& label {
			color: var(--color-text-subtle);
		}
	}
	#redirect {
		& a.redirect {
			font-size: 1.2rem;
			font-family: var(--font-family-mono);
		}
		& form {
			color: var(--color-text-subtle);
		}
	}
	#new-redirect {
		padding-top: 1rem;
	}
	#new-redirect h2 {
		font-size: 1.2rem;
	}
	section.allowlist {
		color: var(--color-text-subtle);
		& p :global(svg) {
			display: inline-block;
		}
		& ul {
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			gap: 0.5rem;
			align-items: center;
			font-family: var(--font-family-mono);
		}

		& li {
			display: flex;
			gap: 0.25rem;
			align-items: center;
			color: var(--color-text-warning);
			border-bottom: 1px solid currentColor;

			& button {
				color: var(--color-text-danger);
			}
		}
	}

	h3 {
		display: flex;
		gap: 0.5rem;
		align-items: center;
		font-size: 1.1rem;
	}
	dl {
		display: grid;
		grid-template-columns: max-content 1fr;
		gap: 0.5rem;

		& dt {
			color: var(--color-text-subtle);
		}

		& dd {
			font-family: var(--font-family-mono);
			overflow-wrap: anywhere;
		}
	}

	label {
		user-select: none;
	}
	label:has(input[type='checkbox']) {
		cursor: pointer;
	}

	button.copy {
		display: inline-block;
	}
</style>
