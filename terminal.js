document.addEventListener("DOMContentLoaded", () => {
    // --- 1. Setup ---
    const terminalInput = document.getElementById("terminal-input");
    const terminalOutput = document.getElementById("terminal-output");
    const mainTerminal = document.getElementById("mydiv");
    const mainHeader = document.getElementById("mydivheader");
    let globalZIndex = 100;

    if (!terminalInput || !terminalOutput) return;

    // --- 2. Helper Functions ---
    function printLog(text) {
        const line = document.createElement("div");
        line.classList.add("output-line");
        line.innerHTML = text;
        terminalOutput.appendChild(line);
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }

    function focusWindow(element) {
        if (!element) return;
        globalZIndex++;
        element.style.zIndex = globalZIndex;
    }

    function typeWriter(text, element) {
        let i = 0;
        function typingEffect() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(typingEffect, 2); 
                terminalOutput.scrollTop = terminalOutput.scrollHeight;
            }
        }
        typingEffect();
    }

    // --- 3. Window Factory ---
    // Usage: spawnWindow(templateID, WindowTitle, Left%, Top%)
    function spawnWindow(templateId, title, xPos, yPos) {
        const template = document.getElementById(templateId);
        if (!template) return;

        globalZIndex++;
        const win = document.createElement('div');
        win.classList.add('pop-window');
        
        // --- POSITIONING LOGIC ---
        win.style.zIndex = globalZIndex;
        win.style.left = xPos;  // X Axis (Distance from Left)
        win.style.top = yPos;   // Y Axis (Distance from Top)

        // Create Header
        const header = document.createElement('div');
        header.classList.add('tools');
        header.style.cursor = 'move';
        header.innerHTML = `
            <div class="window-bar">
                <div class="circle"><span class="red box close-btn"></span></div>
                <div class="circle"><span class="yellow box"></span></div>
                <div class="circle"><span class="green box"></span></div>
            </div>
            <div class="window-bar" style="width:100%">//&nbsp;${title}</div>
        `;

        // Create Content
        const content = document.createElement('div');
        content.classList.add('window-content');
        content.innerHTML = template.innerHTML; 

        win.appendChild(header);
        win.appendChild(content);
        document.body.appendChild(win);

        // Bind Events
        win.querySelector('.close-btn').onclick = () => win.remove();
        win.addEventListener('mousedown', () => focusWindow(win));
        dragElement(win, header);
    }

    // --- 4. Commands ---
    const commands = {
        help: "Available commands: help, about, media, projects, contact, cv, clear.",
        contact: "Email: benzvrianne@gmail.com",
        cv: () => {
             const link = document.createElement('a');
             link.href = 'Benz_Beleber_CV.pdf';
             link.download = 'Benz_Beleber_CV.pdf';
             document.body.appendChild(link);
             link.click();
             document.body.removeChild(link);
             printLog("> Downloading Resume...");
        },
        about: () => {
            printLog("> Opening User_Profile...");
            // POSITION: Top Left (Left: 5%, Top: 5%)
            spawnWindow('tpl-about', 'About_Benz', '5%', '5%');
        },
        media: () => {
            printLog("> Opening Media_Portfolio...");
            // POSITION: Right Side (Left: 60%, Top: 15%)
            spawnWindow('tpl-media', 'Media_Works', '5%', '55%');
        },
        projects: () => {
            printLog("> Opening Dev_Projects...");
            // POSITION: Bottom Left (Left: 5%, Top: 55%)
            spawnWindow('tpl-projects', 'Code_Base', '60%', '15%');
        },
        clear: () => {
            terminalOutput.innerHTML = "";
            hello();
        }
    };

    // --- 5. Terminal Logic ---
    function hello() {
        const output = document.createElement("pre");
        output.classList.add("output-line");
        terminalOutput.appendChild(output);
        typeWriter("\n> System Online. Type 'help' for commands.\n| about | projects | media | cv | contact |", output);
    }

    terminalInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            const input = terminalInput.value.trim().toLowerCase();
            terminalInput.value = "";
            printLog(`> ${input}`);

            if (commands[input]) {
                if (typeof commands[input] === "function") commands[input]();
                else printLog(commands[input]);
            } else {
                printLog(`'${input}' is not recognized.`);
            }
        }
    });

    // --- 6. Drag Logic ---
    function dragElement(elmnt, handle) {
        let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        const dragHandle = handle || elmnt;
        
        dragHandle.onmousedown = dragMouseDown;

        function dragMouseDown(e) {
            e = e || window.event;
            if (e.target.classList.contains('box') || e.target.tagName === 'INPUT') return;
            
            e.preventDefault();
            focusWindow(elmnt); 
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
    }

    // --- 7. Initialization ---
    if(mainTerminal) {
        dragElement(mainTerminal, mainHeader);
        mainTerminal.addEventListener('mousedown', () => focusWindow(mainTerminal));
    }

    hello();
    
    // Auto-open windows in sequence
    setTimeout(() => commands.about(), 300);    // Top Left
    // setTimeout(() => commands.projects(), 600); // Bottom Left
    setTimeout(() => commands.media(), 900);    // Right Side
});