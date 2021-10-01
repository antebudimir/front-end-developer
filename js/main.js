// Register SW
if ('serviceWorker' in navigator) {
	// register him
	navigator.serviceWorker
		.register('/sw.js', {
			updateViaCache: 'none',
			scope: '/',
		})
		.then(() => {
			// finished registering
		})
		.catch((err) => {
			console.warn('Failed to register', err.message);
		});

	// listen for messages
	navigator.serviceWorker.addEventListener('message', ({ data }) => {
		// received a message from the service worker
		console.log(data, 'New message from your service worker.');
	});
}

// SYNC
async function registerPeriodicCheck() {
	const registration = await navigator.serviceWorker.ready;
	try {
		await registration.periodicSync.register('latest-update', {
			minInterval: 24 * 60 * 60 * 1000,
		});
	} catch {
		console.log('Periodic sync could not be registered!');
	}
}

navigator.serviceWorker.ready.then((registration) => {
	registration.periodicSync.getTags().then((tags) => {
		if (tags.includes('latest-update')) skipDownloadingLatestUpdateOnPageLoad();
	});
});

// Slide-In effect
(function slideIn() {
	const slideIns = document.querySelectorAll('.js-slidein');

	window.addEventListener('scroll', slideIn);

	slideIns.forEach((element) => {
		const triggerBottom = window.innerHeight / 1.1;
		const elementTop = element.getBoundingClientRect().top;

		if (triggerBottom > elementTop) {
			element.classList.add('show');
		} else {
			element.classList.remove('show');
		}
	});
})();

// Shrink header on scroll
(function shrinkHeader() {
	const header = document.querySelector('#header'),
		h1 = document.querySelector('h1'),
		logoImg = document.querySelector('.logo-img'),
		menu = document.querySelector('.menu');

	window.addEventListener('scroll', shrinkHeader);

	if (window.innerWidth < 1024) {
		if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
			header.style.transition = 'padding 300ms';
			header.style.padding = '0.5rem 1rem';
			logoImg.style.width = '1.8rem';
			h1.style.fontSize = '1.5rem';
			logoImg.style.transition = 'width 300ms';
			h1.style.transition = 'font-size 300ms';
			menu.style.top = '2.77rem';
			menu.style.height = 'calc(100vh - 2.8rem)';
		} else {
			header.style.padding = '1rem';
			logoImg.style.width = '2.3rem';
			h1.style.fontSize = '2rem';
			menu.style.top = '4.2rem';
			menu.style.height = 'calc(100vh - 4.2rem)';
		}
	}
})();

// Hamburger menu
(function hamburgerMenu() {
	if (window.innerWidth < 1024) {
		const hamburger = document.querySelector('.hamburger'),
			menu = document.querySelector('.menu'),
			body = document.querySelector('body');

		hamburger.addEventListener('click', () => {
			if (menu.style.display === 'none' || menu.style.display === '') {
				setTimeout(() => {
					menu.style.display = 'flex';
					menu.style.flexFlow = 'column nowrap';
					menu.style.justifyContent = 'center';
					menu.style.alignItems = 'center';
					menu.style.animation = 'slideIn 300ms ease-in';
				}, 1);

				hamburger.classList.toggle('open');
				body.style.overflow = 'hidden';
			} else {
				slideOut();
			}
		});

		// Outside click
		menu.addEventListener('click', () => {
			slideOut();
		});

		function slideOut() {
			menu.style.animation = 'slideOut 450ms ease-in';
			setTimeout(() => {
				menu.style.display = 'none';
			}, 400);

			hamburger.classList.toggle('open');
			body.style.overflow = 'auto';
		}
	}
})();

// Intro section
(function introCounter() {
	const metrics = document.querySelector('#metrics'),
		observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting === true) {
						const years = document.querySelector('.years'),
							projects = document.querySelector('.projects'),
							clients = document.querySelector('.clients');

						// timing as mobile window progresess
						if (window.innerWidth < 1024) {
							counter(years, 10, 150);
							counter(projects, 95, 35);
							counter(clients, 35, 130);
						} // timing to end at the same time
						else if (window.innerWidth > 1023) {
							counter(years, 10, 150);
							counter(projects, 95, 18);
							counter(clients, 35, 50);
						}

						function counter(subject, target, timing) {
							let count = 0;

							const counter = setInterval(() => {
								count++;

								subject.innerText = `${count}`;

								if (count > target) {
									clearInterval(counter);
								}
							}, timing);
						}

						observer.unobserve(metrics);
					}
				});
			},
			{ threshold: 0.3 },
		);

	observer.observe(metrics);
})();

// Skills section
(function skillsMeters() {
	const meterBars = document.querySelector('#meter-bars'),
		primaryFills = document.querySelectorAll('.primary-fill'),
		secondaryFills = document.querySelectorAll('.secondary-fill'),
		tertiaryFills = document.querySelectorAll('.tertiary-fill'),
		fillsList = [primaryFills, secondaryFills, tertiaryFills],
		allPercentages = [
			'primary-percentage',
			'secondary-percentage',
			'tertiary-percentage',
		],
		observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting === true) {
						// Filling bars with color
						(function colorFiller() {
							let i = 0;

							fillsList.forEach((listItem, percentage) => {
								percentage = allPercentages[i++];

								listItem.forEach((fill) => {
									fill.classList.add(percentage);
								});
							});
						})();

						// Counting percentages
						(function percentageCounter() {
							// 90%
							const primaryPercentageNumbers = document.querySelectorAll(
									'.primary-percentage-number',
								),
								// 80%
								secondaryPercentageNumbers = document.querySelectorAll(
									'.secondary-percentage-number',
								),
								// 50%
								tertiaryPercentageNumbers = document.querySelectorAll(
									'.tertiary-percentage-number',
								);

							primaryPercentageNumbers.forEach((number) => {
								counter(number, 90, 32);
							});

							secondaryPercentageNumbers.forEach((number) => {
								counter(number, 80, 35);
							});

							tertiaryPercentageNumbers.forEach((number) => {
								counter(number, 50, 56);
							});

							function counter(element, target, timing) {
								let count = 0;

								const counter = setInterval(() => {
									element.innerText = `${count++}%`;

									if (count > target) {
										clearInterval(counter);
									}
								}, timing);
							}
						})();

						observer.unobserve(meterBars);
					}
				});
			},
			{ threshold: 0.5 },
		);

	observer.observe(meterBars);
})();

// Create a box and group elements together for desktop layout
(function groupingElements() {
	function boxing(
		containerName,
		containerID,
		elementOne,
		elementTwo,
		elementThree,
		method,
	) {
		if (window.innerWidth > 1023) {
			containerName = document.createElement('div');
			containerName.setAttribute('id', `${containerID}`);

			containerName.append(elementOne, elementTwo);

			if (method === 'prepend') {
				elementThree.prepend(containerName);
			} else if (method === 'append') {
				elementThree.append(containerName);
			}
		}
	}

	// HEADER
	const headerSectionContainer = document.querySelector(
			'#header .section-container',
		),
		primaryHeading = document.querySelector('.primary-heading'),
		logoImg = document.querySelector('.logo-img');

	boxing(
		'headerBox',
		'header-box',
		logoImg,
		primaryHeading,
		headerSectionContainer,
		'prepend',
	);

	// CONTACT
	const map = document.querySelector('.map'),
		contactForm = document.querySelector('#contact-form'),
		contactSectionContainer = document.querySelector(
			'#contact .section-container',
		);

	boxing(
		'contactBox',
		'contact-box',
		map,
		contactForm,
		contactSectionContainer,
		'append',
	);
})();

// Sharing links
(function sharingToggler() {
	const toggle = document.querySelector('.toggle');

	toggle.addEventListener('click', () => {
		const iconContainers = document.querySelectorAll('.icon-container');

		iconContainers.forEach((iconContainer) => {
			iconContainer.classList.toggle('open');
		});
	});
})();

// scrollToTop button
(function scrollToTop() {
	const scrollToTop = document.querySelector('.scrollButton'),
		sharingLinks = document.querySelector('#sharing-links');

	window.addEventListener('scroll', () => {
		// scroll button
		if (
			document.body.scrollTop > 1000 ||
			document.documentElement.scrollTop > 1000
		) {
			scrollToTop.style.display = 'block';
		} else {
			scrollToTop.style.display = 'none';
		}

		// shared listener for sharing section too:
		if (
			document.body.scrollTop > 1500 ||
			document.documentElement.scrollTop > 1500
		) {
			sharingLinks.style.display = 'flex';
			sharingLinks.style.flexFlow = 'column nowrap';
		} else {
			sharingLinks.style.display = 'none';
		}
	});

	scrollToTop.addEventListener('click', () => {
		document.body.scrollTop = 0;
		document.documentElement.scrollTop = 0;
	});
})();

// Textarea auto resize
(function autoResize() {
	const textArea = document.querySelector('[data-autoresize]'),
		offset = textArea.offsetHeight - textArea.clientHeight;

	textArea.addEventListener('input', (e) => {
		e.target.style.height = 'auto';
		e.target.style.height = e.target.scrollHeight + offset + 'px';
	});
})();

// Date
(function getCurrentDate() {
	const currentYear = document.querySelector('#currentYear');
	currentYear.innerText = new Date().getFullYear();
})();
