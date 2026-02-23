const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  saveAnswer: (data) => ipcRenderer.invoke('save-answer', data)
});