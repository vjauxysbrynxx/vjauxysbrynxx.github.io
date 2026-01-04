document.addEventListener("DOMContentLoaded", () => {
    const terminalInput = document.getElementById("terminal-input");
    const terminalOutput = document.getElementById("terminal-output");
    const mainTerminal = document.getElementById("mydiv");
    const mainHeader = document.getElementById("mydivheader");
    
    // Global Z-Index Counter
    let globalZIndex = 100;

    function hello() {
        const cvContent = `
> Hello world! What can I do for you today?
| about | cv | projects | media | contact | clear |
        `;

        const commandOutput = document.createElement("pre");
        commandOutput.classList.add("output-line");
        terminalOutput.appendChild(commandOutput);
        typeWriter(cvContent, commandOutput);
    }
    hello();

    function clearTerminal() {
        terminalOutput.innerHTML = "";
        hello();
    }

    // Helper to bring any window to front
    function focusWindow(element) {
        globalZIndex++;
        element.style.zIndex = globalZIndex;
    }

    // Attach focus listener to the Main Terminal
    mainTerminal.addEventListener('mousedown', () => focusWindow(mainTerminal));

    const commands = {
        help: "Available commands: help, about, contact, cv, projects, media, skills, and clear.",
        contact: "You can reach me at bpbeleber@up.edu.ph",
        skills: showSkills,
        cv: downloadCV, // Changed to download function
        projects: () => {
            printLog("Opening Project Window...");
            openCodeWindow();
        },
        media: () => {
            printLog("Opening Media Window...");
            openMediaWindow();
        },
        about: () => {
            printLog("Opening Profile...");
            openAboutWindow();
        },
        clear: clearTerminal
    };

    function scrollToBottom() {
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }

    // Handle Enter Key
    terminalInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            const input = terminalInput.value.trim().toLowerCase();
            terminalInput.value = "";

            // Print User Input
            const output = document.createElement("div");
            output.classList.add("output-line");
            output.textContent = `> ${input}`;
            terminalOutput.appendChild(output);

            const commandOutput = document.createElement("div");
            commandOutput.classList.add("output-line");

            // Process Command
            if (commands[input]) {
                if (typeof commands[input] === "function") {
                    commands[input]();
                } else {
                    typeWriter(commands[input], commandOutput);
                    terminalOutput.appendChild(commandOutput);
                }
            } else {
                typeWriter(`'${input}' is not recognized. Type 'help'.`, commandOutput);
                terminalOutput.appendChild(commandOutput);
            }
            scrollToBottom();
        }
    });

    function typeWriter(text, element) {
        let i = 0;
        function typingEffect() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(typingEffect, 5);
                scrollToBottom();
            }
        }
        typingEffect();
    }

    function printLog(text) {
        const commandOutput = document.createElement("pre");
        commandOutput.classList.add("output-line");
        commandOutput.textContent = text;
        terminalOutput.appendChild(commandOutput);
        scrollToBottom();
    }

    function downloadCV() {
        // Create a temporary link to trigger download
        const link = document.createElement('a');
        // MAKE SURE YOU HAVE THIS FILE IN YOUR FOLDER
        link.href = 'Benz_Beleber_CV.pdf'; 
        link.download = 'Benz_Beleber_CV.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        const commandOutput = document.createElement("pre");
        commandOutput.classList.add("output-line");
        terminalOutput.appendChild(commandOutput);
        typeWriter("A copy of my resume has been downloaded.", commandOutput);
    }

    function showSkills() {
        const cvContent = `
SKILLS
- Web Development (HTML/JS/PHP)
- Game Development (Unity/Flutter)
- Electronics Repair
- Photo & Video Editing
        `;
        const commandOutput = document.createElement("pre");
        commandOutput.classList.add("output-line");
        terminalOutput.appendChild(commandOutput);
        typeWriter(cvContent, commandOutput);
    }

    function createWindow(title, contentHtml, xPos, yPos) {
        globalZIndex++;
        
        const win = document.createElement('div');
        win.classList.add('pop-window');
        win.style.zIndex = globalZIndex;
        // Default position if not provided
        win.style.top = yPos || (20 + (globalZIndex % 5) * 2) + '%';
        win.style.left = xPos || (20 + (globalZIndex % 5) * 2) + '%';

        const header = document.createElement('div');
        header.classList.add('tools');
        header.style.cursor = 'move';
        
        const winBar = document.createElement('div');
        winBar.classList.add('window-bar');
        
        const closeBtn = document.createElement('div');
        closeBtn.className = 'circle';
        closeBtn.innerHTML = '<span class="red box"></span>';
        closeBtn.onclick = () => win.remove();

        const minBtn = document.createElement('div');
        minBtn.className = 'circle';
        minBtn.innerHTML = '<span class="yellow box"></span>';

        const maxBtn = document.createElement('div');
        maxBtn.className = 'circle';
        maxBtn.innerHTML = '<span class="green box"></span>';

        winBar.appendChild(closeBtn);
        winBar.appendChild(minBtn);
        winBar.appendChild(maxBtn);

        const titleDiv = document.createElement('div');
        titleDiv.classList.add('window-bar');
        titleDiv.style.width = "100%";
        titleDiv.innerHTML = `//&nbsp;${title}`;

        header.appendChild(winBar);
        header.appendChild(titleDiv);

        const content = document.createElement('div');
        content.classList.add('window-content');
        content.innerHTML = contentHtml;

        win.appendChild(header);
        win.appendChild(content);

        document.body.appendChild(win);

        // Click to bring to front
        win.addEventListener('mousedown', () => focusWindow(win));

        // Initialize drag
        dragElement(win, header);
    }

    function openMediaWindow() {
        const content = `
            <h2>Video & Photo Editing</h2>
            <p>A collection of my freelance work in video production and graphic design.</p>
            <div class="gallery-grid">
                <div class="gallery-item">
                    <img src="https://placehold.co/600x400/1e1e1e/FFF?text=Music+Video" alt="Video">
                    <div class="desc">
                        <h4>Music Video Edit</h4>
                        <p>Rhythmic editing for indie band.</p>
                    </div>
                </div>
                <div class="gallery-item">
                    <img src="https://placehold.co/600x400/1e1e1e/FFF?text=Docu" alt="Docu">
                    <div class="desc">
                        <h4>Mini Documentary</h4>
                        <p>Gaming documentary style.</p>
                    </div>
                </div>
            </div>
        `;
        // Positioned slightly right
        createWindow('Media_Portfolio', content, '40%', '15%');
    }

    function openCodeWindow() {
        const content = `
            <h2>Development Projects</h2>
            <div class="gallery-grid">
                <div class="gallery-item">
                    <img src="https://placehold.co/600x400/232E33/FFF?text=Generals" alt="Game">
                    <div class="desc">
                        <h4>Generals Mobile</h4>
                        <p>Flutter based board game adaptation.</p>
                        <a href="#" class="btn-action">View Code</a>
                    </div>
                </div>
                <div class="gallery-item">
                    <img src="https://placehold.co/600x400/232E33/FFF?text=POS" alt="Web">
                    <div class="desc">
                        <h4>Web POS System</h4>
                        <p>PHP/JS inventory management.</p>
                        <a href="#" class="btn-action">View Code</a>
                    </div>
                </div>
            </div>
        `;
        // Positioned lower right
        createWindow('Dev_Projects', content, '50%', '45%');
    }

    function openAboutWindow() {
        const content = `
            <h2>About Benz</h2>
            <div class="profile-container">
                <img src="https://placehold.co/150x150/6BAF8D/1e1e1e?text=BZ" class="profile-img" alt="Profile">
                <div>
                    <p>
                        I am a Computer Science student at UP Visayas with a unique blend of technical and creative skills. 
                        Whether it's coding a new game engine in Unity, soldering a custom guitar pedal, or editing a cinematic 
                        music video, I love building things.
                    </p>
                    <p><strong>Status:</strong> Open for freelance</p>
                    <p><strong>Location:</strong> Iloilo, Philippines</p>
                </div>
            </div>
        `;
        // Positioned left
        createWindow('User_Profile', content, '5%', '10%');
    }

    // Initialize dragging for the Main Terminal
    dragElement(mainTerminal, mainHeader);

    function dragElement(elmnt, handle) {
        var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        
        if (handle) {
            handle.onmousedown = dragMouseDown;
        } else {
            elmnt.onmousedown = dragMouseDown;
        }

        function dragMouseDown(e) {
            e = e || window.event;
            // Allow clicking buttons without dragging
            if(e.target.classList.contains('box') || e.target.classList.contains('btn-action')) return; 
            
            e.preventDefault();
            
            // Bring to front on drag start
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