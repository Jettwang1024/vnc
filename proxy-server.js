const { spawn } = require('child_process');
const express = require('express');
const app = express();
const PORT = 3000;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

let websockifyProcess = null;

app.post('/connect', (req, res) => {
  const { host, port } = req.query;

  if (!host || !port) {
    return res.status(400).send('缺少 host 或 port');
  }

  if (websockifyProcess) {
    websockifyProcess.kill();
  }

  websockifyProcess = spawn('node', [
    './websockify-js/websockify/websockify.js',
    '--web',
    '.',
    '6080',
    `${host}:${port}`
  ]);

  websockifyProcess.stdout.on('data', (data) => {
    console.log(`websockify output: ${data}`);
  });

  websockifyProcess.stderr.on('data', (data) => {
    console.error(`websockify error: ${data}`);
  });

  websockifyProcess.on('close', (code) => {
    console.log(`websockify process exited with code ${code}`);
  });

  res.send(`Connecting to ${host}:${port}`);
});

app.post('/disconnect', (req, res) => {
  if (websockifyProcess) {
    websockifyProcess.kill();
    websockifyProcess = null;
    res.send('Disconnected from VNC server');
  } else {
    res.send('No active connection to disconnect');
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});
