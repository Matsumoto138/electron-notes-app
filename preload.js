const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electron", {
  getNotes: () => ipcRenderer.invoke("get-notes"),
  addNote: (note) => ipcRenderer.invoke("add-note", note),
  deleteNote: (index) => ipcRenderer.invoke("delete-note", index),
});
