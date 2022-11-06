let settings = {
  sourse: "rule34",
  quality: "Sample"
}

var controlKeyPressed = false

const hostURL = window.location.host

if (localStorage.getItem("settings") === null) {
  setSettings();
} else {
  settings = getSettings();
}

function setSourse(sourse) {
  settings.sourse = sourse;
  setSettings();
}

function setQuality(quality) {
  settings.quality = quality;
  setSettings();
}

function getSettings() {
    return JSON.parse(localStorage.getItem("settings"));
}

function setSettings() {
    localStorage.setItem("settings", JSON.stringify(settings));
}

addEvent(document, "keydown", (e) => {
  if (e.keyCode === 17) {
    controlKeyPressed = true
  }
});

addEvent(document, "keyup", (e) => {
  if (e.keyCode === 17) {
    controlKeyPressed = false
  }
});

function addEvent(element, eventName, callback) {
  if (element.addEventListener) {
    element.addEventListener(eventName, callback, false);
  } else if (element.attachEvent) {
    element.attachEvent("on" + eventName, callback);
  } else {
    element["on" + eventName] = callback;
  }
}