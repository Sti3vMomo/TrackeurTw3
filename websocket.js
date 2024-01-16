const WebSocket = require('ws');
const fs = require('fs');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
  // console.log('Client connected');

  // Charger les données initiales et les envoyer au client lors de la connexion
  const initialData = loadMessagesFromFile();
  ws.send(JSON.stringify(initialData));

  // Fermeture de la connexion en cas de déconnexion du client
  ws.on('close', () => {
    // console.log('Client disconnected');
  });
});

// Écouter les mises à jour et les envoyer à tous les clients lorsqu'elles surviennent
fs.watch('./data/tobias.json', (event, filename) => {
  if (event === 'change') {
    // console.log('File changed, sending updated data to all clients');
    const updatedData = loadMessagesFromFile();
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(updatedData));
      }
    });
  }
});

function loadMessagesFromFile() {
  try {
    const data = fs.readFileSync('./data/tobias.json', 'utf8');
    return JSON.parse(data);
  } catch (err) {
    // console.error('Erreur lors de la lecture du fichier tobias.json :', err);
    return [];
  }
}
