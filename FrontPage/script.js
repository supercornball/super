// Console handler.
const input = document.getElementById("console-input");
const output = document.getElementById("console-output");

function printLine(text, isError = false) {
	const line = document.createElement("div");
	line.textContent = "> " + text;
	
	if (isError) line.style.color = "#ff5555";
	output.appendChild(line);
	output.scrollTop = output.scrollHeight; // Auto-scroll to bottom
}

// Redirect console.log to also print in da page.
const originalLog = console.log;
console.log = function (...args) {
	originalLog.apply(console, args);
	printLine(args.join(" "));
};

// Run code when pressing Enter.
input.addEventListener("keydown", (e) => {
	if (e.key === "Enter" && input.value.trim() !== "") {
		const code = input.value;
		input.value = "";
		try {
			const result = eval(code);
			if (result !== undefined) printLine(result);
		} catch (err) {
			printLine(err.message, true);
		}
	}
});
