const WebSocket = require('ws');
const fs = require('fs');

const wss = new WebSocket.Server({ port: 8080 });
let lastModifiedTime = 0;

wss.on('connection', (ws) => {
  ws.send(JSON.stringify(getNewMessagesSinceLastUpdate()));

  ws.on('close', () => {
    // Gérer la déconnexion du client si nécessaire
  });
});

// Watch for changes in the file
fs.watch('./data/tobias.json', (event, filename) => {
  if (event === 'change') {
    const updatedData = getNewMessagesSinceLastUpdate();
    if (updatedData.length > 0) {
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(updatedData));
        }
      });
    }
  }
});

function getLastModifiedTime() {
  try {
    const stats = fs.statSync('./data/tobias.json');
    return stats.mtimeMs;
  } catch (err) {
    console.error('Erreur en obtenant le temps de dernière modification:', err);
    return 0;
  }
}

function getNewMessagesSinceLastUpdate() {
  try {
    const currentModifiedTime = getLastModifiedTime();

    if (currentModifiedTime > lastModifiedTime) {
      lastModifiedTime = currentModifiedTime;

      const data = fs.readFileSync('./data/tobias.json', 'utf8');
      return JSON.parse(data);
    } else {
      return [];
    }
  } catch (err) {
    console.error('Erreur en lisant le fichier ou en analysant les données:', err);
    return [];
  }
}
