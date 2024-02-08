const socket = new WebSocket('ws://localhost:8080');

socket.addEventListener('message', (event) => {
  const data = JSON.parse(event.data);
  updateDisplay(data);
  scrollDown();
});

function updateDisplay(data) {
  const displayElement = document.getElementById('chat');
  displayElement.innerHTML = '';  // Efface le contenu précédent

  const ul = document.createElement('ul');

  data.forEach(message => {
    const li = document.createElement('li');

    // Ajoute l'image modo si isMod est true
    if (message.isMod) {
      const imgModo = document.createElement('img');
      imgModo.src = './img/modo.png';
      imgModo.alt = 'Modo';
      li.appendChild(imgModo);
    }

    // Ajoute l'image VIP si isVIP est true
    if (message.isVIP) {
      const imgVIP = document.createElement('img');
      imgVIP.src = './img/vip.png';
      imgVIP.alt = 'VIP';
      li.appendChild(imgVIP);
    }

    // Ajoute l'heure et le texte du message après les images
    const textContent = document.createTextNode(`${message.username}: ${message.message}`);
    li.appendChild(textContent);

    // Ajoute l'élément li à la liste ul
    ul.appendChild(li);
  });

  // Ajoute la liste ul à l'élément d'affichage
  displayElement.appendChild(ul);
}

function scrollDown() {
  // Obtient la hauteur totale du contenu déroulant
  const scrollHeight = document.body.scrollHeight;

  // Défilement vers le bas
  window.scrollTo(0, scrollHeight);
}

document.addEventListener('DOMContentLoaded', (event) => {
  scrollDown();
});

// Charge les données initiales
loadJSON('tobias');
// Fait défiler vers le bas après le chargement

function scrollDownIfYouAreDown() {
  // Obtient la position actuelle de défilement vertical
  const currentScroll = window.scrollY;

  // Obtient la hauteur totale du contenu déroulant
  const scrollHeight = document.body.scrollHeight;

  // Obtient la hauteur de la fenêtre visible
  const windowHeight = window.innerHeight;

  // Vérifie si l'utilisateur est déjà tout en bas
  const isAlreadyAtBottom = currentScroll + windowHeight >= scrollHeight;

  // Si l'utilisateur est déjà tout en bas, effectue le défilement vers le bas
  if (isAlreadyAtBottom) {
    window.scrollTo(0, scrollHeight);
  }
}