const { globalShortcut } = require("electron/main");
const makeVisible = import('main.js');

globalShortcut.register('CommandOrControl+X', makeVisible);

//On shortcut
makeVisible();

function clearSearchBar() {
    document.getElementById('search-input').value = ``;
}

export default clearSearchBar();