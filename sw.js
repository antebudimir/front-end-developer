const version = 1;
const preCacheName = `static-${version}`;
const precache = [
	'/',
	'/fonts/icomoon.woff',
	'/fonts/VarelaRound-Regular.woff',
	'/fonts/Varta-Regular.woff',
	'/index.html',
	// '/thank-you.html',
	// '/404.html',
	'/img/logo-img.png',
	'/img/showcase-desktop.svg',
	'/img/showcase-mobile.svg',
	'/img/showcase-tablet.svg',
	'/img/clients/aliya-budimir-logo.png',
	'/img/clients/Bvlgari-logo.png',
	'/img/clients/gempathy-logo.svg',
	'/img/portfolio/academy-mockup.jpg',
	'/img/portfolio/astrologist-mockup.jpg',
	'/img/portfolio/band-mockup.jpg',
	'/img/portfolio/bjelovar-mockup.jpg',
	'/img/portfolio/construction-mockup.jpg',
	'/img/portfolio/cuddlies-mockup.jpg',
	'/img/portfolio/designer-mockup.jpg',
	'/img/portfolio/design-studio-mockup.jpg',
	'/img/portfolio/petroleum-engineer-mockup.jpg',
];
//if you add '/404.html' to the precache, the file must exist or the install event will fail

self.addEventListener('install', (e) => {
	//installed
	e.waitUntil(
		caches
			.open(preCacheName)
			.then((cache) => {
				console.log('caching the static files');
				cache.addAll(precache);
			})
			.catch(console.warn),
	);
	//load pre-cache
});

self.addEventListener('activate', (e) => {
	//activating
	e.waitUntil(
		caches
			.keys()
			.then((keys) => {
				return Promise.all(
					keys
						.filter((key) => key !== preCacheName)
						.map((key) => caches.delete(key)),
				);
			})
			.catch(console.warn),
	);
	//delete old caches
});

self.addEventListener('fetch', (e) => {
	//fetch request received
	//send back a response from cache or fetch
	e.respondWith(
		caches.match(e.request).then((cacheRes) => {
			return (
				cacheRes ||
				fetch(e.request).then(
					(response) => {
						return response;
					},
					(err) => {
						// added by me
						console.log(
							'[Service Worker] Fetch failed; returning offline page instead.',
							err,
						);

						return precache;
						//in case of network failure, send precache
					},
				)
			);
		}),
	);
});

self.addEventListener('message', (e) => {
	//message received
	//do things based on message props
	let data = e.data;
	console.log('SW received', data);
});

const sendMessage = async (msg) => {
	let allClients = await clients.matchAll({ includeUncontrolled: true });
	return Promise.all(
		allClients.map((client) => {
			let channel = new MessageChannel();
			return client.postMessage(msg);
		}),
	);
};

// PERIODIC SYNC
self.addEventListener('periodicsync', (e) => {
	if (e.tag == 'latest-update') {
		e.waitUntil(fetchAndCacheLatestUpdate());
	}
});
