<script lang="ts">
	import encodeQR from '@paulmillr/qr';

	let { url, width = '100px' }: { url: string; width: string } = $props();

	let svg = encodeQR(url, 'svg', { border: 1, ecc: 'low' });
</script>

<div style={`width: ${width}`}>
	{@html svg}
</div>

<style>
	div {
		display: inline-block;
		background-color: white;
	}
</style>
