const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// Définir le dossier public
app.use(express.static(path.join(__dirname, 'public')));

// Middleware pour définir le type MIME des fichiers JavaScript
app.use('/script.js', (req, res, next) => {
    res.type('text/javascript');
    next();
});

// Route pour servir le fichier HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Démarrer le serveur
app.listen(port, () => {
    console.log(`Le serveur est en cours d'exécution sur http://localhost:${port}`);
});
