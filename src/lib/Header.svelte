<script lang="ts">
	import { base } from '$app/paths';
	import { faGithub } from '@fortawesome/free-brands-svg-icons';
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

	<menu class="reset">
		<li>
			<a href="https://github.com/bscotch/redirect" title="See the source code">
				<Fa icon={faGithub} size="lg" />
			</a>
		</li>
	</menu>
</nav>

<style>
	nav {
		display: flex;
		width: 100%;
		max-width: var(--header-max-width);
		justify-content: space-between;
	}
	nav menu a {
		color: var(--color-text);
	}
	nav menu a:hover {
		color: var(--color-link-hover);
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
