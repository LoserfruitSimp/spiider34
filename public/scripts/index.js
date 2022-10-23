const enter = 13;

var qualitySetting = document.getElementById("qualitysetting");
var typeSetting = document.getElementById("typesetting");
var qualityCombo = document.getElementById("quality");
var typeCombo = document.getElementById("type");
var search = document.getElementById("search");

addEvent(typeSwitch, "change", updateCite);
addEvent(qualitySwitch, "change", updateQuality);

function updateCite(e) {
  if (e.srcElement.checked) {
    setSourse("hypnohub");
  } else {
    setSourse("Rule34");
  }
  typeSetting.innerHTML = "Sourse: " + data.sourse;
}

function updateQuality(e) {
  if (e.srcElement.checked) {
    setQuality("Full");
  } else {
    setQuality("Sample");
  }
  qualitySetting.innerHTML = "Quality: " + data.quality;
}

function findChild(element, child) {
  let res = "";
  for (var i = 0; i < element.children.length; i++) {
    if (element.children[i].value === child) {
      res = child;
    }
  }
  return res;
}

typeSetting.innerHTML = "Sourse: " + data.sourse;
qualitySetting.innerHTML = "Quality: " + data.quality;

if (data.sourse === "hypnohub") {
  typeSwitch.checked = true;
}

findChild(qualityCombo, data.quality).setAttribute(name, value)

