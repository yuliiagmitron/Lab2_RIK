const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs/promises');

function createWindow() {
  const win = new BrowserWindow({
    width: 600,
    height: 500,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true
    }
  });

  win.loadFile('index.html');
}

app.whenReady().then(createWindow);

ipcMain.handle('save-answer', async (_event, answer) => {
  const { canceled, filePath } = await dialog.showSaveDialog({
    title: 'Зберегти відповідь',
    defaultPath: 'survey-result.txt',
    filters: [{ name: 'Text Files', extensions: ['txt'] }]
  });

  if (canceled || !filePath) {
    return { ok: false, message: "Збереження скасовано." };
  }

  const content =
`Питання: Що ви очікуєте від цього курсу?
Відповідь: ${answer}
Дата: ${new Date().toLocaleString()}`;

  await fs.writeFile(filePath, content, 'utf-8');

  return { ok: true, message: `Файл збережено: ${filePath}` };
});