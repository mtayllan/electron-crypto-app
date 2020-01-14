const electron = require('electron')
const path = require('path')
const BrowserWindow = electron.remote.BrowserWindow
const axios = require('axios')

const notifyBtn = document.getElementById('notifyBtn')
const price = document.querySelector('h1')
const targetPrice = document.getElementById('targetPrice')

function getBTC() {
  axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC&tsyms=USD')
    .then(res => {
      const cryptos = res.data.BTC.USD
      price.innerHTML = '$' + cryptos.toLocaleString('en')
    })
}
getBTC()
setInterval(getBTC, 30000)

notifyBtn.addEventListener('click', (e) => {
  const modalPath = path.join('file://', __dirname, 'add.html')
  let win = new BrowserWindow({
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    width: 400,
    height: 200,
    webPreferences: {
      nodeIntegration: true
    }
  })
  win.webContents.openDevTools()
  win.on('close', () => { win = null })
  win.loadURL(modalPath)
  win.show()
})