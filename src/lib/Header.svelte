<script lang="ts">
	import { base } from '$app/paths';
	import { faDiamondTurnRight } from '@fortawesome/free-solid-svg-icons';
	import Fa from 'svelte-fa';
</script>

<nav>
	<a href={base || '/'} title="Go home">
		<span class="sr-only">Go Home</span>
		<span class="name">
			<Fa icon={faDiamondTurnRight} size="lg" color="var(--color-logo)" /> Redirector
		</span>
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
