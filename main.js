// Global variables
var courses;
var teeBoxes;
var golfCourseId;
let yards = [];
let par = [];
var parSum;
var sum;
var sum2;
var pullTeeBoxesIndex;
var playerScore = [];
var scoreSum;
var scoreTwo;

// Function to get available golf courses
function getAvailableGolfCourses() {
  return fetch(
    "https://exquisite-pastelito-9d4dd1.netlify.app/golfapi/courses.json"
  ).then(function (response) {
    return response.json();
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
function scoreboardHoleInfo() {
  const selectedCourseId = localStorage.getItem("selectedCourseId");
  const selectedTeeBoxIndex = localStorage.getItem("selectedTeeBoxIndex");
  getAvailableGolfCourses().then((result) => {
    courses = result;
    let courseOptionsHtml = "";

    courses.forEach((course) => {
      courseOptionsHtml += `<option value="${course.id}">${course.name}</option>`;
    });

    document.getElementById("course-select").innerHTML =
      '<option value="choose"> --Choose Your Course-- </option>' +
      courseOptionsHtml;
    golfCourseId = courses.id;
  });

  const courseSelect = document.getElementById("course-select");
  courseSelect.addEventListener("click", function () {
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
      let i = 8;
      while ((i >= 8, i < 17)) {
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

      document.getElementById("tee-box-select").innerHTML =
        '<option value="none"> --Choose your Tee -- </option>' +
        teeBoxSelectHtml;
      // Yardage and Par for each on scoreboard
      const teeBoxDetail = document.getElementById("tee-box-select");

      teeBoxDetail.addEventListener("change", (e) => {
        let teeboxIndex = teeBoxDetail.value;
        //YARDS
        let frontYards = "";
        let i = -1;
        sum = 0;
        while (i < 8) {
          i++;
          let individualHoles = courseDetails.holes[i];
          let pullTeeBoxesIndex = individualHoles.teeBoxes[teeboxIndex];
          yards.push(pullTeeBoxesIndex.yards);
          frontYards += `<td> ${yards[i]} </td>`;
          sum += yards[i];
        }
        console.log(sum);
        let backYards = "";
        let b = 8;
        sum2 = 0;
        while ((b >= 8, b < 17)) {
          b++;
          let individualHoles = courseDetails.holes[b];
          let pullTeeBoxesIndex = individualHoles.teeBoxes[teeboxIndex];
          yards.push(pullTeeBoxesIndex.yards);
          backYards += `<td> ${yards[i]} </td>`;
          sum2 += yards[b];
        }

        document.getElementById("yardage").innerHTML =
          "<th colspan='2'> Yardage </th>" + frontYards + `<td> ${sum} </td>`;
        document.getElementById("backYardage").innerHTML =
          "<th colspan='2'> Yardage </th>" +
          backYards +
          `<td> ${sum + sum2} </td>`;

        //Par
        let frontPar = "";
        let a = -1;
        parSum = 0;
        while (a < 8) {
          a++;
          let individualHoles = courseDetails.holes[a];
          let pullTeeBoxesIndex = individualHoles.teeBoxes[teeboxIndex];
          par.push(pullTeeBoxesIndex.par);
          frontPar += `<td> ${par[a]} </td>`;
          parSum += par[a];
        }
        console.log(parSum);
        let backPar = "";
        let c = 8;
        parSum2 = 0;
        while ((c >= 8, c < 17)) {
          c++;
          let individualHoles = courseDetails.holes[c];
          let pullTeeBoxesIndex = individualHoles.teeBoxes[teeboxIndex];
          par.push(pullTeeBoxesIndex.par);

          backPar += `<td> ${par[c]} </td>`;
          parSum2 += par[c];
        }
        document.getElementById("parFront").innerHTML =
          "<th colspan='2'> Par </th>" + frontPar + `<td> ${parSum} </td>`;
        document.getElementById("parBack").innerHTML =
          "<th colspan='2'> Par </th>" +
          backPar +
          `<td> ${parSum + parSum2} </td>`;
      });
    });
  });
}
function renderPlayers() {
  var scoreCardBodyElement = document.getElementById("scorecardBody");
  var html = "";
  let holeScore = "";
  // remove player scores
  Array.from(
    scoreCardBodyElement.querySelectorAll('[data-row-type="playerScore"]')
  ).forEach((el) => el.remove());

  // add player scores
  playerScore.forEach((player) => {
    let i = 0;
    while (i < 9) {
      i++;

      holeScore += `<td> ${player.scores[i]}</td> `;
      scoreSum += player.scores[i];
      console.log(scoreSum);
    }
    html += `<tr data-row-type="playerScore" class="playerRow" data-playerId="${player.id}"> <th colspan='2'>${player.name} </th>${holeScore} </tr>`;
  });
  // add html
  document
    .getElementById("scorecardBody")
    .insertAdjacentHTML("beforeend", html);
}
// Initial function call
scoreboardHoleInfo();
function save() {
  console.log("going to save");
  document.getElementById("form-group").innerHTML = "";
}

// TODO: local storage
