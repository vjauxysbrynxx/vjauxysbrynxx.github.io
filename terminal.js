document.addEventListener("DOMContentLoaded", () => {
    const terminalInput = document.getElementById("terminal-input");
    const terminalOutput = document.getElementById("terminal-output");

    const commands = {
        help: "Available commands: help, about, contact, cv, projects, and clear.", typeWriter,
        about: "I am Benz Vrianne Beleber, a web developer with a passion for creating interactive web experiences.",
        contact: "You can reach me at bpbeleber@up.edu.ph",
        cv: () => {
            window.location.href = "\Beleber, Benz Vrianne CV.pdf";
        },

        projects: "",

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
                    typeWriter(commands[input], commandOutput);
                    terminalOutput.appendChild(commandOutput);
                }
            } else {
                typeWriter(`'${input}' is not recognized as a command. Type 'help' for a list of commands.`, commandOutput);
                terminalOutput.appendChild(commandOutput);
            }

            const blankLine = document.createElement("div");
            blankLine.classList.add("output-line");
            blankLine.innerHTML = "&nbsp;"; //non breaking space
            terminalOutput.appendChild(blankLine);
            terminalOutput.scrollTop = terminalOutput.scrollHeight;
        }
    });

    function typeWriter(text, element) {
        let i = 0;
        function typingEffect() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(typingEffect, 10);
            }
        }
        typingEffect();
    }

});