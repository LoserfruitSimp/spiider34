const enter = 13;

var qualitySetting = document.getElementById("qualitysetting");
var typeSetting = document.getElementById("typesetting");
var qualityCombo = document.getElementById("quality");
var typeCombo = document.getElementById("type");
var search = document.getElementById("search");

addEvent(typeCombo, "change", updateCite);
addEvent(qualityCombo, "change", updateQuality);

function updateCite(e) {
  setSourse(e.srcElement.value);
  typeSetting.innerHTML = "Sourse: " + data.sourse;
}

function updateQuality(e) {
  setQuality(e.srcElement.value);
  qualitySetting.innerHTML = "Quality: " + data.quality;
}

function setSelected(element, child) {
  for (var i = 0; i < element.children.length; i++) {
    if (element.children[i].value === child) {
      element.children[i].setAttribute("selected", null);
    }
  }
}

typeSetting.innerHTML = "Sourse: " + data.sourse;
qualitySetting.innerHTML = "Quality: " + data.quality;

setSelected(qualityCombo, data.quality);
setSelected(typeCombo, data.sourse);
