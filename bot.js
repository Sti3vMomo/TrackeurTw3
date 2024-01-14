const fs = require("fs");
const tmi = require("tmi.js");

const options = {
  identity: {
    username: "haloufgang",
    password: "txxbg45x8qm8wsmu8tn13f9lm7lkz6",
  },
  channels: [
    "aenot",
    "tobias",
    "jltomy",
    "wati",
    "nikos",
    "sura",
    "twincytv",
    "blazx",
    "khadim",
    "bichouu_",
    "lz_haamaa",
    "minos",
    "mehdochelive",
    "mrbboy45",
    "lz_rises",
    "7lvn",
    "mowraa",
    "idater",
    "furax22",
    "qvk_haha",
    "beking66",
    "lucyemusic",
    "yuuna_",
    "aelyna",
    "dealjb",
    "raisain",
    "killystia",
    "scoot1994",
    "legrotv",
    "viggy_night",
    "cyteui",
    "w_endy",
    "abaraiitv",
    "elia_ssf",
    "mrsal_59",
    "samiaalpha",
    "kylio0o",
    "bagitv_",
    "ap_r0se",

    "kameto",
    "ponce",
    "sardoche",
    "nikof",
  ],
};

const client = new tmi.Client(options);

client.connect();

function loadMessagesFromFile(channel) {
  try {
    const channelNameWithoutHash = channel.replace(/^#/, ''); // Supprime le "#" au début du nom du canal
    const fileName = `./data/${channelNameWithoutHash}.json`;
    const data = fs.readFileSync(fileName, "utf8");
    return JSON.parse(data);
  } catch (err) {
    if (err.code === "ENOENT") {
      console.log(`Fichier ${channel} introuvable. Création d'un nouveau fichier.`);
      return [];
    } else {
      console.error(`Erreur lors de la lecture du fichier ${channel}.json:`, err);
      return [];
    }
  }
}

function addMessageToStorage(channel, message) {
  let messages = loadMessagesFromFile(channel);

  const newMessage = {
    date: new Date().toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }),
    time: new Date().toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }),
    username: message.username,
    message: message.message,
    isMod: message.isMod || false, // Ajoute l'information du modérateur
    isVIP: message.isVIP || false, // Ajoute l'information du VIP
  };

  messages.push(newMessage);

  try {
    const channelNameWithoutHash = channel.replace(/^#/, ''); // Supprime le "#" au début du nom du canal
    const fileName = `./data/${channelNameWithoutHash}.json`;
    fs.writeFileSync(fileName, JSON.stringify(messages, null, 2));
  } catch (err) {
    console.error(`Erreur lors de l'écriture dans le fichier ${channel}.json:`, err);
  }
}

client.on("message", (channel, user, message, self) => {
  // Vérifiez si l'utilisateur est modérateur
  const isMod = user.mod || user['user-type'] === 'mod';
  
  // Vérifiez si l'utilisateur est VIP
  const isVIP = user.badges && 'vip' in user.badges;

  console.log(`User Info: ${JSON.stringify(user)}`); // Affiche les informations sur l'utilisateur

  addMessageToStorage(channel, {
    username: user.username,
    message,
    isMod, // Ajoute l'information du modérateur
    isVIP, // Ajoute l'information du VIP
  });
});

client.on("error", (err) => {
  console.error("Erreur Twitch:", err);
});
