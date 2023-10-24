var courses;
var teeBoxes;
function getAvailableGolfCourses() {
  return fetch(
    "https://exquisite-pastelito-9d4dd1.netlify.app/golfapi/courses.json"
  ).then(function (response) {
    return response.json();
  });
}

function playersName(){
    let numberOfPlayers = document.getElementById("playerCount").value;
    let nameInput = '';
    console.log(numberOfPlayers);
    if(numberOfPlayers == 1){
        console.log("one player");
    }
}
function getGolfCourseDetails(golfCourseId) {
  return fetch(
    `https://exquisite-pastelito-9d4dd1.netlify.app/golfapi/course${golfCourseId}.json`
  ).then(function (response) {
    return response.json();
  });
}

function load() {
  getAvailableGolfCourses().then((result) => {
    courses = result;

    
    console.log(courses);
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
      let hole = courseDetails.holes;
      teeBoxes = hole[0].teeBoxes;
      console.log(teeBoxes)
      let teeBoxSelectHtml = "";
      teeBoxes.forEach((teeBox, index) => {
        teeBoxSelectHtml += `<option value="${index}">${teeBox.teeType.toUpperCase()}, ${
          teeBox.yards
        } yards</option>`;
      });
      document.getElementById("tee-box-select").innerHTML = teeBoxSelectHtml;
      
    });
   
  });
}
load();

//TODO: local sotage

