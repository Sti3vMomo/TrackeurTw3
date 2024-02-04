const WebSocket = require('ws');
const fs = require('fs');
const http = require('http');
const path = require('path');

const wss = new WebSocket.Server({ port: 8080 });
let lastModifiedTime = 0;

wss.on('connection', (ws) => {
<<<<<<< Updated upstream
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
=======
  const initialData = loadMessagesFromFile();
  ws.send(JSON.stringify(initialData));

  ws.on('close', () => {
    // Fermeture de la connexion en cas de déconnexion du client
  });
});

fs.watch('./data/tobias.json', (event, filename) => {
  if (event === 'change') {
    const updatedData = loadMessagesFromFile();
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(updatedData));
      }
    });
>>>>>>> Stashed changes
  }
});

function getLastModifiedTime() {
  try {
    const stats = fs.statSync('./data/tobias.json');
    return stats.mtimeMs;
  } catch (err) {
<<<<<<< Updated upstream
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
=======
>>>>>>> Stashed changes
    return [];
  }
}

const server = http.createServer((req, res) => {
  const filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url);
  const extname = path.extname(filePath);
  const contentType = getContentType(extname);

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        // Page non trouvée
        fs.readFile(path.join(__dirname, 'public', '404.html'), (err, content) => {
          res.writeHead(404, { 'Content-Type': 'text/html' });
          res.end(content, 'utf8');
        });
      } else {
        // Erreur interne du serveur
        res.writeHead(500);
        res.end(`Erreur interne du serveur: ${err.code}`);
      }
    } else {
      // Succès de la lecture du fichier
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf8');
    }
  });
});

function getContentType(extname) {
  switch (extname) {
    case '.html':
      return 'text/html';
    case '.css':
      return 'text/css';
    // Ajoutez d'autres types MIME au besoin
    default:
      return 'text/plain';
  }
}
