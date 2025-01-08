<script lang="ts">
	import Footer from '../lib/Footer.svelte';
	import Header from '../lib/Header.svelte';
</script>

<div id="content" class="scroller">
	<header>
		<Header />
	</header>

	<main>
		<slot />
	</main>

	<Footer />
</div>

<style>
	#content {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		padding-top: 1rem;
	}
	header {
		padding-bottom: 1rem;
	}

	main {
		flex: 1;
	}
</style>
