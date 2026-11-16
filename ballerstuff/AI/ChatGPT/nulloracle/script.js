
const questionInput = document.getElementById("question");
const askButton = document.getElementById("ask-button");

const responseBox = document.getElementById("response");
const responseStatus = document.getElementById("response-status");
const charCount = document.getElementById("char-count");

// The Oracle's vocabulary.
// It combines these fragments to manufacture nonsense.
const openings = [
    "The void has considered your question.",
    "After consulting several imaginary authorities,",
    "The ancient servers have spoken.",
    "A suspiciously confident voice whispers:",
    "The Oracle has briefly stopped doing nothing."
];

const answers = [
    "the answer lies somewhere between a forgotten password and an unpaid electricity bill.",
    "your destiny is currently buffering. Please try again never.",
    "the universe has declined to comment.",
    "you are correct, but only in a hypothetical timeline.",
    "the problem is not your question. It is the person asking it.",
    "a pigeon somewhere knows the answer. Unfortunately, it refuses to cooperate.",
    "the answer is 42. The remaining 41 answers were classified.",
    "you should probably reconsider your life choices. Respectfully.",
    "the truth is hidden inside a directory you forgot to back up."
];

const endings = [
    "Trust absolutely nothing.",
    "This prediction is legally meaningless.",
    "The Oracle accepts no responsibility.",
    "Have a questionable day.",
    "End of transmission.",
    "Please do not tell anyone about this."
];

// Select a random item from an array.
function randomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

// Generate a response using random text fragments.
function generateResponse(question) {
    const opening = randomItem(openings);
    const answer = randomItem(answers);
    const ending = randomItem(endings);

    return `${opening}\n\n"${question}"\n\n${answer}\n\n[ ${ending} ]`;
}

// Update the character counter while typing.
questionInput.addEventListener("input", () => {
    charCount.textContent = `${questionInput.value.length} / 300`;
});

// Handle the Ask button.
askButton.addEventListener("click", () => {
    const question = questionInput.value.trim();

    // Reject empty questions.
    if (!question) {
        responseBox.textContent = "ERROR: The Oracle cannot read empty thoughts.";
        responseStatus.textContent = "INVALID INPUT";
        responseStatus.className = "error";
        return;
    }

    // Simulate a system processing delay.
    responseBox.textContent = "Consulting the void...\nPlease remain questionable.";
    responseStatus.textContent = "PROCESSING";
    responseStatus.className = "";

    askButton.disabled = true;
    askButton.textContent = "PROCESSING...";

    setTimeout(() => {
        responseBox.textContent = generateResponse(question);

        responseStatus.textContent = "RESPONSE GENERATED";
        responseStatus.className = "ready";

        askButton.disabled = false;
        askButton.textContent = "CONSULT THE VOID ↗";
    }, 900);
});

// Allow Enter to submit, Shift + Enter for a new line.
questionInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        askButton.click();
    }
});
