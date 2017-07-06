git clone https://github.com/kwokhung/smartDesk.git

ionic start smartDesk blank

ionic g page home
ionic g page user
ionic g page userDetails
ionic g page addUser
ionic g page editUser
ionic g provider logger
ionic g provider userHelper

npm install electron electron-builder --save-dev

npm run electron
npm run ebuild