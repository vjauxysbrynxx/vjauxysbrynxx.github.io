document.addEventListener("DOMContentLoaded", () => {
    const terminalInput = document.getElementById("terminal-input");
    const terminalOutput = document.getElementById("terminal-output");

    const commands = {
        help: "Available commands: help, about, contact, clear, portfolio, blog",
        about: "I Benz Vrianne Beleber, a web developer with a passion for creating interactive web experiences.",
        contact: "You can reach me at myemail@example.com",
        portfolio: () => {
            window.location.href = "https://your-portfolio-link.com";
        },
        blog: () => {
            window.location.href = "https://your-blog-link.com";
        },
        clear: () => {
            terminalOutput.innerHTML = "";
        }
    };

    terminalInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            const input = terminalInput.value.trim();
            terminalInput.value = "";

            const output = document.createElement("div");
            output.classList.add("output-line");
            output.textContent = `> ${input}`;
            terminalOutput.appendChild(output);

            const commandOutput = document.createElement("div");
            commandOutput.classList.add("output-line");

            if (commands[input]) {
                if (typeof commands[input] === "function") {
                    commands[input]();
                } else {
                    commandOutput.textContent = commands[input];
                    terminalOutput.appendChild(commandOutput);
                }
            } else {
                commandOutput.textContent = `'${input}' is not recognized as a command. Type 'help' for a list of commands.`;
                terminalOutput.appendChild(commandOutput);
            }

            terminalOutput.scrollTop = terminalOutput.scrollHeight;
        }
    });
});