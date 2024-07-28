var qualitySetting = document.getElementById("qualitysetting");
var typeSetting = document.getElementById("typesetting");
var qualityCombo = document.getElementById("quality");
var typeCombo = document.getElementById("type");

addEvent(typeCombo, "change", updateCite);
addEvent(qualityCombo, "change", updateQuality);

function updateCite(e) {
  setSource(e.srcElement.value);
  typeSetting.innerHTML = "Source: " + settings.source;
}

function updateQuality(e) {
  setQuality(e.srcElement.value);
  qualitySetting.innerHTML = "Quality: " + settings.quality;
}

function setSelected(element, child) {
  for (var i = 0; i < element.children.length; i++) {
    if (element.children[i].value === child) {
      element.children[i].setAttribute("selected", null);
    }
  }
}

typeSetting.innerHTML = "Source: " + settings.source;
qualitySetting.innerHTML = "Quality: " + settings.quality;

setSelected(qualityCombo, settings.quality);
setSelected(typeCombo, settings.source);
