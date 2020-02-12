# Extension Readme
Hi there, this repository for the browser extension for XHordes, which is the part that allows users to install and manage their mods. This also handles the actual modding of the game.

## How to build the extension
1. Clone the repository (If you haven't done so already)
2. `cd ./build`
3. `npm install`
4. `npm build`
5. There should now be a folder within `./extension/build/compbuilds/` named `0.x.x` (where x is some version number). Inside that folder will be the completed builds for Firefox, Opera, and Chrome.
6. Upload the completed build file to their respective browsers to test.