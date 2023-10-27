// Global variables
var courses;
var teeBoxes;
var golfCourseId;
var yards;
var par;
var totalYards;
var pullTeeBoxesIndex;
var yardsArray = [];
function start() {
  // let courseSelector = "";
  // courseSelector = `<div class="form-group">
  // <label for="course-select">Select Course</label>
  // <select class="form-control" id="course-select">
  // </select>
  // <select class="w-60 mt-3 form-control" id="tee-box-select"></select>
  // <button class="w-25"onclick="save(), moveOn()">Move On</button>`
  // document.getElementById("options-container").innerHTML = courseSelector;
  // scoreboardHoleInfo();
  // document.getElementById("startButton").innerHTML = " ";
  // document.getElementById("rulesAndInstructions").innerHTML = " ";
}

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

        while (i < 8) {
          i++;
          let individualHoles = courseDetails.holes[i];
          let pullTeeBoxesIndex = individualHoles.teeBoxes[teeboxIndex];
          yards = pullTeeBoxesIndex.yards;
          frontYards += `<td> ${yards} </td>`;
        }
        let backYards = "";
        let totalYards = "";
        let b = 8;
        while ((b >= 8, b < 17)) {
          b++;
          let individualHoles = courseDetails.holes[b];
          let pullTeeBoxesIndex = individualHoles.teeBoxes[teeboxIndex];
          yards = pullTeeBoxesIndex.yards;
          backYards += `<td> ${yards} </td>`;
          total = `<td> ${totalYards} </td>`;
        }
        document.getElementById("yardage").innerHTML =
          "<th colspan='2'> Yardage </th>" + frontYards;
        document.getElementById("backYardage").innerHTML =
          "<th colspan='2'> Yardage </th>" + backYards;

        //Par
        let frontPar = "";
        let a = -1;

        while (a < 8) {
          a++;
          let individualHoles = courseDetails.holes[a];
          let pullTeeBoxesIndex = individualHoles.teeBoxes[teeboxIndex];
          par = pullTeeBoxesIndex.par;
          frontPar += `<td> ${par} </td>`;
        }
        let backPar = "";
        let c = 8;
        while ((c >= 8, c < 17)) {
          c++;
          let individualHoles = courseDetails.holes[c];
          let pullTeeBoxesIndex = individualHoles.teeBoxes[teeboxIndex];
          par = pullTeeBoxesIndex.par;

          backPar += `<td> ${par} </td>`;
        }
        document.getElementById("parFront").innerHTML =
          "<th colspan='2'> Par </th>" + frontPar;
        document.getElementById("parBack").innerHTML =
          "<th colspan='2'> Par </th>" + backPar;
      });
    });
  });
}

// Initial function call
scoreboardHoleInfo();
function save() {
  console.log("going to save");
}

// TODO: local storage
