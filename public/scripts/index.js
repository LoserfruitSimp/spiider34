const enter = 13;

addEvent(document, "keydown", function (e) {
  e = e || window.event;

  if (e.keyCode === enter) {
    var cite = "rule34";
    if (document.getElementById("type").checked) {
      cite = "hypnoh";
    }

    if (document.activeElement.id === "search") {
      window.location.replace(
        `https://spiider34.glitch.me/p/${cite}?tags=${
          document.getElementById("search").value
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
