const socket = new WebSocket('ws://localhost:8080');

socket.addEventListener('message', (event) => {
  const data = JSON.parse(event.data);
  updateDisplay(data);
});

function updateDisplay(data) {
  const displayElement = document.getElementById('chat');

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

    const textContent = document.createTextNode(`${message.username}: ${message.message}`);
    li.appendChild(textContent);

    if (message.color) {
      const coloredUsername = document.createElement('span');
      coloredUsername.style.color = message.color;
      coloredUsername.appendChild(textContent);
      li.appendChild(coloredUsername);
    } else {
      li.appendChild(textContent);
    }

    // Ajoute l'élément li à la liste ul
    ul.appendChild(li);
  });

  // Ajoute la liste ul à l'élément d'affichage
  displayElement.appendChild(ul);
}

document.addEventListener('DOMContentLoaded', () => {
  // Envoyez une demande au serveur pour tous les messages
  socket.send(JSON.stringify({ command: 'getAllMessages' }));
});

// Fait défiler vers le bas de la zone de chat
function scrollDown() {
  const chatElement = document.getElementById('chat');
  chatElement.scrollTop = chatElement.scrollHeight;
}