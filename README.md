# URI/URL Redirect Service

Sometimes you just need to [wrap a URI in a redirect](https://bscotch.github.io/redirect/).

The use case that resulted in this project was needing
URIs with custom protocols/schemes, but the discovery
that many services (Notion, Google Docs, etc) won't let you
hyperlink to such URIs!

Fortunately browsers have great support for custom URI
protocols, so the solution was pretty straight forward:
have a regular HTTP URL that redirects to the custom URI,
so that the redirector URL can be hyperlinked anywhere
and the browser can do its magic when someone follows
such a link.
