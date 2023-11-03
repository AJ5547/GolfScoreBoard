// Class definition for Player

class Player {
  constructor(name, id = getId(), scores = Array(18).fill(2)) {
    this.name = name;
    this.id = id;
    this.scores = scores;
  }
}

// Function to add a new player
function addPlayer() {
  const playerName = document.getElementById("playerName").value;
  const newPlayer = new Player(playerName);
  playerScore.push(newPlayer);
  console.log(playerScore);
  renderPlayers();
}

function getId() {
  return Math.floor(Math.random() * Date.now());
}
