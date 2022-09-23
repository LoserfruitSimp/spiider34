const [leftArrow, rightArrow, enter, m] = [37, 39, 13, 77];

const tags = document.baseURI.substring(42).replaceAll("%20", " ");
const cite = document.baseURI.substring(30).slice(0, 6);
const toggle = { true: "visibility: visible;", false: "visibility: hidden;" };

var gallery = document.getElementsByClassName("gallery")[0];
var authorText = document.getElementById("author");
var sourseText = document.getElementById("sourse");
var dateText = document.getElementById("uploaded");
var tagsText = document.getElementById("curTags");
var tagsElement = document.getElementById("tags");
var search = document.getElementById("search");
var image = document.getElementById("img");

var active = false;
var tagData = [];
var idx = 0;

tagsElement.innerHTML = tags;
search.value = tags;

fetch(`https://spiider34.glitch.me/posts/${cite}?tags=${tags}`)
  .then((response) => response.json())
  .then((data) => {
    tagData = data;
    idx = 0;

    if (tagData.length === 0) {
      image.src = "https://cdn-icons-png.flaticon.com/512/103/103085.png";
      return;
    }

    setActivePost(tagData[idx]);
    gallery.innerHTML = "";

    for (var i = 0; i < tagData.length; i++) {
      const figure = document.createElement("figure");
      const img = document.createElement("img");
      
      img.classList.add("galleryItem");
      img.src = tagData[i].preview_url;
      img.onclick = function () { click(img) };
      img.id = i;
      
      figure.classList.add("hover")
      figure.appendChild(img);
      gallery.appendChild(figure);
    }
  });

addEvent(document, "keydown", function (e) {
  e = e || window.event;

  switch (e.keyCode) {
    case leftArrow:
      if (idx > 0 && !checkSearchActive()) {
        idx = idx - 1;
        setActivePost(tagData[idx]);
      }
      break;
    case rightArrow:
      if (idx <= (tagData.length + 1) && !checkSearchActive()){
        idx = idx + 1;
        setActivePost(tagData[idx]);
      }
      break;
    case m:
      if (!checkSearchActive()) {
        active = !active;
        gallery.style = toggle[active];
      }
      break;
    case enter:
       window.location.replace(`https://spiider34.glitch.me/p/${cite}?tags=${search.value}`);
      break;
  }
});
         
function click(img) {
  idx = Number(img.id);
  setActivePost(tagData[idx]);
}

function setActivePost(data) {
  tagsText.innerHTML = data.tags.join(" ");
  authorText.innerHTML = data.creator_url;
  sourseText.innerHTML = data.source;
  dateText.innerHTML = data.created_at;
  image.src = data.file_url;
}

function checkSearchActive() {
  if (document.activeElement.id === "search") {
    return true
  } else {
    return false
  }
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