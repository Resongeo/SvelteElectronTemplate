const { app, BrowserWindow, dialog, ipcMain, Menu } = require('electron')
const path = require('path')
const serve = require('electron-serve')
const loadURL = serve({ directory: 'public' })

let mainWindow

function isDev() {
    return !app.isPackaged
}

function createWindow() {    
    mainWindow = new BrowserWindow({
        width: 1600,
        height: 900,
        frame: false,
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: false
        },
        icon: path.join(__dirname, 'public/favicon.png'),
        show: false
    })

    if (isDev()) {
        mainWindow.loadURL('http://localhost:5000/')
    } else {
        loadURL(mainWindow)
    }
    
    mainWindow.on('closed', function () {
        mainWindow = null
    })

    mainWindow.once('ready-to-show', () => {
        mainWindow.show()
    })

    Menu.setApplicationMenu(Menu.buildFromTemplate(MenuBarTemplate))
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
    if (mainWindow === null) createWindow()
})

ipcMain.on("app:controls", (event, arg) => {
    if(arg == "close"){
        app.quit()
    }
    else if(arg == "maximize"){
        mainWindow.maximize()
    }
    else if(arg == "minimize"){
        mainWindow.minimize()
    }
})

const MenuBarTemplate =
[
    {
        label: "Utils",
        submenu: [
            {
                label: "Quit",
                accelerator: "Ctrl+Q",
                click(){
                    app.quit()
                }
            },
            {
                label: "DevTools",
                accelerator: "Ctrl+D",
                click(){
                    mainWindow.toggleDevTools()
                }
            }
        ]
    }
]