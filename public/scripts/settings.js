let settings = {
  sourse: "Rule34",
  quality: "Sample"
}

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

function addEvent(element, eventName, callback) {
  if (element.addEventListener) {
    element.addEventListener(eventName, callback, false);
  } else if (element.attachEvent) {
    element.attachEvent("on" + eventName, callback);
  } else {
    element["on" + eventName] = callback;
  }
}