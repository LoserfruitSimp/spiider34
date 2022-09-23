let data = {
  sourse: "Rule34",
  quality: "Sample"
}

if (localStorage.getItem("settings") === null) {
  setData();
} else {
  data = getData();
}

function setSourse(sourse) {
  data.sourse = sourse;
  setData();
}

function setQuality(quality) {
  data.quality = quality;
  setData();
}

function getData() {
    return JSON.parse(localStorage.getItem("settings"));
}

function setData() {
    localStorage.setItem("settings", JSON.stringify(data));
}