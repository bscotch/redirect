<script lang="ts">
	import { internalUrl } from '../../lib/internalUrls.svelte.js';
</script>

<section class="post">
	<h1>About</h1>

	<p>
		This Redirector is a simple, privacy-first web app that lets you create links hosted here to
		redirect to other URLs. It all happens in the browser, so you don't have to worry about your
		data being sent to a server (see the <a href={internalUrl('/privacy')}>Privacy Policy</a>).
	</p>

	<p>
		Why would you want to do this? One reason is to make it safer to share links you might not
		trust, since the Redirector will first show the destination link to the user, allowing them to
		decide if they trust its origin.
	</p>

	<p>
		The main reason we built this, though, is because we sometimes need to use custom URI
		schemas/protocols for deep linking into our games and applications, and lots of services won't
		even let us create hyperlinks for custom protocols! So we needed to be able to create links that
		would work anywhere, which meant <code>http</code> links, and having a simple redirector lets us
		do that.
	</p>

	<p>
		We <a href={internalUrl('/terms')}>guarantee nothing</a> about the availability or behavior of
		this service. But, hey, it's <a href="https://github.com/bscotch/redirect">open source</a>
		so you can run your own if you want!
	</p>
</section>
