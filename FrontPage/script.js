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

// Console elements.
const consoleInput = document.getElementById('console-input');
const consoleOutput = document.getElementById('console-output');
const consoleRun = document.getElementById('console-run');

// Print each line individually with '> ' (never grouped or summarized).
function printRawLine(text, isError = false) {
	const line = document.createElement('div');
	line.textContent = '> ' + text;
	if (isError) {
		line.style.color = '#dc2626';
	}
	consoleOutput.appendChild(line);
	consoleOutput.scrollTop = consoleOutput.scrollHeight;
}

// Mirror console.log and console.error to the output box.
const origLog = console.log;
console.log = function (...args) {
	origLog.apply(console, args);
	printRawLine(args.map(a => (typeof a === 'object' ? JSON.stringify(a) : String(a))).join(' '));
};

const origError = console.error;
console.error = function (...args) {
	origError.apply(console, args);
	printRawLine(args.map(a => (typeof a === 'object' ? JSON.stringify(a) : String(a))).join(' '), true);
};

// Execute input when RUN is clicked.
function runConsoleCode() {
	const raw = consoleInput.value;
	if (raw.trim() === '') return;

	printRawLine(raw);
	consoleInput.value = '';

	// Convert top-level let/const to var so variables persist across runs.
	const persistent = raw.replace(/^\s*(let|const)\s+/gm, 'var ');

	try {
		const result = window.eval(persistent);
		if (result !== undefined) {
			const formatted = typeof result === 'object' ? JSON.stringify(result) : String(result);
			printRawLine(formatted);
		}
	} catch (err) {
		printRawLine(err.name + ': ' + err.message, true);
	}
}

consoleRun.addEventListener('click', runConsoleCode);

// Ctrl+Enter (or Cmd+Enter) runs the code; normal Enter adds a newline.
consoleInput.addEventListener('keydown', (e) => {
	if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
		e.preventDefault();
		runConsoleCode();
	}
});
