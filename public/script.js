const socket = new WebSocket("ws://localhost:8080");

socket.addEventListener("message", (event) => {
  const data = JSON.parse(event.data);
  updateDisplay(data);
});

function updateDisplay(data) {
  const displayElement = document.getElementById("chat");
  const ul = displayElement.querySelector("ul") || document.createElement("ul");

  // Vérifier si les données sont déjà présentes pour éviter la duplication
  const existingMessages = ul.querySelectorAll("li[data-id]");
  const existingIds = Array.from(existingMessages).map((li) =>
    li.getAttribute("data-id")
  );

  data.forEach((message) => {
    if (!existingIds.includes(message.id)) {
      const li = document.createElement("li");
      li.setAttribute("data-id", message.id);

      // Ajoute l'image modo si isMod est true
      if (message.isMod) {
        const imgModo = document.createElement("img");
        imgModo.src = "./img/modo.png";
        imgModo.alt = "Modo";
        li.appendChild(imgModo);
      }

      // Ajoute l'image VIP si isVIP est true
      if (message.isVIP) {
        const imgVIP = document.createElement("img");
        imgVIP.src = "./img/vip.png";
        imgVIP.alt = "VIP";
        li.appendChild(imgVIP);
      }

      const textContent = document.createTextNode(
        `${message.username}: ${message.message}`
      );

      if (message.color) {
        const coloredUsername = document.createElement("span");
        coloredUsername.style.color = message.color;

        // Append the text node to the colored username element
        coloredUsername.appendChild(textContent);
        li.appendChild(coloredUsername);
      } else {
        li.appendChild(textContent);
      }

      ul.appendChild(li);
    }
  });

  displayElement.appendChild(ul);
}

document.addEventListener("DOMContentLoaded", () => {
  // Initial request to get all messages
  socket.send(JSON.stringify({ command: "getAllMessages" }));
});
