const enter = 13;

var qualitySetting = document.getElementById("qualitysetting")
var typeSetting = document.getElementById("typesetting")
var qualitySwitch = document.getElementById("quality")
var typeSwitch = document.getElementById("type")
var search = document.getElementById("search")

addEvent(typeSwitch, "change", updateCite)
addEvent(qualitySwitch, "change", updateQuality)

addEvent(document, "keydown", function (e) {
  e = e || window.event;

  if (e.keyCode === enter) {
    if (document.activeElement.id === "search") {
      window.location.replace(
        `https://spiider34.glitch.me/p/${data.sourse}/${quality}?tags=${
          search.value
        }`
      );
    }
  }
});

function updateCite(e) { 
  if (e.srcElement.checked) { cite = "hypnoh" } else { cite = "rule34" } 
  typeSetting.innerHTML = 'Sourse: ' + cite 
}

function updateQuality(e) { 
  if (e.srcElement.checked) { quality = "full" } else { quality = "samp" } 
  qualitySetting.innerHTML = 'Quality: ' + quality 
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
