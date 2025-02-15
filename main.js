const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const Store = require("electron-store");
const store = new Store();

let mainWindow;

app.whenReady().then(() => {
  mainWindow = new BrowserWindow({
    width: 1100,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  mainWindow.loadURL("http://localhost:5173");

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
});

// Notları geitr
ipcMain.handle("get-notes", () => {
    return store.get("notes",[]);
});

// Bot ekle
ipcMain.handle("add-note", (event, note) => {
    const notes = store.get("notes",[]);
    notes.push(note);
    store.set("notes",notes);
    return notes;
});

// Not sil
ipcMain.handle("delete-note", (event, index) => {
    const notes = store.get("notes",[]);
    notes.splice(index, 1);
    store.set("notes",notes);
    return notes;
});
