const leftArrow = 37;
const rightArrow = 39;
const enter = 13;
const m = 77;

const tags = document.baseURI.substring(42).replaceAll("%20", " ");
const cite = document.baseURI.substring(30).slice(0, 6);

var tagData = [];
var idx = 0;

const toggle = {
  true: "visibility: visible;",
  false: "visibility: hidden;",
};
var active = false;

document.getElementById("tags").innerHTML = tags;
document.getElementById("search").value = tags;

// Sets the tag
fetch(`https://spiider34.glitch.me/posts/${cite}?tags=${tags}`)
  .then((response) => response.json())
  .then((data) => {
    tagData = data;
    idx = 0;

    if (tagData.length === 0) {
      var image = document.getElementById("img");
      image.src = "https://cdn-icons-png.flaticon.com/512/103/103085.png";
      return;
    }

    setActiveImg(tagData[idx]);

    var gallery = document.getElementsByClassName("gallery")[0];
    gallery.innerHTML = "";

    for (var i = 0; i < tagData.length; i++) {
      const figure = document.createElement("figure");
      const img = document.createElement("img");

      img.class = "galleryItem";
      img.src = tagData[i].preview_url;
      img.onclick = function () {
        click(img);
      };
      img.id = i;

      figure.appendChild(img);
      gallery.appendChild(figure);
    }
  });

addEvent(document, "keydown", function (e) {
  e = e || window.event;

  if (e.keyCode === enter) {
    if (document.activeElement.id === "search") {
      window.location.replace(
        `https://spiider34.glitch.me/p/${cite}?tags=${
          document.getElementById("search").value
        }`
      );
    }
  } else if (e.keyCode === leftArrow) {
    if (idx > 0) {
      idx = idx - 1;
      setActiveImg(tagData[idx]);
    }
  } else if (e.keyCode === rightArrow) {
    if (idx <= tagData.length + 1) {
      idx = idx + 1;
      setActiveImg(tagData[idx]);
    }
  } else if (e.keyCode === m) {
    if (document.activeElement.id !== "search") {
      active = !active;
      document.getElementsByClassName("gallery")[0].style = toggle[active];
    }
  }
});

function click(img) {
  idx = Number(img.id);
  setActiveImg(tagData[idx]);
}

function setActiveImg(data) {
  var image = document.getElementById("img");
  var tagsText = document.getElementById("curTags");
  var authorText = document.getElementById("author");
  var sourseText = document.getElementById("sourse");
  var dateText = document.getElementById("uploaded");

  tagsText.innerHTML = data.tags.join(" ");
  authorText.innerHTML = data.creator_url;
  sourseText.innerHTML = data.source;
  dateText.innerHTML = data.created_at;

  image.src = data.file_url;
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
