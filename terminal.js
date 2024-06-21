document.addEventListener("DOMContentLoaded", () => {
    const terminalInput = document.getElementById("terminal-input");
    const terminalOutput = document.getElementById("terminal-output");
    const commandOutput = document.createElement("div");

    function hello() {
        const cvContent = `
> Hello world! What can I do for you today?
| about | cv | projects | skills | contact |
        `;

        const commandOutput = document.createElement("pre");
        commandOutput.classList.add("output-line");
        terminalOutput.appendChild(commandOutput);
        typeWriter(cvContent, commandOutput);
    }
    hello();

    function clearTerminal () {
        terminalOutput.innerHTML = "";
        hello();
    }

    const commands = {
        help: "Available commands: help, about, contact, cv, projects, skills, and clear.",
        about: "I am Benz Vrianne Beleber, a web developer with a passion for creating interactive web experiences.",
        contact: "You can reach me at " + `<a href= "mailto:bpbeleber@up.edu.ph">bpbeleber@up.edu.ph</a>`,
        skills: showSkills,
        projects: showProjects,
        cv: showCV,
        clear: clearTerminal
    };

    function scrollToBottom() {
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }

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
            blankLine.innerHTML = "&nbsp;";
            terminalOutput.appendChild(blankLine);
            
        }
    });

    function typeWriter(text, element) {
        let i = 0;
        function typingEffect() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(typingEffect, 10);
                scrollToBottom(); 
            }
        }
        typingEffect();
    }

    function showCV() {
        const cvContent = `
BENZ VRIANNE P. BELEBER

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
- Phone emulator built with Python

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

    dragElement(document.getElementById("mydiv"));

    function dragElement(elmnt) {
        var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        if (document.getElementById(elmnt.id + "header")) {
            document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
        } else {
            elmnt.onmousedown = dragMouseDown;
        }

        function dragMouseDown(e) {
            e = e || window.event;
            e.preventDefault();

            if (e.target.classList.contains("box")) {
                return;
            }

            
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            document.onmousemove = elementDrag;

            
        }

        function elementDrag(e) {
            e = e || window.event;
            e.preventDefault();
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
            elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
        }

        function closeDragElement() {
            document.onmouseup = null;
            document.onmousemove = null;
        }
    };


    // let isMaximized = false;
    // let terminal = document.getElementById("mydiv");

    // function toggleTerminal(action) {
    //     switch (action) {
    //         case 'exit':
    //             exit();
    //             break;
    //         case 'minimize':
    //             minimize();
    //             break;
    //         case 'maximize':
    //             maximize();
    //             break;
    //         default:
    //             break;
    //     }
    // }

    // function exit() {
    //     terminal.style.display = "none";
    // }

    // function minimize() {
    //     terminal.style.height = "30px";
    //     terminal.style.overflow = "hidden";
    //     document.querySelector(".input-bar").style.display = "none";
    // }

    // function maximize() {
    //     if (!isMaximized) {
    //         terminal.style.position = "fixed";
    //         terminal.style.top = "0";
    //         terminal.style.left = "0";
    //         terminal.style.width = "100%";
    //         terminal.style.height = "100%";
    //         terminal.style.zIndex = "1000";
    //         isMaximized = true;
    //     } else {
    //         terminal.style.position = "absolute";
    //         terminal.style.width = "600px";
    //         terminal.style.height = "400px";
    //         isMaximized = false;
    //     }
    //     document.querySelector(".input-bar").style.display = "flex";
    //     terminal.style.overflow = "auto";
    // }


    // function exit() {
    //     terminal.style.display = "none";
    // };
        
    // function minimize() {
    //     terminal.style.height = "30px";
    //     terminal.style.overflow = "hidden";
    //     document.querySelector(".input-bar").style.display = "none";
    // }

    // function maximize() {
    //     if (!isMaximized) {
    //         terminal.style.position = "fixed";
    //         terminal.style.top = "0";
    //         terminal.style.left = "0";
    //         terminal.style.width = "100%";
    //         terminal.style.height = "100%";
    //         terminal.style.zIndex = "1000";
    //         isMaximized = true;
    //     } else {
    //         terminal.style.position = "absolute";
    //         terminal.style.width = "600px";
    //         terminal.style.height = "400px";
    //         isMaximized = false;
    //     }
    //     document.querySelector(".input-bar").style.display = "flex";
    //     terminal.style.overflow = "auto";
    // }

    // document.getElementById("minimize").addEventListener("click", () => {
    //     terminal.style.height = "30px";
    //     terminal.style.overflow = "hidden";
    //     document.querySelector(".input-bar").style.display = "none";
    // });

    // document.getElementById("maximize").addEventListener("click", () => {
    //     if (!isMaximized) {
    //         terminal.style.position = "fixed";
    //         terminal.style.top = "0";
    //         terminal.style.left = "0";
    //         terminal.style.width = "100%";
    //         terminal.style.height = "100%";
    //         terminal.style.zIndex = "1000";
    //         isMaximized = true;
    //     } else {
    //         terminal.style.position = "absolute";
    //         terminal.style.width = "600px";
    //         terminal.style.height = "400px";
    //         isMaximized = false;
    //     }
    //     document.querySelector(".input-bar").style.display = "flex";
    //     terminal.style.overflow = "auto";
    // });
});
