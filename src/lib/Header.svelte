<script lang="ts">
	import { faDiamondTurnRight, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
	import { internalUrl } from './internalUrls.svelte.js';
</script>

<nav>
	<a href={internalUrl('/')} title="Go home">
		<span class="sr-only">Go Home</span>
		<span class="name">
			<Fa icon={faDiamondTurnRight} size="lg" color="var(--color-logo)" /> Redirector
		</span>
	</a>
	<a href={internalUrl('/about')} title="Go home">
		<Fa icon={faInfoCircle} title="About" color="var(--color-text-subtle)" />
	</a>
</nav>

<style>
	nav {
		display: flex;
		width: 100%;
		max-width: var(--header-max-width);
		justify-content: space-between;
	}
	nav a {
		display: flex;
		align-items: center;
		text-decoration: none;
	}
	nav a:hover {
		text-decoration: underline;
	}
	nav a .name {
		font-weight: bold;
		color: var(--color-text);
		display: inline-flex;
		gap: 0.5rem;
	}
</style>
