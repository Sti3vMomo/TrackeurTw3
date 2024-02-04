const socket = new WebSocket("ws://localhost:8080");
const displayElement = document.getElementById("chat");
let ul; // Variable pour stocker la liste ul

socket.addEventListener("open", () => {
  // La connexion WebSocket est établie. Vous pouvez maintenant envoyer des données.
  socket.send(JSON.stringify({ command: "getAllMessages" }));
});

socket.addEventListener("message", (event) => {
  const data = JSON.parse(event.data);
  updateDisplay(data);
});

function updateDisplay(data) {
  const shouldScrollToBottom = displayElement.scrollTop + displayElement.clientHeight >= displayElement.scrollHeight;

  // Si la liste ul n'existe pas, la créer
  if (!ul) {
    ul = document.createElement("ul");
    displayElement.appendChild(ul);
  } else {
    // Effacer le contenu actuel de la liste ul
    ul.innerHTML = "";
  }

  data.forEach((message) => {
    const li = document.createElement("li");

    if (message.isMod) {
      const imgModo = document.createElement("img");
      imgModo.src = "./img/modo.png";
      imgModo.alt = "Modo";
      li.appendChild(imgModo);
    }

    if (message.isVIP) {
      const imgVIP = document.createElement("img");
      imgVIP.src = "./img/vip.png";
      imgVIP.alt = "VIP";
      li.appendChild(imgVIP);
    }

    const messageText = `${message.username}: ${message.message}`;

    if (message.color) {
      const coloredUsername = document.createElement("span");
      coloredUsername.style.color = message.color;
      coloredUsername.textContent = messageText;
      li.appendChild(coloredUsername);
    } else {
      li.textContent = messageText;
    }

    ul.appendChild(li);
  });

  // Faites défiler vers le bas uniquement si la barre de défilement était en bas ou près du bas avant l'ajout des nouveaux messages
  if (shouldScrollToBottom) {
    displayElement.scrollTop = displayElement.scrollHeight;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // ...

  // Exemple : Si vous avez une référence à un élément avec l'id "exampleElement"
  const exampleElement = document.getElementById("chat");

  // Vérifiez si l'élément existe avant d'ajouter un écouteur d'événements
  if (exampleElement) {
    exampleElement.addEventListener("click", (event) => {
      // Votre code ici
    });
  }
});
