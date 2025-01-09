<script lang="ts">
	import { internalUrl } from './internalUrls.svelte.js';
</script>

<footer>
	<nav class="links">
		<ul class="reset">
			<li><a href={internalUrl('/about')}>ℹ️ About</a></li>
			<li><a href={internalUrl('/privacy')}>🔒 Privacy Policy</a></li>
			<li><a href={internalUrl('/terms')}>📖 Terms of Service</a></li>
		</ul>
	</nav>
	<p>
		💖 Support this project by getting <a href="https://www.bscotch.net/games/crashlands-2"
			>our games</a
		>
	</p>
	<p>
		🚀 Created by <a href="https://www.bscotch.net/">Butterscotch Shenanigans</a>
	</p>
	<ul class="reset">
		<li><a href="https://github.com/bscotch/redirect/issues">🐛 Issues</a></li>
		<li>
			<a href="https://github.com/bscotch/redirect"> 🖥️ Source </a>
		</li>
	</ul>
</footer>

<style>
	footer {
		margin-top: 3em;
		padding-block: 1.5em;
		/* border-top: 1px solid var(--color-text-subtle); */
		width: 100%;
		max-width: var(--header-max-width);
		margin: 3em auto 0 auto;
	}
	footer :where(p, a) {
		font-size: 0.8rem;
		text-decoration: none;
	}
	ul {
		display: flex;
		flex-direction: row;
		gap: 0.75em;
	}
</style>
