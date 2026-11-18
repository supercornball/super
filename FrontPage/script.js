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

// Print a single line with '> ' (skips completely empty lines). Edit: replaced the prompt for the reply.
function printInputLine(text) {
	const line = document.createElement('div');
	line.textContent = '> ' + text;
	consoleOutput.appendChild(line);
	consoleOutput.scrollTop = consoleOutput.scrollHeight;
}

function printOutputLine(text, isError = false) {
	const line = document.createElement('div');
	line.textContent = 'Console: ' + text;
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
	printOutputLine(args.map(a => (typeof a === 'object' ? JSON.stringify(a) : String(a))).join(' '));
};

const origError = console.error;
console.error = function (...args) {
	origError.apply(console, args);
	printOutputLine(args.map(a => (typeof a === 'object' ? JSON.stringify(a) : String(a))).join(' '), true);
};

// Split input into runnable chunks (line-by-line, keeping { } / ( ) / [ ] blocks together).
function splitStatements(code) {
	const lines = code.split('\n');
	const chunks = [];
	let current = [];
	let depth = 0;

	for (const line of lines) {
		if (line.trim() === '' && depth === 0) continue;
		current.push(line);

		for (const ch of line) {
			if (ch === '{' || ch === '(' || ch === '[') depth++;
			if (ch === '}' || ch === ')' || ch === ']') depth--;
		}

		if (depth <= 0) {
			depth = 0;
			chunks.push(current.join('\n'));
			current = [];
		}
	}

	if (current.length > 0) {
		chunks.push(current.join('\n'));
	}

	return chunks;
}

// Execute input when RUN is clicked.
function runConsoleCode() {
	const raw = consoleInput.value;
	if (raw.trim() === '') return;

	consoleInput.value = '';
	const chunks = splitStatements(raw);

	for (const chunk of chunks) {
		chunk.split('\n').forEach(line => {
			if (line.trim() !== '') printInputLine(line);
		});

		// Convert top-level let/const to var so variables persist across runs.
		const persistent = chunk.replace(/^\s*(let|const)\s+/gm, 'var ');

		try {
			const result = window.eval(persistent);
			if (result !== undefined) {
				const formatted = typeof result === 'object' ? JSON.stringify(result) : String(result);
				printOutputLine(formatted);
			}
		} catch (err) {
			printOutputLine(err.name + ': ' + err.message, true);
		}
	}
}

if (consoleRun && consoleInput && consoleOutput) {
	consoleRun.addEventListener('click', runConsoleCode);

	// Ctrl+Enter (or Cmd+Enter) runs the code; normal Enter adds a newline.
	consoleInput.addEventListener('keydown', (e) => {
		if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
			e.preventDefault();
			runConsoleCode();
		}
	});
}
