const [leftArrow, rightArrow, enter, m] = [37, 39, 13, 77];

const tagsQ = window.location.href
  .slice(window.location.href.indexOf("?") + 1)
  .split("&")[0]
  .substring(5)
  .replaceAll("%20", " ");
const toggle = { true: "display: grid;", false: "display: none;" };

var gallery = document.getElementsByClassName("gallery")[0];
var authorText = document.getElementById("author");
var sourseText = document.getElementById("sourse");
var dateText = document.getElementById("uploaded");
var tagsText = document.getElementById("curTags");
var tagsElement = document.getElementById("tagsH");
var search = document.getElementById("search");
var video = document.getElementById("video");
var image = document.getElementById("img");
var home = document.getElementById("home");
var tags = document.getElementById("tags");

var active = false;
var tagData = [];
var idx = 0;

tagsElement.innerHTML = tagsQ;
tags.value = tagsQ;

fetch(
  `https://spiider34.glitch.me/posts?tags=${tagsQ}&sourse=${settings.sourse}&pid=0`
)
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
      img.onclick = function () {
        click(img);
      };
      img.id = i;

      figure.classList.add("hover");
      figure.appendChild(img);
      gallery.appendChild(figure);

      testImage(img);
    }
  });

addEvent(window, "click", function (e) {
  e = e || window.event;
  if (document.activeElement.id === "") {
    if (
      e.screenX > window.screen.width / 2 &&
      e.screenY < (window.screen.height / 3) * 2
    ) {
      if (idx <= tagData.length + 1) {
        idx = idx + 1;
        setActivePost(tagData[idx]);
      }
    } else {
      if (idx > 0) {
        idx = idx - 1;
        setActivePost(tagData[idx]);
      }
    }
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
      if (idx <= tagData.length + 1 && !checkSearchActive()) {
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
  }
});

addEvent(home, "click", function (e) {
  window.location.replace(`https://spiider34.glitch.me`);
});

function click(img) {
  idx = Number(img.id);
  setActivePost(tagData[idx]);

  active = !active;
  gallery.style = toggle[active];
}

function setActivePost(data) {
  tagsText.innerHTML = data.tags.join(" ");
  authorText.innerHTML = data.creator_url;
  sourseText.innerHTML = data.source;
  dateText.innerHTML = data.created_at;

  let activeMedia = image;
  if (data.type === "video") {
    activeMedia = video;
    image.style = "display: none;";
    video.style = "";
  } else {
    activeMedia = image;

    video.style = "display: none;";
    image.style = "";
    video.src = "";
  }
  if (settings.quality === "Full") {
    activeMedia.src = data.file_url;
  } else {
    fetch(data.sample_url).then((response) => {
      const dataType = response.headers.get("Content-Type");
      if (dataType.includes("image") || dataType.includes("video")) {
        activeMedia.src = data.sample_url;
      } else {
        activeMedia.src = data.file_url;
      }
    });
  }
}

function checkSearchActive() {
  if (document.activeElement.id === "tags") {
    return true;
  } else {
    return false;
  }
}

function testImage(img) {
  var tester = new Image();
  tester.onerror = function () {
    img.parentElement.remove();
  };
  tester.src = img.src;
}
