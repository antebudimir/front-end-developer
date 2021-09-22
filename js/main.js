// Slide-In effect
// (function slideIn() {
// 	const slideIns = document.querySelectorAll('.js-slidein');

// 	window.addEventListener('scroll', slideIn);

// 	slideIns.forEach((element) => {
// 		const triggerBottom = window.innerHeight / 1.1;
// 		const elementTop = element.getBoundingClientRect().top;

// 		if (triggerBottom > elementTop) {
// 			element.classList.add('show');
// 		} else {
// 			element.classList.remove('show');
// 		}
// 	});
// })();

// Shrink header on scroll
// (function shrinkHeader() {
// 	const header = document.querySelector('#header'),
// 		logo = document.querySelector('.logo-img'),
// 		menu = document.querySelector('.menu');

// 	window.addEventListener('scroll', shrinkHeader);

// 	if (window.innerWidth < 1024) {
// 		if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
// 			header.style.borderBottom = '1px solid rgba(75, 75, 75, 0.2)';
// 			logo.style.width = '5rem';
// 			menu.style.top = '3.9rem';
// 			menu.style.height = 'calc(100vh - 4rem)';
// 		} else {
// 			header.style.borderBottom = 'none';
// 			logo.style.width = '7rem';
// 			menu.style.top = '4.93rem';
// 		}
// 	} else if (window.innerWidth > 1023) {
// 		if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
// 			header.style.borderBottom = '1px solid rgba(75, 75, 75, 0.2)';
// 			logo.style.width = '7rem';
// 		} else {
// 			header.style.borderBottom = 'none';
// 			logo.style.width = '9rem';
// 		}
// 	}
// })();

// Hamburger menu
(function hamburgerMenu() {
	if (window.innerWidth < 1024) {
		const hamburger = document.querySelector('.hamburger'),
			menu = document.querySelector('.menu'),
			menuIcon = document.querySelector('#menu-icon'),
			body = document.querySelector('body');

		hamburger.addEventListener('click', () => {
			if (menu.style.display === 'none' || menu.style.display === '') {
				setTimeout(() => {
					menu.style.display = 'flex';
					menu.style.flexFlow = 'column nowrap';
					menu.style.justifyContent = 'center';
					menu.style.alignItems = 'center';
					menu.style.animation = 'slideIn 400ms ease-in';
				}, 1);

				menuIcon.classList.remove('icon-menu');
				menuIcon.classList.add('icon-x');
				body.style.overflow = 'hidden';
			} else {
				slideOut();
			}
		});

		// Hide menu after clicking on anchored menu-item
		const menuLinks = document.querySelectorAll('.menu-link');

		menuLinks.forEach((link) => {
			link.addEventListener('click', () => {
				slideOut();
			});
		});

		// Outside click
		menu.addEventListener('click', () => {
			slideOut();
		});

		function slideOut() {
			menu.style.animation = 'slideOut 350ms ease-in';
			setTimeout(() => {
				menu.style.display = 'none';
			}, 300);

			menuIcon.classList.remove('icon-x');
			menuIcon.classList.add('icon-menu');
			body.style.overflow = 'auto';
		}
	}
})();

// Counter
// Counter 1
(function yearCounter() {
	const observer = new IntersectionObserver(
		function (entries) {
			if (entries[0].isIntersecting === true) {
				const numberOfYears = document.querySelector('.number-of-years');
				let count = 0;

				let counter = setInterval(() => {
					count++;
					numberOfYears.innerText = `${count}`;
					if (count > 99) clearInterval(counter);
				}, 20);
			}
		},
		{ threshold: [1] },
	);
	observer.observe(document.querySelector('.years'));
})();

// Counter 2
// (function projectCounter() {
// 	const observer = new IntersectionObserver(
// 		function (entries) {
// 			if (entries[0].isIntersecting === true) {
// 				const numberOfProjects = document.querySelector('.number-of-projects');
// 				let count = 1000;

// 				let counter = setInterval(() => {
// 					count += 1000;
// 					numberOfProjects.innerText = `${count + '+'}`;
// 					if (count > 199000) clearInterval(counter);
// 				}, 10);
// 			}
// 		},
// 		{ threshold: [1] },
// 	);

// 	observer.observe(document.querySelector('.years'));
// })();

// // scrollToTop button
// (function scrollToTop() {
// 	const scrollToTop = document.querySelector('.scrollButton');

// 	window.addEventListener('scroll', () => {
// 		if (
// 			document.body.scrollTop > 1000 ||
// 			document.documentElement.scrollTop > 1000
// 		) {
// 			scrollToTop.style.display = 'block';
// 		} else {
// 			scrollToTop.style.display = 'none';
// 		}
// 	});

// 	scrollToTop.addEventListener('click', () => {
// 		document.body.scrollTop = 0;
// 		document.documentElement.scrollTop = 0;
// 	});
// })();

// Textarea auto resize
// (function autoResize() {
// 	const textArea = document.querySelector('[data-autoresize]'),
// 		offset = textArea.offsetHeight - textArea.clientHeight;

// 	textArea.addEventListener('input', (e) => {
// 		e.target.style.height = 'auto';
// 		e.target.style.height = e.target.scrollHeight + offset + 'px';
// 	});
// })();

// Date
// (function getCurrentDate() {
// 	const currentYear = document.querySelector('#currentYear');
// 	currentYear.innerText = new Date().getFullYear();
// })();
