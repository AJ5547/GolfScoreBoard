// Global variables
var courses;
var teeBoxes;
var golfCourseId;
let holeInfo;

// Function to get available golf courses
function getAvailableGolfCourses() {
  return fetch(
    "https://exquisite-pastelito-9d4dd1.netlify.app/golfapi/courses.json"
  ).then(function (response) {
    return response.json();
  });
}

// Class definition for Player
class Player {
  constructor(name, id, scores = []) {
    this.name = name;
    this.id = id;
    this.scores = scores;
  }
}

// Function to add a new player
function addPlayer() {
  let nameInput = document.createElement("input");
  nameInput.id = "playerName";
  nameInput.type = "text";
  nameInput.className = "w-25";
  nameInput.placeholder = "your name";
  document.getElementById("nameInputHere").appendChild(nameInput);

  nameInput.addEventListener("keydown", (e) => {
    if (e.key == "Enter") {
      const uniqueId = new Date().getTime().toString();
      let playerName = nameInput.value;
      console.log(playerName);
      document.getElementById("nameInputHere").innerHTML = " ";

      var newPlayer = new Player(playerName, uniqueId);
      console.log(newPlayer);

      let nextPlayer = "";
      nextPlayer += `<tr> <th colspan="2" id="${uniqueId}">${playerName}</th> <td> 0<td> </tr>`;
      document.getElementById("scorecardBody").innerHTML += nextPlayer;

      document.getElementById("scorecardBodyBack").innerHTML += nextPlayer;
    }
  });
}

// Function to get golf course details
function getGolfCourseDetails(golfCourseId) {
  return fetch(
    `https://exquisite-pastelito-9d4dd1.netlify.app/golfapi/course${golfCourseId}.json`
  ).then(function (response) {
    return response.json();
  });
}

// Function to load golf course data and populate the UI
function load() {
  getAvailableGolfCourses().then((result) => {
    courses = result;
    let courseOptionsHtml = "";

    courses.forEach((course) => {
      courseOptionsHtml += `<option value="${course.id}">${course.name}</option>`;
    });

    document.getElementById("course-select").innerHTML = courseOptionsHtml;
    golfCourseId = courses.id;
  });

  const courseSelect = document.getElementById("course-select");
  courseSelect.addEventListener("change", function () {
    const selectedCourseId = courseSelect.value;

    getGolfCourseDetails(selectedCourseId).then((courseDetails) => {
      // Show Holes on Scorecard
      let hole = courseDetails.holes;
      let holes = "";

      console.log(hole);
      for (let i = 0; i < 9; i++) {
        if (hole[i]) {
          holes += `<th>${hole[i].hole}</th>`;
        }
      }
      let secondHoles = "";
      secondYards = "";
      let i = 7;
      while ((i > 8, i < 17)) {
        i++;
        secondHoles += `<th>${hole[i].hole}</th>`;
      }

      document.getElementById("firstNumbers").innerHTML =
        `<th colspan="2">Hole</th>` + holes + `<th> Out </th>`;
      document.getElementById("secondNumbers").innerHTML =
        `<th colspan="2"> Hole </th>` + secondHoles + `<th> Total </th>`;

      // Teeboxes input
      teeBoxes = hole[0].teeBoxes;

      let teeBoxSelectHtml = "";

      teeBoxes.forEach((teeBox, index) => {
        teeBoxSelectHtml += `<option id="${
          teeBox.teeTypeId
        }" value="${index}">${teeBox.teeType.toUpperCase()}</option>`;
      });

      document.getElementById("tee-box-select").innerHTML = teeBoxSelectHtml;

      // Yardage and Par for each on scoreboard
    });
  });
}

// Initial function call
load();

// TODO: local storage
// 391 yards American Fork index=0, 521 index=1
