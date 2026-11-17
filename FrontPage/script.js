// Console Temporarily Removed.
// Get element thingy.
const headbum = document.getElementById('header-button');
const closebum = document.querySelector('.bumclose');
const curtain = document.getElementById('curtain');
const header = document.querySelector('header');

// Toggle menu function.
function curts() {
	const drawn = !curtain.classList.contains('topg');
	
	if (drawn) {
		// Fade out burgir.
		headbum.classList.add('lowk');
		// Show overlay with X button.
		curtain.classList.add('topg');
	} else {
		// Hide overlay.
		curtain.classList.remove('topg');
		// Fade in burger button.
		headbum.classList.remove('lowk');
	}
	
	// Prevent body scroll when menu is open.
	if (drawn) {
		document.body.classList.add('scrock');
	} else {
		document.body.classList.remove('scrock');
	}
}

// Burgir button click event.
headbum.addEventListener('click', curts);

// Close button click event.
closebum.addEventListener('click', curts);

// Overlay click to close menu (but not when clicking the nav links).
curtain.addEventListener('click', (e) => {
	// Only close if clicking directly on overlay, not on its children.
	if (e.target === curtain) {
		curts();
	}
});

// Close menu when clicking nav links. 
const curtscont = document.querySelectorAll('#porter a');
curtscont.forEach(link => {
	link.addEventListener('click', () => {
		if (curtain.classList.contains('topg')) {
			curts();
		}
	});
});

// Scroll detection for header shadow effect.
let scrolpon = 0;

window.addEventListener('scroll', () => {
	const scrollet = window.scrollY || document.documentElement.scrollTop;
	
	// Add shadow when scrolled down from top.
	if (scrollet > 10) {
		header.classList.add('scrolle');
	} else {
		header.classList.remove('scrolle');
	}
	
	scrolpon = scrollet;
});
