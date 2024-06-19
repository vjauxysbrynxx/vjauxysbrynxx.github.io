document.addEventListener("DOMContentLoaded", () => {
    const terminalInput = document.getElementById("terminal-input");
    const terminalOutput = document.getElementById("terminal-output");
    const commandOutput = document.createElement("div");
    // terminalOutput.innerHTML = "Hello world! What can I do for you today?";
    typeWriter(`Hello world! What can I do for you today?`, commandOutput);
                terminalOutput.appendChild(commandOutput);

    const commands = {
        help: "Available commands: help, about, contact, cv, projects, skills, and clear.", typeWriter,
        about: "I am Benz Vrianne Beleber, a web developer with a passion for creating interactive web experiences.",
        contact: "You can reach me at bpbeleber@up.edu.ph.",
        skills: showSkills,
        projects: showProjects,
        cv: showCV,
        clear: () => {
            terminalOutput.innerHTML = "";
        }
    };

    terminalInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            const input = terminalInput.value.trim().toLowerCase();
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
    
    function showCV() {
        const cvContent = `
BENZ VRIANNE P. BELEBER
Email: bpbeleber@up.edu.ph

EDUCATION

University of the Philippines Visayas Division of Physical Sciences and Mathematics
Miagao Iloilo
B.S. in Computer Science Third Year (2021 - present)

Iloilo National High School
Iloilo City Iloilo
Senior High School With High Honors (2021)

Barotac Nuevo National Comprehensive High School
Barotac Nuevo Iloilo
Junior High School With High Honors (2019)

ACHIEVEMENTS

DISMTA Excellence in Mathematics Awardee, Barotac Nuevo National Comprehensive High School (2019)
Participant, Western Visayas Regional Statistics Quiz, NEDA Region 6 (2019)
5th Place, Division Scilympics Create Show and Tell, New Lucena National Comprehensive High School (2017)
Participant, Division Schools Press Conference Collaborative Desktop Publishing Photographer Layout Artist, Oton National Highschool (2016)
2nd Place, Panulaton Photojournalism Regional Level, Silak Publication, Punta Villa Iloilo City (2015)
3rd Place, Metrobank-MTAP DepEd Math Challenge Division Level, Iloilo National High School (2015)

PROJECTS

SumSang Phone Emulator (2021)
Phone emulator built with Python

Typer Cat (2022)
A typing game built with Java

Op Ja Kaw? (2023)
A conference calling website built with HTML, Javascript, PHP, and CSS

Guitar Distortion Pedal using Arduino Uno (2023)
A guitar effects pedal prototype using an Arduino Uno

POS System (2024)
A point-of-sale system website built with HTML, Javascript, PHP, and CSS

Project Kurdam (2023 - present)
Top-down turn-based 2D game built with C# and Unity

SKILLS

Experience with Python, C, Javascript, HTML, CSS, PHP
Experience with web development
Experience with game development
Experience with electronics repair and soldering
Experience in photo and video editing
Experience in music production

LEADERSHIP EXPERIENCE

President, UP Sonata (2023 - present)
Treasurer, UP Sonata (2023)
Batch Representative, Diwata Esports (2023)

HOBBIES AND INTERESTS

Music: 4 years of writing songs, currently a vocalist and rhythm guitarist of a small indie band
Videography: Likes to record and edit short films with visual effects
Inventions: Likes to create and design prototypes or simple inventions
        `;

        const commandOutput = document.createElement("pre");
        commandOutput.classList.add("output-line");
        terminalOutput.appendChild(commandOutput);
        typeWriter(cvContent, commandOutput);
    }

    function showSkills() {
        const cvContent = `
SKILLS

Experience with Python, C, Javascript, HTML, CSS, PHP
Experience with web development
Experience with game development
Experience with electronics repair and soldering
Experience in photo and video editing
Experience in music production
        `;

        const commandOutput = document.createElement("pre");
        commandOutput.classList.add("output-line");
        terminalOutput.appendChild(commandOutput);
        typeWriter(cvContent, commandOutput);
    }

    function showProjects() {
        const cvContent = `
PROJECTS

SumSang Phone Emulator (2021)
Phone emulator built with Python

Typer Cat (2022)
- A typing game built with Java

Op Ja Kaw? (2023)
- A conference calling website built with HTML, Javascript, PHP, and CSS

Guitar Distortion Pedal using Arduino Uno (2023)
- A guitar effects pedal prototype using an Arduino Uno

POS System (2024)
- A point-of-sale system website built with HTML, Javascript, PHP, and CSS

Project Kurdam (2023 - present)
- Top-down, open-world, turn-based 2D game built with C# and Unity inspired from Dungeons and dragons and Pokemon.
        `;

        const commandOutput = document.createElement("pre");
        commandOutput.classList.add("output-line");
        terminalOutput.appendChild(commandOutput);
        typeWriter(cvContent, commandOutput);
    }
});