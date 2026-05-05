/**
 * Historical helper: previously stripped WebSite SearchAction when no search existed.
 * Sitewide search now lives at /search.html?q= — do not strip SearchAction from JSON-LD.
 */
console.log('strip-jsonld-search-action: noop (site search implemented)');
process.exit(0);
