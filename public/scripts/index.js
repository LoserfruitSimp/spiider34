const enter = 13;

var qualitySetting = document.getElementById("qualitysetting")
var typeSetting = document.getElementById("typesetting")
var qualitySwitch = document.getElementById("quality")
var typeSwitch = document.getElementById("type")
var search = document.getElementById("search")

addEvent(typeSwitch, "change", updateCite)
addEvent(qualitySwitch, "change", updateQuality)

function updateCite(e) { 
  if (e.srcElement.checked) { setSourse("hypnohub") } else { setSourse("Rule34") } 
  typeSetting.innerHTML = 'Sourse: ' + data.sourse 
}

function updateQuality(e) { 
  if (e.srcElement.checked) { setQuality("Full") } else { setQuality("Sample") } 
  qualitySetting.innerHTML = 'Quality: ' + data.quality 
}

typeSetting.innerHTML = 'Sourse: ' + data.sourse 
qualitySetting.innerHTML = 'Quality: ' + data.quality 