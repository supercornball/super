// Console Stuff (Lowk the previous version is shi so I just use Google Overview to make a better ver).
const input = document.getElementById("console-input");
const output = document.getElementById("console-output");
const runBum = document.getElementById("console-run");

function printLine(text, type = "result") {
	const line = document.createElement("div");
	line.style.marginBottom = "6px";
	
	if (type === "command") {
		line.style.color = "#38bdf8";
		line.textContent = "> " + text;
	} else if (type === "error") {
		line.style.color = "#f87171";
		line.textContent = "✖ " + text;
	} else {
		line.style.color = "#a7f3d0";
		line.textContent = "← " + text;
	}
	
	output.appendChild(line);
	output.scrollTop = output.scrollHeight;
}

const originalLog = console.log;
console.log = function (...args) {
	originalLog.apply(console, args);
	printLine(args.join(" "), "result");
};

function executeCode() {
	const rawCode = input.value.trim();
	if (!rawCode) return;
	
	printLine(rawCode, "command");
	input.value = "";
	
	// Convert top-level 'let' and 'const' to 'var' so variables persist across runs
	const persistentCode = rawCode.replace(/^\s*(let|const)\s+/gm, "var ");
	
	try {
		const result = window.eval(persistentCode);
		if (result !== undefined) printLine(result, "result");
	} catch (err) {
		printLine(err.message, "error");
	}
}

// Run when clicking the button (Enter inside textarea now acts as a normal newline)
runBum.addEventListener("click", executeCode);

// Optional shortcut: Ctrl+Enter or Cmd+Enter also clicks Run
input.addEventListener("keydown", (e) => {
	if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
		e.preventDefault();
		executeCode();
	}
});
