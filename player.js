// Class definition for Player
function moveOn() {
  document.getElementById(
    "options-container"
  ).innerHTML = `<select class="form-control" id="player-select">
    <option value="none"> --Choose Player Amount -- </option>
    <option value="1">1 </option>
    <option value="2"> 2 </option>
    <option value="3"> 3 </option>
    <option value="4"> 4 </option>
    </select>
    <button type="button" onclick="addPlayer()"> Players </button>`;
}
class Player {
  constructor(name, id, scores = []) {
    this.name = name;
    this.id = id;
    this.scores = scores;
  }
}

// Function to add a new player
function addPlayer() {
  const playerAmount = document.getElementById("player-select").value;
  console.log(playerAmount);
  if (playerAmount == 1) {
    document.getElementById("options-container").innerHTML = "";
    console.log("one");
    document.getElementById(
      "nameInputHere"
    ).innerHTML += `<input id="playerOneName" type="text" placeholder="player one name" />`;

    let name = document.getElementById("playerOneName");
    name.addEventListener("keydown", (e) => {
      if (e.key == "Enter") {
        let playerOne = "";
        playerOne = `<th colspan='2'> ${name.value} </th>`;
        document.getElementById("playerOne").innerHTML +=
          playerOne +
          "<td colspan='1'> <input class='w-2 p-0' type='text' placeholder='score' /> </td>";
        document.getElementById("nameInputHere").innerHTML = "";
      }
    });
  } else if (playerAmount == 2) {
    console.log("one");
    console.log("two");
  }
}
