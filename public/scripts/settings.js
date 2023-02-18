const booruUrls = ["rule34.xxx", "hypnohub.net", "safebooru.org", "realbooru.com", "xbooru.com", "gelbooru.com"]
const spoofUrl = "https://twitter.com"
const spoofKeycode = 45 // NumPad Insert/0
const toggleSpoofKeycode = 46 // NumPad Del/.

let settings = {
  sourse: "rule34",
  quality: "Sample",
  spoofToggle: true
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

function setSpoof(value) {
  document.getElementById("spoofText").outerHTML = '<p class="spoofText" id="spoofText" enabled="' + value + '"></p>'
  settings.spoofToggle = value;
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
  } else if (e.keyCode === toggleSpoofKeycode) {
    setSpoof(!settings.spoofToggle)
  } else if (e.keyCode == spoofKeycode && !(document.activeElement.id === "tags")) { // e.keyCode == 32 ||
    hideScreen()
  } else {
    resetTimeout()
  }
});

addEvent(document, "keyup", (e) => {
  if (e.keyCode === 17) {
    controlKeyPressed = false
  }
});

addEvent(window, "click", resetTimeout);

// Sneaky Timeout so you dont get caught
let activeTimeout = setTimeout(hideScreen, 60000);
function hideScreen() {
  if (!settings.spoofToggle) return;
  document.body.style = "display: none"
  window.location.replace(spoofUrl);
}

function resetTimeout(){
  clearTimeout(activeTimeout);
  activeTimeout = setTimeout(hideScreen, 240000);
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

document.getElementById("spoofText").outerHTML = '<p class="spoofText" id="spoofText" enabled="' + settings.spoofToggle + '"></p>'