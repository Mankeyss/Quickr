var openBrowser = require('react-dev-utils/openBrowser');
const util = require('node:util');
const exec = util.promisify(require('child_process').exec);
var spawn = require("child_process").spawn;
let syntax = new Map();

syntax.set('vscode', 'code');
syntax.set('spotify', '%appdata%\\Spotify\\Spotify.exe');

function isUrl(url) {
    const urlRegex =
      /^(((http|https):\/\/|)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,6}(:[0-9]{1,5})?(\/.*)?)$/;
    if (urlRegex.test(url)) {
      return true;
    } else {
      return false;
    }
  }

function RunCommand (command) {
    command = command.toLowerCase();
    if(isUrl(command)) {
        if(command.startsWith('http')) {
            openBrowser(command);
        } else {
            openBrowser('http://' + command);
        }
    } else if(command.toLowerCase().startsWith('s ') || command.toLowerCase().startsWith('search ')) {
      if(command.toLowerCase().startsWith('s ')) {
        openBrowser('https://google.com/search?q=' + encodeURIComponent(command.slice(2)));
      } else {
        openBrowser('https://google.com/search?q=' + encodeURIComponent(command.slice(7)));
      }
    } else if(command.toLowerCase() == 'explorer') {
      spawn("powershell.exe", ['explorer']);
    } else {
        if(spawn("powershell.exe", ['start ' + command]).exitCode != 0) {
          if(syntax.has(command.toLowerCase())) command = syntax.get(command.toLowerCase());
          exec(command, (err, stdout, stderr) => {
            if (err) {
              return;
        }})}
    }
    clearSearchBar();
  };

function clearSearchBar() {
  document.getElementById('search-input').value = ``;
}

module.exports = RunCommand;