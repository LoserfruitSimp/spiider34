var qualitySetting = document.getElementById("qualitysetting");
var typeSetting = document.getElementById("typesetting");
var qualityCombo = document.getElementById("quality");
var proxyCombo = document.getElementById("proxy");
var typeCombo = document.getElementById("type");

addEvent(typeCombo, "change", updateCite);
addEvent(qualityCombo, "change", updateQuality);
addEvent(proxyCombo, "change", updateProxy);

function updateCite(e) {
  setSourse(e.srcElement.value);
  typeSetting.innerHTML = "Sourse: " + settings.sourse;
}

function updateQuality(e) {
  setQuality(e.srcElement.value);
  qualitySetting.innerHTML = "Quality: " + settings.quality;
}

function updateProxy(e) {
  setProxy(e.srcElement.value);
}

function setSelected(element, child) {
  for (var i = 0; i < element.children.length; i++) {
    if (element.children[i].value === child) {
      element.children[i].setAttribute("selected", null);
    }
  }
}

typeSetting.innerHTML = "Sourse: " + settings.sourse;
qualitySetting.innerHTML = "Quality: " + settings.quality;

setSelected(qualityCombo, settings.quality);
setSelected(typeCombo, settings.sourse);
setSelected(proxyCombo, settings.proxy);