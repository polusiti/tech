// Windows 98 Boot Sequence - Simple and Authentic
window.addEventListener('DOMContentLoaded', () => {
    simulateWindows98Boot();
});

function simulateWindows98Boot() {
    const loadingScreen = document.getElementById('loading-screen');
    const desktop = document.getElementById('desktop');
    const loadingProgress = loadingScreen.querySelector('.loading-progress');

    // Simple boot sequence
    setTimeout(() => {
        loadingProgress.style.width = '100%';
    }, 100);

    // Transition to desktop after loading
    setTimeout(() => {
        loadingScreen.style.transition = 'opacity 0.5s ease-out';
        loadingScreen.style.opacity = '0';

        setTimeout(() => {
            if (loadingScreen && desktop) {
                loadingScreen.style.display = 'none';
                desktop.style.display = 'block';
                loadingScreen.style.opacity = '1';
                loadingScreen.style.transition = '';

                // Initialize desktop
                initializeDesktop();

                // Show welcome dialog
                setTimeout(() => {
                    showWelcomeDialog();
                }, 1000);
            }
        }, 500);
    }, 3000);

function showWelcomeDialog() {
    const welcomeContent = `
        <div style="padding: 20px; text-align: center;">
            <div style="margin-bottom: 20px;">
                <div style="font-size: 48px; margin-bottom: 10px; color: #000080;"><i class="fas fa-desktop"></i></div>
                <h2 style="color: #000080; margin-bottom: 10px;">Welcome to Windows 98</h2>
                <p style="margin-bottom: 20px;">Thank you for choosing Microsoft Windows 98!</p>
            </div>

            <div style="text-align: left; margin-bottom: 20px; background: #f0f0f0; padding: 15px; border: 1px solid #c0c0c0;">
                <h4 style="margin-top: 0; color: #000080;">What's New in Windows 98:</h4>
                <ul style="margin: 10px 0; font-size: 12px;">
                    <li>Improved performance and reliability</li>
                    <li>Enhanced Internet integration with Internet Explorer 4.0</li>
                    <li>Support for new hardware technologies</li>
                    <li>Better multimedia capabilities</li>
                    <li>Enhanced system tools and utilities</li>
                </ul>
            </div>

            <div style="margin-bottom: 20px;">
                <label style="display: flex; align-items: center; margin-bottom: 10px;">
                    <input type="checkbox" checked style="margin-right: 8px;">
                    Show this welcome screen next time you start Windows
                </label>
                <label style="display: flex; align-items: center;">
                    <input type="checkbox" checked style="margin-right: 8px;">
                    Register now with Microsoft (recommended)
                </label>
            </div>

            <div class="field-row" style="justify-content: center; gap: 10px;">
                <button onclick="beginWindowsTour()" style="background: #000080; color: white;">Begin Windows Tour</button>
                <button onclick="closeWelcomeDialog()">Close</button>
                <button onclick="registerNow()">Register Now</button>
            </div>
        </div>
    `;

    createWindow("Welcome to Windows 98", welcomeContent);
}

function closeWelcomeDialog() {
    // Find and close the welcome dialog
    const welcomeWindow = Array.from(document.querySelectorAll('.window')).find(w =>
        w.getAttribute('data-window-title') === 'Welcome to Windows 98'
    );
    if (welcomeWindow) {
        const closeButton = welcomeWindow.querySelector(".title-bar-controls button[aria-label='Close']");
        if (closeButton) closeButton.click();
    }
}

function beginWindowsTour() {
    closeWelcomeDialog();
    createWindow("Windows 98 Tour", `
        <div style="padding: 20px; text-align: center;">
            <h3>Windows 98 Interactive Tour</h3>
            <p style="margin: 20px 0;">Welcome to the Windows 98 tour!</p>
            <p>This tour will help you learn about the exciting new features in Windows 98.</p>
            <div style="margin: 20px 0;">
                <button>Start Tour</button>
                <button>Cancel</button>
            </div>
        </div>
    `);
}

function registerNow() {
    createWindow("Windows 98 Registration", `
        <div style="padding: 20px;">
            <h3>Product Registration</h3>
            <p>Please register your copy of Windows 98 to receive:</p>
            <ul>
                <li>Technical support</li>
                <li>Product updates</li>
                <li>Special offers</li>
            </ul>
            <div style="margin-top: 20px;">
                <button>Register Online</button>
                <button>Register by Phone</button>
                <button>Cancel</button>
            </div>
        </div>
    `);
}

function playStartupSound() {
    // Create a simple startup sound using Web Audio API
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();

    // Create a simple chord to simulate Windows startup sound
    const notes = [261.63, 329.63, 392.00]; // C, E, G

    notes.forEach((frequency, index) => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.value = frequency;
        oscillator.type = 'sine';

        gainNode.gain.setValueAtTime(0, audioContext.currentTime + index * 0.1);
        gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + index * 0.1 + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + index * 0.1 + 0.5);

        oscillator.start(audioContext.currentTime + index * 0.1);
        oscillator.stop(audioContext.currentTime + index * 0.1 + 0.5);
    });
}

function resetSettings() {
    document.body.style.backgroundColor = '#008080';
    if (document.getElementById('background-pattern')) {
        document.getElementById('background-pattern').value = 'teal';
    }
    localStorage.removeItem('background');
    localStorage.removeItem('activeTitleBarColor');
    localStorage.removeItem('inactiveTitleBarColor');
    applyAppearance();
    alert('Settings have been reset to default.');
}

function applyAppearance() {
    const activeColor = localStorage.getItem('activeTitleBarColor') || '#000080';
    const inactiveColor = localStorage.getItem('inactiveTitleBarColor') || '#808080';

    const styleId = 'dynamic-appearance-styles';
    let styleElement = document.getElementById(styleId);
    if (!styleElement) {
        styleElement = document.createElement('style');
        styleElement.id = styleId;
        document.head.appendChild(styleElement);
    }

    styleElement.innerHTML = `
        .window.focused .title-bar {
            background: linear-gradient(90deg, ${activeColor}, #1084d0);
        }
        .window:not(:focus) .title-bar {
            background: linear-gradient(90deg, ${inactiveColor}, #b5b5b5);
        }
    `;
}

function changeActiveTitleBarColor(color) {
    localStorage.setItem('activeTitleBarColor', color);
    applyAppearance();
}

function changeInactiveTitleBarColor(color) {
    localStorage.setItem('inactiveTitleBarColor', color);
    applyAppearance();
}

function initializeDesktop() {
    // Initialize all desktop icons
    initializeDesktopIcons();
    initializeTaskbar();
    initializeStartMenu();
    initializeClock();
    initializeContextMenu();
    changeBackground();
    applyAppearance();
}

// Make windows draggable
function makeDraggable(element) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    const titleBar = element.querySelector(".title-bar");

    if (titleBar) {
        titleBar.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;

        // Bring window to front
        bringToFront(element);

        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        element.style.top = (element.offsetTop - pos2) + "px";
        element.style.left = (element.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

const windowTemplate = document.querySelector(".window");
const desktop = document.querySelector(".desktop");
let windowIdCounter = 0;

// Track existing windows by title
const existingWindows = new Map();

function createWindow(title, content) {
    // Check if window with this title already exists
    if (existingWindows.has(title)) {
        const existingWindow = existingWindows.get(title);
        if (!existingWindow.classList.contains('minimized')) {
            // Window exists and is not minimized, just focus it
            focusWindow(existingWindow);
            return existingWindow;
        } else {
            // Window exists but is minimized, restore it
            existingWindow.classList.remove('minimized');
            // Remove taskbar item if it exists
            const taskbarItem = document.querySelector(`[data-window-id="${existingWindow.id}"]`);
            if (taskbarItem) taskbarItem.remove();
            focusWindow(existingWindow);
            return existingWindow;
        }
    }

    // Create new window
    const newWindow = windowTemplate.cloneNode(true);
    newWindow.style.display = "block";
    const windowId = "window-" + windowIdCounter++;
    newWindow.setAttribute("id", windowId);
    newWindow.setAttribute("tabindex", "-1");
    newWindow.setAttribute("data-window-title", title);

    const titleBarText = newWindow.querySelector(".title-bar-text");
    if (titleBarText) {
        titleBarText.textContent = title;
    }

    const windowBody = newWindow.querySelector(".window-body");
    if (windowBody) {
        windowBody.innerHTML = content;
    }

    // Position the new window
    newWindow.style.top = (100 + (windowIdCounter * 20)) + "px";
    newWindow.style.left = (100 + (windowIdCounter * 20)) + "px";
    newWindow.style.width = "500px";
    newWindow.style.height = "400px";
    newWindow.style.resize = "both";
    newWindow.style.overflow = "auto";
    newWindow.style.minWidth = "300px";
    newWindow.style.minHeight = "200px";

    // Ensure window appears in front of desktop icons
    newWindow.style.zIndex = "1000";

    desktop.appendChild(newWindow);

    // Track this window
    existingWindows.set(title, newWindow);

    makeDraggable(newWindow);
    setupWindowControls(newWindow);
    bringToFront(newWindow);
    focusWindow(newWindow);

    return newWindow;
}

async function fetchAboutContent() {
    const response = await fetch('about.html');
    const content = await response.text();
    return content;
}

async function fetchProjectsContent() {
    const response = await fetch('projects.html');
    const content = await response.text();
    return content;
}

function initializeDesktopIcons() {
    // Make desktop icons draggable
    document.querySelectorAll('.desktop-icon').forEach(icon => {
        makeIconDraggable(icon);
        addIconInteractions(icon);
    });
}

function makeIconDraggable(icon) {
    let isDragging = false;
    let startX, startY, initialX, initialY;

    icon.addEventListener('mousedown', (e) => {
        if (e.button === 0) { // Left click only
            isDragging = true;
            startX = e.clientX;
            startY = e.clientY;
            initialX = icon.offsetLeft;
            initialY = icon.offsetTop;
            icon.style.zIndex = '1000';
            e.preventDefault();
        }
    });

    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            const dx = e.clientX - startX;
            const dy = e.clientY - startY;
            icon.style.left = initialX + dx + 'px';
            icon.style.top = initialY + dy + 'px';
        }
    });

    document.addEventListener('mouseup', () => {
        if (isDragging) {
            isDragging = false;
            icon.style.zIndex = '';
        }
    });
}

function addIconInteractions(icon) {
    // Double-click to open
    icon.addEventListener('dblclick', () => {
        handleIconClick(icon.id);
    });

    // Single click to select
    icon.addEventListener('click', (e) => {
        e.stopPropagation();
        selectIcon(icon);
    });
}

function selectIcon(icon) {
    // Remove selection from all icons
    document.querySelectorAll('.desktop-icon').forEach(i => {
        i.classList.remove('selected');
    });
    // Select this icon
    icon.classList.add('selected');
}

function handleIconClick(iconId) {
    const iconHandlers = {
        'about-icon': async () => createWindow("About Me", await fetchAboutContent()),
        'projects-icon': async () => createWindow("Projects", await fetchProjectsContent()),
        'my-computer': () => createWindow("My Computer", getMyComputerContent()),
        'network': () => createWindow("Network Neighborhood", getNetworkContent()),
        'my-documents': () => createWindow("My Documents", getMyDocumentsContent()),
        'recycle-bin': () => createWindow("Recycle Bin", getRecycleBinContent()),
        'solitaire-icon': () => createSolitaire(),
        'minesweeper-icon': () => createMinesweeper(),
        'calculator-icon': () => createCalculator(),
        'notepad-icon': () => createNotepad(),
        'clock-icon': () => createClockApp(),
        'paint-icon': () => createPaint()
    };

    if (iconHandlers[iconId]) {
        iconHandlers[iconId]();
        // playClickSound();
    }
}

function getMyComputerContent() {
    return `
        <div style="padding: 10px;">
            <h3>My Computer</h3>
            <div class="field-row">
                <img src="img/folder-icon.svg" alt="Folder" style="width: 32px; height: 32px; margin-right: 8px;">
                <span>(C:) Local Disk</span>
            </div>
            <div class="field-row" style="margin-top: 10px;">
                <img src="img/folder-icon.svg" alt="Folder" style="width: 32px; height: 32px; margin-right: 8px;">
                <span>3½ Floppy (A:)</span>
            </div>
            <div class="field-row" style="margin-top: 10px;">
                <img src="img/folder-icon.svg" alt="Folder" style="width: 32px; height: 32px; margin-right: 8px;">
                <span>(D:) CD-ROM Drive</span>
            </div>
        </div>
    `;
}

function getNetworkContent() {
    return `
        <div style="padding: 10px;">
            <h3>Network Neighborhood</h3>
            <p>Entire Network</p>
            <div class="field-row">
                <img src="img/computer-icon.svg" alt="Computer" style="width: 32px; height: 32px; margin-right: 8px;">
                <span>Web Server</span>
            </div>
        </div>
    `;
}

function getMyDocumentsContent() {
    return `
        <div style="padding: 10px;">
            <h3>My Documents</h3>
            <p>This folder contains your personal files.</p>
            <div class="field-row">
                <img src="img/project-icon.svg" alt="Document" style="width: 32px; height: 32px; margin-right: 8px;">
                <span>Resume.txt</span>
            </div>
        </div>
    `;
}

function getRecycleBinContent() {
    return `
        <div style="padding: 10px;">
            <h3>Recycle Bin</h3>
            <p>The recycle bin is empty.</p>
        </div>
    `;
}

function initializeTaskbar() {
    // Taskbar functionality is already set up
}

function initializeStartMenu() {
    // Start menu functionality is already set up
}

function initializeClock() {
    updateClock();
    setInterval(updateClock, 1000);
}

function playClickSound() {
    // Simple click sound
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = 800;
    oscillator.type = 'square';

    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
}

// Context Menu functionality
function initializeContextMenu() {
    const contextMenu = document.getElementById('context-menu');
    let currentTarget = null;

    // Right-click on desktop
    document.getElementById('desktop').addEventListener('contextmenu', (e) => {
        e.preventDefault();
        showContextMenu(e.pageX, e.pageY, 'desktop');
    });

    // Right-click on icons
    document.querySelectorAll('.desktop-icon').forEach(icon => {
        icon.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            e.stopPropagation();
            currentTarget = icon;
            showContextMenu(e.pageX, e.pageY, 'icon');
        });
    });

    // Context menu item clicks
    document.getElementById('ctx-open')?.addEventListener('click', () => {
        if (currentTarget) {
            handleIconClick(currentTarget.id);
        }
        hideContextMenu();
    });

    document.getElementById('ctx-properties')?.addEventListener('click', () => {
        if (currentTarget) {
            showProperties(currentTarget);
        }
        hideContextMenu();
    });

    // Hide context menu when clicking elsewhere
    document.addEventListener('click', () => {
        hideContextMenu();
    });
}

function showContextMenu(x, y, type) {
    const contextMenu = document.getElementById('context-menu');
    contextMenu.style.left = x + 'px';
    contextMenu.style.top = y + 'px';
    contextMenu.style.display = 'block';

    // Adjust position if menu goes off screen
    const rect = contextMenu.getBoundingClientRect();
    if (rect.right > window.innerWidth) {
        contextMenu.style.left = (x - rect.width) + 'px';
    }
    if (rect.bottom > window.innerHeight) {
        contextMenu.style.top = (y - rect.height) + 'px';
    }
}

function hideContextMenu() {
    const contextMenu = document.getElementById('context-menu');
    contextMenu.style.display = 'none';
}

function showProperties(icon) {
    const title = icon.querySelector('span').textContent;
    const propertiesContent = `
        <div style="padding: 10px;">
            <h3>${title} Properties</h3>
            <div class="field-row-stacked">
                <label>Type: Folder</label>
                <label>Location: Desktop</label>
                <label>Size: 0 KB</label>
                <label>Created: ${new Date().toLocaleDateString()}</label>
                <label>Modified: ${new Date().toLocaleDateString()}</label>
            </div>
            <div style="margin-top: 15px;">
                <button onclick="hideContextMenu()">OK</button>
            </div>
        </div>
    `;
    createWindow(`${title} Properties`, propertiesContent);
}

// Open window on desktop icon click with debouncing
const aboutIcon = document.getElementById("about-icon");
if (aboutIcon) {
    aboutIcon.addEventListener("click", debounce(() => {
        createWindow("About Me", aboutContent);
    }, 200));
}

const projectsIcon = document.getElementById("projects-icon");
if (projectsIcon) {
    projectsIcon.addEventListener("click", debounce(() => {
        createWindow("Projects", projectsContent);
    }, 200));
}

// Hide the template window
windowTemplate.remove();

// Start Menu
const startButton = document.getElementById("start-button");
const startMenu = document.getElementById("start-menu");
const startMenuAbout = document.getElementById("start-menu-about");
const startMenuProjects = document.getElementById("start-menu-projects");

if (startButton) {
    startButton.addEventListener("click", (e) => {
        e.stopPropagation(); // Prevent the click from bubbling up to the document
        const isVisible = startMenu.style.display === "block";
        startMenu.style.display = isVisible ? "none" : "block";
    });
}

// Close the start menu if the user clicks outside of it
document.addEventListener("click", (e) => {
    if (startMenu && startMenu.style.display === "block") {
        if (!startMenu.contains(e.target) && e.target !== startButton) {
            startMenu.style.display = "none";
        }
    }
});

// Window management functions
let highestZIndex = 1000;

function bringToFront(windowElement) {
    highestZIndex++;
    windowElement.style.zIndex = highestZIndex;
}

function focusWindow(windowElement) {
    // Remove focus from all windows
    document.querySelectorAll('.window').forEach(w => {
        w.classList.remove('focused');
    });

    // Add focus to the selected window
    windowElement.classList.add('focused');
    windowElement.focus();
    bringToFront(windowElement);
}

function setupWindowControls(windowElement) {
    const closeButton = windowElement.querySelector(".title-bar-controls button[aria-label='Close']");
    const minimizeButton = windowElement.querySelector(".title-bar-controls button[aria-label='Minimize']");
    const maximizeButton = windowElement.querySelector(".title-bar-controls button[aria-label='Maximize']");

    if (closeButton) {
        closeButton.addEventListener("click", () => {
            // Remove from tracking map
            const windowTitle = windowElement.getAttribute('data-window-title');
            if (windowTitle) {
                existingWindows.delete(windowTitle);
            }
            // Remove taskbar item if it exists
            const taskbarItem = document.querySelector(`[data-window-id="${windowElement.id}"]`);
            if (taskbarItem) taskbarItem.remove();
            windowElement.remove();
        });
    }

    if (minimizeButton) {
        minimizeButton.addEventListener("click", () => {
            if (!windowElement.classList.contains('minimized')) {
                windowElement.classList.add('minimized');
                createTaskbarItem(windowElement);
            }
        });
    }

    if (maximizeButton) {
        maximizeButton.addEventListener("click", () => {
            if (windowElement.classList.contains('maximized')) {
                // Restore window
                windowElement.classList.remove('maximized');
                maximizeButton.setAttribute('aria-label', 'Maximize');
                windowElement.style.position = 'absolute';
            } else {
                // Maximize window
                windowElement.classList.add('maximized');
                maximizeButton.setAttribute('aria-label', 'Restore');
                windowElement.style.position = 'fixed';
            }
        });
    }

    // Focus window when clicking on title bar
    const titleBar = windowElement.querySelector('.title-bar');
    if (titleBar) {
        titleBar.addEventListener('mousedown', () => {
            focusWindow(windowElement);
        });
    }

    // Focus window when clicking on content
    const windowBody = windowElement.querySelector('.window-body');
    if (windowBody) {
        windowBody.addEventListener('mousedown', () => {
            focusWindow(windowElement);
        });
    }
}

function createTaskbarItem(windowElement) {
    const windowId = windowElement.getAttribute('id');
    const windowTitle = windowElement.querySelector('.title-bar-text').textContent;

    const taskbarItem = document.createElement('div');
    taskbarItem.className = 'taskbar-item';
    taskbarItem.setAttribute('data-window-id', windowId);
    taskbarItem.innerHTML = `
        <button>${windowTitle}</button>
    `;

    taskbarItem.addEventListener('click', () => {
        windowElement.classList.remove('minimized');
        taskbarItem.remove();
        focusWindow(windowElement);
    });

    const systemTray = document.querySelector('.system-tray');
    systemTray.parentNode.insertBefore(taskbarItem, systemTray);
}

// Debounce function to prevent rapid multiple clicks
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add debouncing to button clicks
const debouncedCreateWindow = debounce((title, content) => {
    createWindow(title, content);
}, 100);

// Add click outside to close start menu and unfocus windows
document.addEventListener('click', (e) => {
    // Close start menu if clicking outside
    if (startMenu && startMenu.style.display === "block") {
        if (!startMenu.contains(e.target) && e.target !== startButton) {
            startMenu.style.display = "none";
        }
    }

    // Unfocus windows if clicking on desktop
    if (e.target.classList.contains('desktop')) {
        document.querySelectorAll('.window').forEach(w => {
            w.classList.remove('focused');
        });
    }
});

if (startMenuAbout) {
    startMenuAbout.addEventListener("click", debounce(async () => {
        createWindow("About Me", await fetchAboutContent());
        startMenu.style.display = "none";
    }, 200));
}

if (startMenuProjects) {
    startMenuProjects.addEventListener("click", debounce(async () => {
        createWindow("Projects", await fetchProjectsContent());
        startMenu.style.display = "none";
    }, 200));
}

// Clock functionality
function updateClock() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;

    const clockElement = document.getElementById('clock');
    if (clockElement) {
        clockElement.textContent = `${displayHours}:${minutes} ${ampm}`;
    }
}

// Update clock immediately and then every second
updateClock();
setInterval(updateClock, 1000);

// Additional start menu functionality
const startMenuPrograms = document.getElementById("start-menu-programs");
const startMenuSettings = document.getElementById("start-menu-settings");
const startMenuShutdown = document.getElementById("start-menu-shutdown");

if (startMenuPrograms) {
    startMenuPrograms.addEventListener("click", debounce(() => {
        createWindow("Programs", "<p>Accessories, Games, and more...</p>");
        startMenu.style.display = "none";
    }, 200));
}

if (startMenuSettings) {
    startMenuSettings.addEventListener("click", debounce(() => {
        const settingsContent = `
            <div class="settings-content">
                <!-- Tab navigation -->
                <div class="field-row" style="margin-bottom: 16px;">
                    <button id="tab-background" onclick="showSettingsTab('background')">Background</button>
                    <button id="tab-screensaver" onclick="showSettingsTab('screensaver')">Screensaver</button>
                    <button id="tab-appearance" onclick="showSettingsTab('appearance')">Appearance</button>
                    <button id="tab-settings" onclick="showSettingsTab('settings')">Settings</button>
                </div>

                <!-- Background Tab -->
                <div id="background-tab" class="settings-tab">
                    <fieldset>
                        <legend>Pattern</legend>
                        <div class="field-row-stacked">
                            <select id="background-pattern">
                                <option value="teal">Default Teal</option>
                                <option value="blue">Windows Blue</option>
                                <option value="green">Matrix Green</option>
                                <option value="purple">Royal Purple</option>
                                <option value="black">Classic Black</option>
                            </select>
                        </div>
                    </fieldset>

                    <fieldset style="margin-top: 16px;">
                        <legend>Display</legend>
                        <div class="field-row-stacked">
                            <label>🖥️ Resolution:
                                <select>
                                    <option>640x480</option>
                                    <option selected>800x600</option>
                                    <option>1024x768</option>
                                </select>
                            </label>
                            <label>🎨 Colors:
                                <select>
                                    <option>16 Colors</option>
                                    <option selected>256 Colors</option>
                                    <option>16-bit High Color</option>
                                </select>
                            </label>
                        </div>
                    </fieldset>
                </div>

                <!-- Screensaver Tab -->
                <div id="screensaver-tab" class="settings-tab" style="display: none;">
                    <fieldset>
                        <legend>Screensaver</legend>
                        <div class="field-row-stacked">
                            <select id="screensaver-select">
                                <option value="none">None</option>
                                <option value="text">Scrolling Marquee</option>
                                <option value="stars">Starfield</option>
                                <option value="maze">3D Maze</option>
                            </select>
                        </div>
                        <div class="field-row-stacked" style="margin-top: 8px;">
                            <label>Settings:</label>
                            <input type="text" id="marquee-text" placeholder="Enter text for marquee...">
                            <label>Wait: <input type="number" value="5" min="1" max="60" style="width: 40px;"> minutes</label>
                        </div>
                    </fieldset>
                </div>

                <!-- Appearance Tab -->
                <div id="appearance-tab" class="settings-tab" style="display: none;">
                    <fieldset>
                        <legend>Scheme</legend>
                        <div class="field-row-stacked">
                            <select>
                                <option>Windows Standard</option>
                                <option>Windows Classic</option>
                                <option>High Contrast Black</option>
                                <option>High Contrast White</option>
                                <option>Rose (Laptop)</option>
                            </select>
                        </div>
                    </fieldset>

                    <fieldset style="margin-top: 16px;">
                        <legend>Item</legend>
                        <div class="field-row-stacked">
                            <label>Desktop:
                                <input type="color" value="#008080" onchange="changeDesktopColor(this.value)">
                            </label>
                            <label>Active Title Bar:
                                <input type="color" value="#000080" onchange="changeActiveTitleBarColor(this.value)">
                            </label>
                            <label>Inactive Title Bar:
                                <input type="color" value="#808080" onchange="changeInactiveTitleBarColor(this.value)">
                            </label>
                        </div>
                    </fieldset>
                </div>

                <!-- Settings Tab -->
                <div id="settings-tab" class="settings-tab" style="display: none;">
                    <fieldset>
                        <legend>Effects</legend>
                        <div class="field-row-stacked">
                            <input type="checkbox" id="animate-windows" checked>
                            <label for="animate-windows">Animate windows and menus</label>
                            <input type="checkbox" id="show-shadows" checked>
                            <label for="show-shadows">Show window contents while dragging</label>
                            <input type="checkbox" id="smooth-edges">
                            <label for="smooth-edges">Smooth edges of screen fonts</label>
                        </div>
                    </fieldset>

                    <fieldset style="margin-top: 16px;">
                        <legend>Virtual Memory</legend>
                        <div class="field-row-stacked">
                            <label>Let Windows manage my virtual memory settings (recommended)</label>
                            <button>Change...</button>
                        </div>
                    </fieldset>
                </div>

                <div style="margin-top: 16px; text-align: center;">
                    <button onclick="applySettings()">Apply</button>
                    <button onclick="alert('Settings cancelled')">Cancel</button>
                    <button onclick="resetSettings()">Reset</button>
                </div>
            </div>
        `;
        createWindow("Display Properties", settingsContent);
        startMenu.style.display = "none";

        // Load saved settings
        setTimeout(() => {
            const savedScreensaver = localStorage.getItem('screensaver') || 'none';
            const screensaverSelect = document.getElementById('screensaver-select');
            if (screensaverSelect) screensaverSelect.value = savedScreensaver;

            const savedMarqueeText = localStorage.getItem('marqueeText') || 'Windows 98';
            const marqueeText = document.getElementById('marquee-text');
            if (marqueeText) marqueeText.value = savedMarqueeText;

            const savedWaitTime = localStorage.getItem('screensaverWait') || 5;
            const waitTimeInput = document.querySelector('input[type="number"]');
            if (waitTimeInput) waitTimeInput.value = savedWaitTime;

            const savedBackground = localStorage.getItem('background') || 'teal';
            const backgroundPattern = document.getElementById('background-pattern');
            if (backgroundPattern) backgroundPattern.value = savedBackground;

            showSettingsTab('background');
        }, 100);
    }, 200));
}

if (startMenuShutdown) {
    startMenuShutdown.addEventListener("click", debounce(() => {
        const shutdownContent = `
            <div class="shutdown-content" style="text-align: center; padding: 20px;">
                <h2>Shut Down Windows</h2>
                <p style="margin: 20px 0;">Are you sure you want to shut down?</p>
                <div class="field-row" style="justify-content: center; gap: 10px;">
                    <button onclick="location.reload()">Shut Down</button>
                    <button>Cancel</button>
                </div>
            </div>
        `;
        createWindow("Shut Down", shutdownContent);
        startMenu.style.display = "none";
    }, 200));
}

// Tray icon interactions with debouncing
document.getElementById('volume-icon')?.addEventListener('click', debounce(() => {
    createWindow("Volume Control", `
        <div style="padding: 10px;">
            <h3>Volume Control</h3>
            <div style="margin: 10px 0;">
                <label>Master Volume:</label>
                <input type="range" min="0" max="100" value="75" style="width: 100%;">
            </div>
            <div style="margin: 10px 0;">
                <label>Wave:</label>
                <input type="range" min="0" max="100" value="50" style="width: 100%;">
            </div>
        </div>
    `);
}, 200));

document.getElementById('connection-icon')?.addEventListener('click', debounce(() => {
    createWindow("Internet Connection", `
        <div style="padding: 10px;">
            <h3>Dial-up Connection</h3>
            <p>Status: Connected</p>
            <p>Speed: 56.6 Kbps</p>
            <p>Duration: 00:15:32</p>
            <button>Disconnect</button>
        </div>
    `);
}, 200));

document.getElementById('clock')?.addEventListener('click', debounce(() => {
    createWindow("Date/Time Properties", `
        <div style="padding: 10px;">
            <h3>Date & Time</h3>
            <div class="field-row">
                <label>Time:</label>
                <input type="time" value="${new Date().toTimeString().slice(0, 5)}">
            </div>
            <div class="field-row" style="margin-top: 10px;">
                <label>Date:</label>
                <input type="date" value="${new Date().toISOString().slice(0, 10)}">
            </div>
            <div style="margin-top: 15px;">
                <button onclick="alert('Time updated!')">Apply</button>
            </div>
        </div>
    `);
}, 200));

// Settings functions
function showSettingsTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.settings-tab').forEach(tab => {
        tab.style.display = 'none';
    });

    // Remove active state from all tab buttons
    document.querySelectorAll('[id^="tab-"]').forEach(btn => {
        btn.style.backgroundColor = '';
        btn.style.color = '';
    });

    // Show selected tab
    const selectedTab = document.getElementById(tabName + '-tab');
    if (selectedTab) {
        selectedTab.style.display = 'block';
    }

    // Highlight active tab button
    const activeButton = document.getElementById('tab-' + tabName);
    if (activeButton) {
        activeButton.style.backgroundColor = '#000080';
        activeButton.style.color = 'white';
    }
}

function changeBackground() {
    const pattern = localStorage.getItem('background') || 'teal';
    const body = document.body;
    switch(pattern) {
        case 'blue':
            body.style.backgroundColor = '#000080';
            break;
        case 'green':
            body.style.backgroundColor = '#005500';
            break;
        case 'purple':
            body.style.backgroundColor = '#4B0082';
            break;
        case 'black':
            body.style.backgroundColor = '#000000';
            break;
        default:
            body.style.backgroundColor = '#008080';
    }
}

function changeDesktopColor(color) {
    document.body.style.backgroundColor = color;
}

function applySettings() {
    // Save screensaver settings
    const screensaverSelect = document.getElementById('screensaver-select');
    if (screensaverSelect) {
        localStorage.setItem('screensaver', screensaverSelect.value);
    }
    const marqueeText = document.getElementById('marquee-text');
    if (marqueeText) {
        localStorage.setItem('marqueeText', marqueeText.value);
    }
    const waitTime = document.querySelector('input[type="number"]');
    if (waitTime) {
        localStorage.setItem('screensaverWait', waitTime.value);
    }

    // Save background color
    const pattern = document.getElementById('background-pattern');
    if (pattern) {
        localStorage.setItem('background', pattern.value);
        changeBackground();
    }

    // Save appearance settings
    const activeTitleBarColor = document.querySelector('input[onchange="changeActiveTitleBarColor(this.value)"]');
    if (activeTitleBarColor) {
        localStorage.setItem('activeTitleBarColor', activeTitleBarColor.value);
    }
    const inactiveTitleBarColor = document.querySelector('input[onchange="changeInactiveTitleBarColor(this.value)"]');
    if (inactiveTitleBarColor) {
        localStorage.setItem('inactiveTitleBarColor', inactiveTitleBarColor.value);
    }
    applyAppearance();

    alert('Display settings have been applied successfully!');
    resetInactivityTimer();
}

function resetSettings() {
    document.body.style.backgroundColor = '#008080';
    if (document.getElementById('background-pattern')) {
        document.getElementById('background-pattern').value = 'teal';
    }
    alert('Settings have been reset to default.');
}

// Games are now accessible directly from desktop icons

// Game functions are now called directly from desktop icon handlers

function createMinesweeper() {
    const gameContent = `
        <div id="minesweeper-game">
            <div class="field-row" style="margin-bottom: 10px;">
                <label>Mines: <span id="mine-count">10</span></label>
                <label>Time: <span id="game-time">000</span></label>
                <button onclick="resetMinesweeper()"><i class="fas fa-smile"></i></button>
            </div>
            <div id="minesweeper-grid" style="display: grid; grid-template-columns: repeat(9, 25px); gap: 1px; background: #808080; padding: 2px;">
                <!-- Grid will be generated by JavaScript -->
            </div>
            <div style="margin-top: 10px;">
                <button onclick="resetMinesweeper()">New Game</button>
            </div>
        </div>
    `;

    createWindow("Minesweeper", gameContent);

    // Initialize game after window is created
    setTimeout(() => initializeMinesweeper(), 100);
}

function initializeMinesweeper() {
    const grid = document.getElementById('minesweeper-grid');
    if (!grid) return;

    const rows = 9;
    const cols = 9;
    const mines = 10;
    let minePositions = new Set();

    // Clear grid
    grid.innerHTML = '';

    // Place mines randomly
    while (minePositions.size < mines) {
        const pos = Math.floor(Math.random() * (rows * cols));
        minePositions.add(pos);
    }

    // Create grid cells
    for (let i = 0; i < rows * cols; i++) {
        const cell = document.createElement('button');
        cell.style.width = '25px';
        cell.style.height = '25px';
        cell.style.backgroundColor = '#c0c0c0';
        cell.style.border = '2px solid';
        cell.style.borderTopColor = '#ffffff';
        cell.style.borderLeftColor = '#ffffff';
        cell.style.borderRightColor = '#808080';
        cell.style.borderBottomColor = '#808080';
        cell.style.fontSize = '10px';
        cell.style.fontWeight = 'bold';
        cell.style.padding = '0';
        cell.style.cursor = 'pointer';

        const isMine = minePositions.has(i);
        cell.dataset.isMine = isMine;
        cell.dataset.isRevealed = 'false';
        cell.dataset.position = i;

        cell.addEventListener('click', () => revealCell(cell));
        cell.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            toggleFlag(cell);
        });

        grid.appendChild(cell);
    }

    document.getElementById('mine-count').textContent = mines;
}

function revealCell(cell) {
    if (cell.dataset.isRevealed === 'true' || cell.textContent === '🚩') return;

    cell.dataset.isRevealed = 'true';
    cell.style.border = '1px solid #808080';
    cell.style.backgroundColor = '#c0c0c0';

    if (cell.dataset.isMine === 'true') {
        cell.innerHTML = '<i class="fas fa-bomb"></i>';
        cell.style.backgroundColor = '#ff0000';
        setTimeout(() => alert('Game Over! You hit a mine!'), 100);
    } else {
        // Count adjacent mines
        const pos = parseInt(cell.dataset.position);
        const adjacentMines = countAdjacentMines(pos);

        if (adjacentMines > 0) {
            cell.textContent = adjacentMines;
            cell.style.color = getMineNumberColor(adjacentMines);
        }
    }
}

function toggleFlag(cell) {
    if (cell.dataset.isRevealed === 'true') return;

    const flagIcon = '<i class="fas fa-flag"></i>';
    if (cell.innerHTML === flagIcon) {
        cell.innerHTML = '';
    } else {
        cell.innerHTML = flagIcon;
    }
}

function countAdjacentMines(pos) {
    const cols = 9;
    const row = Math.floor(pos / cols);
    const col = pos % cols;
    let count = 0;

    for (let r = row - 1; r <= row + 1; r++) {
        for (let c = col - 1; c <= col + 1; c++) {
            if (r >= 0 && r < 9 && c >= 0 && c < 9 && !(r === row && c === col)) {
                const adjPos = r * cols + c;
                const adjCell = document.querySelector(`[data-position="${adjPos}"]`);
                if (adjCell && adjCell.dataset.isMine === 'true') {
                    count++;
                }
            }
        }
    }

    return count;
}

function getMineNumberColor(num) {
    const colors = ['', '#0000ff', '#008000', '#ff0000', '#000080', '#800000', '#008080', '#000000', '#808080'];
    return colors[num] || '#000000';
}

function resetMinesweeper() {
    initializeMinesweeper();
}

function createSolitaire() {
    const gameContent = `
        <div id="solitaire-game" style="padding: 10px; background: #005500;">
            <div style="text-align: center; margin-bottom: 10px;">
                <button onclick="newSolitaireGame()">New Game</button>
                <button onclick="drawCard()">Draw Card</button>
            </div>

            <!-- Foundation piles (top) -->
            <div style="display: flex; justify-content: space-between; margin-bottom: 20px;">
                <div class="foundation" style="width: 60px; height: 80px; border: 2px solid #ffffff; background: rgba(0,0,0,0.3);"></div>
                <div class="foundation" style="width: 60px; height: 80px; border: 2px solid #ffffff; background: rgba(0,0,0,0.3);"></div>
                <div class="foundation" style="width: 60px; height: 80px; border: 2px solid #ffffff; background: rgba(0,0,0,0.3);"></div>
                <div class="foundation" style="width: 60px; height: 80px; border: 2px solid #ffffff; background: rgba(0,0,0,0.3);"></div>
            </div>

            <!-- Stock and waste (left) -->
            <div style="display: flex; gap: 10px; margin-bottom: 20px;">
                <div id="stock" onclick="drawCard()" style="width: 60px; height: 80px; border: 2px solid #ffffff; background: rgba(0,0,0,0.5); cursor: pointer; display: flex; align-items: center; justify-content: center;">
                    <span style="color: white; font-size: 12px;">Stock</span>
                </div>
                <div id="waste" style="width: 60px; height: 80px; border: 2px solid #ffffff; background: rgba(0,0,0,0.3);"></div>
            </div>

            <!-- Tableau piles (bottom) -->
            <div style="display: flex; justify-content: space-between;">
                <div class="tableau" style="width: 60px; height: 300px; border: 2px solid #ffffff; background: rgba(0,0,0,0.3);"></div>
                <div class="tableau" style="width: 60px; height: 300px; border: 2px solid #ffffff; background: rgba(0,0,0,0.3);"></div>
                <div class="tableau" style="width: 60px; height: 300px; border: 2px solid #ffffff; background: rgba(0,0,0,0.3);"></div>
                <div class="tableau" style="width: 60px; height: 300px; border: 2px solid #ffffff; background: rgba(0,0,0,0.3);"></div>
                <div class="tableau" style="width: 60px; height: 300px; border: 2px solid #ffffff; background: rgba(0,0,0,0.3);"></div>
                <div class="tableau" style="width: 60px; height: 300px; border: 2px solid #ffffff; background: rgba(0,0,0,0.3);"></div>
                <div class="tableau" style="width: 60px; height: 300px; border: 2px solid #ffffff; background: rgba(0,0,0,0.3);"></div>
            </div>
        </div>
    `;

    createWindow("Solitaire", gameContent);
    setTimeout(() => newSolitaireGame(), 100);
}

function newSolitaireGame() {
    // Simple solitaire initialization
    alert('New Solitaire game started! Drag and drop cards to play.');
}

function drawCard() {
    // Simple card drawing
    const waste = document.getElementById('waste');
    if (waste) {
        waste.innerHTML = '<div style="width: 50px; height: 70px; background: white; border: 1px solid black; margin: 3px; display: flex; align-items: center; justify-content: center; font-size: 20px;">♠A</div>';
    }
}

function createCalculator() {
    const calcContent = `
        <div id="calculator" style="width: 280px; padding: 10px; background: #c0c0c0;">
            <!-- Display -->
            <div style="background: #000000; border: 2px inset #c0c0c0; padding: 8px; margin-bottom: 15px; text-align: right; height: 50px; display: flex; flex-direction: column; justify-content: flex-end;">
                <div id="calc-history" style="font-size: 10px; color: #808080; height: 16px; text-align: right;"></div>
                <div id="calc-display" style="font-size: 20px; font-family: 'Courier New', monospace; color: #ffffff; font-weight: bold;">0</div>
            </div>

            <!-- Memory Row -->
            <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 2px; margin-bottom: 5px;">
                <button onclick="calcMemory('MC')">MC</button>
                <button onclick="calcMemory('MR')">MR</button>
                <button onclick="calcMemory('MS')">MS</button>
                <button onclick="calcMemory('M+')">M+</button>
                <button onclick="calcMemory('M-')">M-</button>
            </div>

            <!-- Scientific Functions Row -->
            <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 2px; margin-bottom: 5px;">
                <button onclick="calcScientific('sqrt')">√</button>
                <button onclick="calcScientific('sq')">x²</button>
                <button onclick="calcScientific('cube')">x³</button>
                <button onclick="calcScientific('pow')">x^y</button>
                <button onclick="calcScientific('percent')">%</button>
            </div>

            <!-- Basic Operations Row -->
            <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 2px; margin-bottom: 5px;">
                <button onclick="calcScientific('recip')">1/x</button>
                <button onclick="calcScientific('neg')">±</button>
                <button onclick="calcInput('.')" style="grid-column: span 2;">.</button>
                <button onclick="calcClear()" style="background: #ff6666;">C</button>
            </div>

            <!-- Number Pad and Operations -->
            <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 2px;">
                <button onclick="calcInput('7')">7</button>
                <button onclick="calcInput('8')">8</button>
                <button onclick="calcInput('9')">9</button>
                <button onclick="calcInput('/')" style="background: #ff9966;">÷</button>
                <button onclick="calcBackspace()" style="background: #cccccc;">←</button>

                <button onclick="calcInput('4')">4</button>
                <button onclick="calcInput('5')">5</button>
                <button onclick="calcInput('6')">6</button>
                <button onclick="calcInput('*')" style="background: #ff9966;">×</button>
                <button onclick="calcScientific('pi')" style="background: #99ccff;">π</button>

                <button onclick="calcInput('1')">1</button>
                <button onclick="calcInput('2')">2</button>
                <button onclick="calcInput('3')">3</button>
                <button onclick="calcInput('-')" style="background: #ff9966;">−</button>
                <button onclick="calcScientific('e')" style="background: #99ccff;">e</button>

                <button onclick="calcInput('0')" style="grid-column: span 2;">0</button>
                <button onclick="calcEquals()" style="background: #66ff66;">=</button>
                <button onclick="calcInput('+')" style="background: #ff9966;">+</button>
                <button onclick="calcScientific('random')" style="background: #ffff99;">Rnd</button>
            </div>

            <!-- Status Bar -->
            <div style="margin-top: 10px; font-size: 9px; color: #666666; display: flex; justify-content: space-between;">
                <span id="calc-memory">Memory: 0</span>
                <span id="calc-mode">Standard</span>
            </div>
        </div>
    `;

    createWindow("Calculator", calcContent);
    setTimeout(() => initCalculator(), 100);
}

// Calculator state
let calcState = {
    display: '0',
    previousValue: null,
    operation: null,
    waitingForOperand: false,
    memory: 0,
    history: '',
    lastResult: 0
};

function initCalculator() {
    // Reset calculator state
    calcState = {
        display: '0',
        previousValue: null,
        operation: null,
        waitingForOperand: false,
        memory: 0,
        history: '',
        lastResult: 0
    };
    updateCalculatorDisplay();
    updateMemoryDisplay();
}

function updateCalculatorDisplay() {
    const display = document.getElementById('calc-display');
    const history = document.getElementById('calc-history');

    if (display) {
        // Format display number
        let displayValue = calcState.display;

        // Remove trailing .00 for whole numbers
        if (displayValue.endsWith('.00')) {
            displayValue = displayValue.slice(0, -3);
        }

        // Limit display length
        if (displayValue.length > 15) {
            displayValue = parseFloat(displayValue).toExponential(6);
        }

        display.textContent = displayValue;
    }

    if (history) {
        history.textContent = calcState.history;
    }
}

function updateMemoryDisplay() {
    const memoryDisplay = document.getElementById('calc-memory');
    if (memoryDisplay) {
        memoryDisplay.textContent = `Memory: ${calcState.memory}`;
    }
}

function calcInput(value) {
    if (['+', '-', '*', '/'].includes(value)) {
        handleOperator(value);
    } else {
        handleNumber(value);
    }
    updateCalculatorDisplay();
}

function handleNumber(num) {
    if (calcState.waitingForOperand) {
        calcState.display = num;
        calcState.waitingForOperand = false;
    } else {
        calcState.display = calcState.display === '0' ? num : calcState.display + num;
    }
}

function handleOperator(nextOperator) {
    const inputValue = parseFloat(calcState.display);

    if (calcState.previousValue === null) {
        calcState.previousValue = inputValue;
    } else if (calcState.operation) {
        const currentValue = calcState.previousValue || 0;
        const operations = performCalculation();
        const newValue = operations[calcState.operation](currentValue, inputValue);

        calcState.display = String(newValue);
        calcState.previousValue = newValue;
    }

    calcState.waitingForOperand = true;
    calcState.operation = nextOperator;
    calcState.history = `${calcState.previousValue} ${nextOperator}`;
}

function calcEquals() {
    if (calcState.operation && calcState.previousValue !== null) {
        const inputValue = parseFloat(calcState.display);
        const currentValue = calcState.previousValue || 0;
        const operations = performCalculation();
        const result = operations[calcState.operation](currentValue, inputValue);

        calcState.history = `${currentValue} ${calcState.operation} ${inputValue} =`;
        calcState.display = String(result);
        calcState.previousValue = null;
        calcState.operation = null;
        calcState.waitingForOperand = true;
        calcState.lastResult = result;

        updateCalculatorDisplay();
    }
}

function performCalculation() {
    return {
        '+': (first, second) => first + second,
        '-': (first, second) => first - second,
        '*': (first, second) => first * second,
        '/': (first, second) => second !== 0 ? first / second : 'Error'
    };
}

function calcClear() {
    calcState.display = '0';
    calcState.previousValue = null;
    calcState.operation = null;
    calcState.waitingForOperand = false;
    calcState.history = '';
    updateCalculatorDisplay();
}

function calcBackspace() {
    if (calcState.display.length > 1) {
        calcState.display = calcState.display.slice(0, -1);
    } else {
        calcState.display = '0';
    }
    updateCalculatorDisplay();
}

function calcMemory(operation) {
    const currentValue = parseFloat(calcState.display) || 0;

    switch(operation) {
        case 'MC': // Memory Clear
            calcState.memory = 0;
            break;
        case 'MR': // Memory Recall
            calcState.display = String(calcState.memory);
            calcState.waitingForOperand = true;
            break;
        case 'MS': // Memory Store
            calcState.memory = currentValue;
            break;
        case 'M+': // Memory Add
            calcState.memory += currentValue;
            break;
        case 'M-': // Memory Subtract
            calcState.memory -= currentValue;
            break;
    }

    updateCalculatorDisplay();
    updateMemoryDisplay();
}

function calcScientific(operation) {
    const currentValue = parseFloat(calcState.display) || 0;
    let result;

    switch(operation) {
        case 'sqrt': // Square Root
            result = Math.sqrt(currentValue);
            calcState.history = `√${currentValue}`;
            break;
        case 'sq': // Square
            result = currentValue * currentValue;
            calcState.history = `${currentValue}²`;
            break;
        case 'cube': // Cube
            result = currentValue * currentValue * currentValue;
            calcState.history = `${currentValue}³`;
            break;
        case 'pow': // Power
            const exponent = prompt('Enter exponent:', '2');
            if (exponent !== null) {
                result = Math.pow(currentValue, parseFloat(exponent));
                calcState.history = `${currentValue}^${exponent}`;
            } else {
                return;
            }
            break;
        case 'percent': // Percentage
            result = currentValue / 100;
            calcState.history = `${currentValue}%`;
            break;
        case 'recip': // Reciprocal
            result = currentValue !== 0 ? 1 / currentValue : 'Error';
            calcState.history = `1/${currentValue}`;
            break;
        case 'neg': // Negate
            result = -currentValue;
            calcState.history = `−${currentValue}`;
            break;
        case 'pi': // Pi
            result = Math.PI;
            calcState.history = 'π';
            break;
        case 'e': // Euler's Number
            result = Math.E;
            calcState.history = 'e';
            break;
        case 'random': // Random Number
            result = Math.random();
            calcState.history = 'Random';
            break;
        default:
            result = 'Error';
    }

    if (result !== undefined && result !== 'Error') {
        calcState.display = String(result);
        calcState.waitingForOperand = true;
    } else if (result === 'Error') {
        calcState.display = 'Error';
        calcState.waitingForOperand = true;
    }

    updateCalculatorDisplay();
}

// Keyboard support
document.addEventListener('keydown', (e) => {
    // Check if calculator window is active
    const calcWindow = Array.from(document.querySelectorAll('.window')).find(w =>
        w.querySelector('#calc-display') && w.classList.contains('focused')
    );

    if (!calcWindow) return;

    if (e.key >= '0' && e.key <= '9') {
        calcInput(e.key);
        e.preventDefault();
    } else if (e.key === '.') {
        calcInput('.');
        e.preventDefault();
    } else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
        calcInput(e.key);
        e.preventDefault();
    } else if (e.key === 'Enter' || e.key === '=') {
        calcEquals();
        e.preventDefault();
    } else if (e.key === 'Escape' || e.key === 'c' || e.key === 'C') {
        calcClear();
        e.preventDefault();
    } else if (e.key === 'Backspace') {
        calcBackspace();
        e.preventDefault();
    }
});

function createNotepad() {
    const notepadContent = `
        <div style="padding: 10px;">
            <div style="margin-bottom: 10px;">
                <button onclick="saveNotepad()">Save</button>
                <button onclick="clearNotepad()">Clear</button>
            </div>
            <textarea id="notepad-text" style="width: 100%; height: 300px; font-family: 'Courier New', monospace; font-size: 12px; border: 1px inset #808080;" placeholder="Start typing here..."></textarea>
            <div style="margin-top: 5px; font-size: 11px; color: #666;">
                Characters: <span id="char-count">0</span> | Lines: <span id="line-count">1</span>
            </div>
        </div>
    `;

    createWindow("Notepad", notepadContent);

    // Add event listener for character/line count
    setTimeout(() => {
        const textarea = document.getElementById('notepad-text');
        if (textarea) {
            textarea.addEventListener('input', updateNotepadStats);
        }
    }, 100);
}

function updateNotepadStats() {
    const textarea = document.getElementById('notepad-text');
    const charCount = document.getElementById('char-count');
    const lineCount = document.getElementById('line-count');

    if (textarea && charCount && lineCount) {
        charCount.textContent = textarea.value.length;
        lineCount.textContent = textarea.value.split('\n').length;
    }
}

function saveNotepad() {
    const textarea = document.getElementById('notepad-text');
    if (textarea) {
        alert('Note saved! (In a real application, this would save to a file)');
    }
}

function clearNotepad() {
    if (confirm('Are you sure you want to clear all text?')) {
        const textarea = document.getElementById('notepad-text');
        if (textarea) {
            textarea.value = '';
            updateNotepadStats();
        }
    }
}

function createClockApp() {
    const clockContent = `
        <div style="padding: 20px; text-align: center;">
            <div style="margin-bottom: 20px;">
                <div id="analog-clock" style="width: 150px; height: 150px; border: 4px solid #808080; border-radius: 50%; margin: 0 auto; position: relative; background: white;">
                    <div id="hour-hand" style="position: absolute; width: 4px; height: 40px; background: black; top: 35px; left: 73px; transform-origin: bottom center;"></div>
                    <div id="minute-hand" style="position: absolute; width: 2px; height: 55px; background: black; top: 20px; left: 74px; transform-origin: bottom center;"></div>
                    <div id="second-hand" style="position: absolute; width: 1px; height: 60px; background: red; top: 15px; left: 74.5px; transform-origin: bottom center;"></div>
                    <div style="position: absolute; width: 8px; height: 8px; background: black; border-radius: 50%; top: 71px; left: 71px;"></div>
                </div>
            </div>

            <div style="font-size: 24px; font-weight: bold; margin-bottom: 10px;" id="digital-time">00:00:00</div>

            <div style="font-size: 14px; margin-bottom: 20px;" id="digital-date">Monday, January 1, 2024</div>

            <div style="display: flex; gap: 10px; justify-content: center;">
                <button onclick="toggleClockFormat()">Toggle 12/24 Hour</button>
                <button onclick="setAlarm()">Set Alarm</button>
            </div>
        </div>
    `;

    createWindow("Clock", clockContent);
    setTimeout(() => startClockApp(), 100);
}

let clockInterval;
let is24Hour = false;

function startClockApp() {
    updateClockDisplay();
    clockInterval = setInterval(updateClockDisplay, 1000);
}

function updateClockDisplay() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    // Update digital clock
    const digitalTime = document.getElementById('digital-time');
    if (digitalTime) {
        const displayHours = is24Hour ? hours : (hours % 12 || 12);
        const ampm = !is24Hour ? (hours >= 12 ? ' PM' : ' AM') : '';
        digitalTime.textContent = `${displayHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}${ampm}`;
    }

    // Update date
    const digitalDate = document.getElementById('digital-date');
    if (digitalDate) {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        digitalDate.textContent = now.toLocaleDateString('en-US', options);
    }

    // Update analog clock
    const hourHand = document.getElementById('hour-hand');
    const minuteHand = document.getElementById('minute-hand');
    const secondHand = document.getElementById('second-hand');

    if (hourHand && minuteHand && secondHand) {
        const hourDegrees = (hours % 12) * 30 + minutes * 0.5;
        const minuteDegrees = minutes * 6 + seconds * 0.1;
        const secondDegrees = seconds * 6;

        hourHand.style.transform = `rotate(${hourDegrees}deg)`;
        minuteHand.style.transform = `rotate(${minuteDegrees}deg)`;
        secondHand.style.transform = `rotate(${secondDegrees}deg)`;
    }
}

function toggleClockFormat() {
    is24Hour = !is24Hour;
}

function setAlarm() {
    const time = prompt('Enter alarm time (HH:MM format):');
    if (time && /^\d{2}:\d{2}$/.test(time)) {
        alert(`Alarm set for ${time}`);
    }
}

function createPaint() {
    const paintContent = `
        <div style="padding: 10px;">
            <div style="margin-bottom: 10px;">
                <button onclick="setPaintTool('pen')"><i class="fas fa-pen"></i> Pen</button>
                <button onclick="setPaintTool('eraser')"><i class="fas fa-eraser"></i> Eraser</button>
                <button onclick="setPaintTool('fill')"><i class="fas fa-fill-drip"></i> Fill</button>
                <button onclick="setPaintTool('line')"><i class="fas fa-minus"></i> Line</button>
                <button onclick="setPaintTool('rect')"><i class="fas fa-square"></i> Rectangle</button>
                <button onclick="setPaintTool('circle')"><i class="fas fa-circle"></i> Circle</button>

                <label style="margin-left: 10px;">Color:</label>
                <input type="color" id="paint-color" value="#000000" onchange="changePaintColor()">

                <label style="margin-left: 10px;">Size:</label>
                <select id="brush-size" onchange="changeBrushSize()">
                    <option value="1">1</option>
                    <option value="3" selected>3</option>
                    <option value="5">5</option>
                    <option value="10">10</option>
                </select>

                <button onclick="clearCanvas()" style="margin-left: 10px;">Clear All</button>
            </div>

            <canvas id="paint-canvas" width="600" height="400" style="border: 2px inset #808080; background: white; cursor: crosshair;"></canvas>

            <div style="margin-top: 10px; font-size: 11px; color: #666;">
                Position: <span id="mouse-pos">0, 0</span> | Tool: <span id="current-tool">Pen</span>
            </div>
        </div>
    `;

    createWindow("Paint", paintContent);
    setTimeout(() => initializePaint(), 100);
}

let paintCanvas, paintCtx;
let isDrawing = false;
let currentTool = 'pen';
let currentColor = '#000000';
let currentSize = 3;
let startX, startY;

function initializePaint() {
    paintCanvas = document.getElementById('paint-canvas');
    if (!paintCanvas) return;

    paintCtx = paintCanvas.getContext('2d');
    paintCtx.lineCap = 'round';
    paintCtx.lineJoin = 'round';

    paintCanvas.addEventListener('mousedown', startDrawing);
    paintCanvas.addEventListener('mousemove', draw);
    paintCanvas.addEventListener('mouseup', stopDrawing);
    paintCanvas.addEventListener('mouseout', stopDrawing);
    paintCanvas.addEventListener('mousemove', updateMousePosition);

    // Touch support
    paintCanvas.addEventListener('touchstart', handleTouch);
    paintCanvas.addEventListener('touchmove', handleTouch);
    paintCanvas.addEventListener('touchend', stopDrawing);
}

function startDrawing(e) {
    isDrawing = true;
    const rect = paintCanvas.getBoundingClientRect();
    startX = e.clientX - rect.left;
    startY = e.clientY - rect.top;

    if (currentTool === 'pen' || currentTool === 'eraser') {
        paintCtx.beginPath();
        paintCtx.moveTo(startX, startY);
    }
}

function draw(e) {
    if (!isDrawing) return;

    const rect = paintCanvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    paintCtx.lineWidth = currentSize;

    switch(currentTool) {
        case 'pen':
            paintCtx.globalCompositeOperation = 'source-over';
            paintCtx.strokeStyle = currentColor;
            paintCtx.lineTo(x, y);
            paintCtx.stroke();
            break;

        case 'eraser':
            paintCtx.globalCompositeOperation = 'destination-out';
            paintCtx.lineTo(x, y);
            paintCtx.stroke();
            break;
    }
}

function stopDrawing(e) {
    if (!isDrawing) return;

    if (currentTool === 'line' || currentTool === 'rect' || currentTool === 'circle') {
        const rect = paintCanvas.getBoundingClientRect();
        const endX = e.clientX - rect.left;
        const endY = e.clientY - rect.top;

        paintCtx.globalCompositeOperation = 'source-over';
        paintCtx.strokeStyle = currentColor;
        paintCtx.lineWidth = currentSize;

        switch(currentTool) {
            case 'line':
                paintCtx.beginPath();
                paintCtx.moveTo(startX, startY);
                paintCtx.lineTo(endX, endY);
                paintCtx.stroke();
                break;

            case 'rect':
                paintCtx.beginPath();
                paintCtx.rect(startX, startY, endX - startX, endY - startY);
                paintCtx.stroke();
                break;

            case 'circle':
                const radius = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
                paintCtx.beginPath();
                paintCtx.arc(startX, startY, radius, 0, 2 * Math.PI);
                paintCtx.stroke();
                break;
        }
    }

    isDrawing = false;
}

function handleTouch(e) {
    e.preventDefault();
    const touch = e.touches[0];
    const mouseEvent = new MouseEvent(e.type === 'touchstart' ? 'mousedown' :
                                     e.type === 'touchmove' ? 'mousemove' : 'mouseup', {
        clientX: touch.clientX,
        clientY: touch.clientY
    });
    paintCanvas.dispatchEvent(mouseEvent);
}

function setPaintTool(tool) {
    currentTool = tool;
    document.getElementById('current-tool').textContent = tool.charAt(0).toUpperCase() + tool.slice(1);

    // Change cursor
    if (paintCanvas) {
        switch(tool) {
            case 'pen':
                paintCanvas.style.cursor = 'crosshair';
                break;
            case 'eraser':
                paintCanvas.style.cursor = 'grab';
                break;
            case 'fill':
                paintCanvas.style.cursor = 'cell';
                break;
            default:
                paintCanvas.style.cursor = 'crosshair';
        }
    }
}

function changePaintColor() {
    currentColor = document.getElementById('paint-color').value;
}

function changeBrushSize() {
    currentSize = parseInt(document.getElementById('brush-size').value);
}

function clearCanvas() {
    if (confirm('Clear the entire canvas?')) {
        paintCtx.clearRect(0, 0, paintCanvas.width, paintCanvas.height);
    }
}

function updateMousePosition(e) {
    const rect = paintCanvas.getBoundingClientRect();
    const x = Math.round(e.clientX - rect.left);
    const y = Math.round(e.clientY - rect.top);
    const posElement = document.getElementById('mouse-pos');
    if (posElement) {
        posElement.textContent = `${x}, ${y}`;
    }
}

// Icons are now static for authentic Windows 98 reproduction

// Cleanup clock when window is closed
document.addEventListener('click', (e) => {
    if (e.target.closest('[aria-label="Close"]')) {
        const windowElement = e.target.closest('.window');
        if (windowElement && windowElement.querySelector('#analog-clock')) {
            clearInterval(clockInterval);
        }
    }
});

// Screensaver functionality
let inactivityTimer;
let screensaverActive = false;

function startScreensaver() {
    const screensaver = document.getElementById('screensaver');
    const selectedScreensaver = localStorage.getItem('screensaver') || 'none';

    if (selectedScreensaver === 'none') return;

    screensaver.style.display = 'block';
    screensaverActive = true;

    if (selectedScreensaver === 'text') {
        startScrollingTextScreensaver();
    } else if (selectedScreensaver === 'stars') {
        startStarfieldScreensaver();
    }
}

function stopScreensaver() {
    const screensaver = document.getElementById('screensaver');
    screensaver.style.display = 'none';
    screensaverActive = false;
    resetInactivityTimer();
}

function resetInactivityTimer() {
    clearTimeout(inactivityTimer);
    if (!screensaverActive) {
        const waitTime = (parseInt(localStorage.getItem('screensaverWait')) || 5) * 60 * 1000;
        inactivityTimer = setTimeout(startScreensaver, waitTime);
    }
}

function startScrollingTextScreensaver() {
    const scrollingText = document.getElementById('scrolling-text');
    const marqueeText = localStorage.getItem('marqueeText') || 'Windows 98';
    scrollingText.textContent = marqueeText;
}

function startStarfieldScreensaver() {
    const canvas = document.getElementById('starfield');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const stars = [];
    for (let i = 0; i < 500; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            z: Math.random() * canvas.width
        });
    }

    function drawStars() {
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'white';

        for (let i = 0; i < stars.length; i++) {
            const star = stars[i];
            star.z -= 1;

            if (star.z <= 0) {
                star.z = canvas.width;
            }

            const x = (star.x - canvas.width / 2) * (canvas.width / star.z) + canvas.width / 2;
            const y = (star.y - canvas.height / 2) * (canvas.width / star.z) + canvas.height / 2;
            const r = (canvas.width / star.z);

            ctx.beginPath();
            ctx.arc(x, y, r, 0, 2 * Math.PI);
            ctx.fill();
        }

        if (screensaverActive) {
            requestAnimationFrame(drawStars);
        }
    }

    drawStars();
}

// Event listeners for inactivity
document.addEventListener('mousemove', resetInactivityTimer);
document.addEventListener('keydown', resetInactivityTimer);
document.addEventListener('click', () => {
    if (screensaverActive) {
        stopScreensaver();
    } else {
        resetInactivityTimer();
    }
});

// Initial call to start the timer
resetInactivityTimer();

