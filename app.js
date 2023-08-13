const express = require('express');
const qrcode = require('qrcode');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/generate', async (req, res) => {
  const ssid = req.body.ssid;
  const password = req.body.password;

  const wifiData = {
    ssid: ssid,
    password: password,
    type: 'WPA',
  };

  const wifiString = JSON.stringify(wifiData);

  try {
    const qrCode = await qrcode.toDataURL(wifiString);
    res.send(`<img src="${qrCode}" alt="Wi-Fi QR Code"/>`);
  } catch (err) {
    console.error(err);
    res.status(500).send('QR 코드 생성 중 오류가 발생했습니다.');
  }
});

app.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});