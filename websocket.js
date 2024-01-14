const WebSocket = require('ws');
const fs = require('fs');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
  // Charger les données initiales et les envoyer au client lors de la connexion
  const initialData = loadMessagesFromFile();
  ws.send(JSON.stringify(initialData));

  // Écouter les mises à jour et les envoyer au client lorsqu'elles surviennent
  fs.watch('./data/aenot.json', (event, filename) => {
    if (event === 'change') {
      const updatedData = loadMessagesFromFile();
      ws.send(JSON.stringify(updatedData));
    }
  });
});

function loadMessagesFromFile() {
  try {
    const data = fs.readFileSync('./data/aenot.json', 'utf8');
    return JSON.parse(data);
  } catch (err) {
    // console.error('Erreur lors de la lecture du fichier aenot.json :', err);
    return [];
  }
}
