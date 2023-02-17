const booruUrls = ["rule34.xxx", "hypnohub.net", "safebooru.org", "realbooru.com", "xbooru.com", "gelbooru.com"]
const spoofUrl = "https://twitter.com"
const spoofKeycode = 45 // NumPad Insert/0

let settings = {
  sourse: "rule34",
  quality: "Sample"
}


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

var controlKeyPressed = false
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

// Sneaky Timeout so you dont get caught
let activeTimeout = setTimeout(hideScreen, 60000);
function hideScreen() {
  document.body.style = "display: none"
  window.location.replace(spoofUrl);
}

function resetTimeout(){
  clearTimeout(activeTimeout);
  activeTimeout = setTimeout(hideScreen, 240000);
}

addEvent(window, "click", resetTimeout);
addEvent(document, "keydown", function (e) {
  if (e.keyCode == spoofKeycode && !(document.activeElement.id === "tags")) { // e.keyCode == 32 ||
    hideScreen()
  } else {
    resetTimeout()
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