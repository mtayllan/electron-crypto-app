const electron = require('electron')
const path = require('path')
const BrowserWindow = electron.remote.BrowserWindow
const axios = require('axios')
const ipc = electron.ipcRenderer

const notifyBtn = document.getElementById('notifyBtn')
const price = document.querySelector('h1')
const targetPrice = document.getElementById('targetPrice')
var targetPriceVal

const notification = {
  title: 'BTC Alert',
  body: 'BTC just beat your target price!',
  icon: path.join(__dirname, '../assets/images/btc.png')
}

function getBTC() {
  axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC&tsyms=USD')
    .then(res => {
      const cryptos = res.data.BTC.USD
      price.innerHTML = '$' + cryptos.toLocaleString('en')

      if (targetPrice.innerHTML != '' && targetPriceVal < res.data.BTC.USD) {
        const myNotification = new window.Notification(notification.title, notification)
      }
    })
}
getBTC()
setInterval(getBTC, 1000)

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
  win.on('close', () => { win = null })
  win.loadURL(modalPath)
  win.show()
})

ipc.on('targetPriceVal', (e, args) => {
  targetPriceVal = Number(args)
  targetPrice.innerHTML = `$${targetPriceVal.toLocaleString('en')}`
})