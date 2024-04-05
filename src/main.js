const { app, BrowserWindow, globalShortcut } = require("electron/main");

function createWindow() {
  const win = new BrowserWindow({
    width: 500,
    height: 80,
    webPreferences: {
      devTools: false,
      nodeIntegration: true,
      contextIsolation: false,
    },
    resizable: false,
    frame: false,
    movable: false,
    roundedCorners: true,
  });

  win.setIcon('Quickr logo.png');

  win.center();

  win.loadFile("index.html");

  win.on("focus", () => {
    win.center();
  });

  win.on("blur", () => {
    win.hide();
  });

  win.once("ready-to-show", () => {
    win.show();
  });

  function makeVisible() {
    if(!win.isFocused()) {
      win.show();
      win.focus();
    } else {
      win.hide();
    }
  }

  globalShortcut.register('CommandOrControl+Q', makeVisible);
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    globalShortcut.unregisterAll();
    app.quit();
  }
});