const enter = 13;

var qualitySetting = document.getElementById("qualitysetting")
var typeSetting = document.getElementById("typesetting")
var qualitySwitch = document.getElementById("quality")
var typeSwitch = document.getElementById("type")
var search = document.getElementById("search")

var cite = "rule34";
var quality = "full";


addEvent(document, "keydown", function (e) {
  e = e || window.event;

  if (e.keyCode === enter) {
    var cite = "rule34";
    var quality = "full"
    
    if (typeSwitch.checked) {
      cite = "hypnoh";
    }
  
    if (document.activeElement.id === "search") {
      window.location.replace(
        `https://spiider34.glitch.me/p/${cite}?tags=${
          search.value
        }`
      );
    }
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
