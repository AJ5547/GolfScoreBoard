async function getAvailableCourses() {
  const url =
    "https://exquisite-pastelito-9d4dd1.netlify.app/golfapi/courses.json";
  const response = await fetch(url);
  const course = await response.json();
    console.log(course);
  return course;
}
function getGolfCourseDetails(golfCourseId) {
  return fetch(
    `https://exquisite-pastelito-9d4dd1.netlify.app/golfapi/course${golfCourseId}.json`,
    { mode: "no-cors" }
  ).then(function (response) {
    console.log(response.json)
    return response.json();
  });
}
getAvailableCourses();
getGolfCourseDetails();
let courseOptionsHtml = "";
courses.forEach((course) => {
  courseOptionsHtml += `<option value="${course.id}">${course.name}</option>`;
});

document.getElementById("course-select").innerHTML = courseOptionsHtml;

let teeBoxSelectHtml = "";
teeBoxes.forEach(function (teeBox, index) {
  teeBoxSelectHtml += `<option value="${index}">${teeBox.teeType.toUpperCase()}, ${
    teeBox.totalYards
  } yards</option>`;
});
document.getElementById("tee-box-select").innerHTML = teeBoxSelectHtml;

class Player {
  constructor(name, id = getNextId(), scores = []) {
    this.name = name;
    this.id = id;
    this.scores = scores;
  }
}
function getNextId() {
  const uniqueId = Math.random().toString(36).substr(2, 9);
  console.log(uniqueId);
  return uniqueId;
}
