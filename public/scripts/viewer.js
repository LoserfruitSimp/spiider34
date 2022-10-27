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
var totalPages = 0;
var tagData = [];
var idx = 0;

tagsElement.innerHTML = tagsQ;
tags.value = tagsQ;

getData(tagsQ, 0)

addEvent(document, "keydown", function (e) {
  e = e || window.event;

  switch (e.keyCode) {
    case leftArrow:
      prevImage();
      break;
    case rightArrow:
      nextImage();
      break;
    case m:
      if (!checkSearchActive()) {
        active = !active;
        gallery.style = toggle[active];
      }
      break;
  }
});

addEvent(window, "click", function (e) {
  e = e || window.event;
  if (document.activeElement.id === "" && e.screenY < (window.screen.height / 3) * 2) {
    if (e.x > window.screen.width / 2) {
      nextImage();
    } else {
      prevImage();
    }
  }
});

addEvent(home, "click", function (e) {
  window.location.replace(`https://${hostURL}`);
});

function click(img) {
  idx = Number(img.id);
  setActivePost(tagData[idx]);

  active = !active;
  gallery.style = toggle[active];
}

function setActivePost(data) {
  data = data.attributes;
  tagsText.innerHTML = data.tags;
  authorText.innerHTML = data.creator_url;
  sourseText.innerHTML = data.source;
  dateText.innerHTML = data.created_at;

  let activeMedia = image;
  if (data.file_url.endsWith(".webm") || data.file_url.endsWith(".mp4")) {
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
    fetch(convertURL(data.sample_url)).then((response) => {
      const dataType = response.headers.get("Content-Type");
      if (dataType.includes("image") || dataType.includes("video")) {
        activeMedia.src = convertURL(data.sample_url);
      } else {
        activeMedia.src = convertURL(data.file_url);
      }
    });
  }
}

function nextImage() {
  if (idx <= tagData.length + 1 && !checkSearchActive()) {
    idx = idx + 1;
    setActivePost(tagData[idx]);
  }
}

function prevImage() {
  if (idx > 0 && !checkSearchActive()) {
    idx = idx - 1;
    setActivePost(tagData[idx]);
  }
}

function convertURL(url) {
  return `https://${hostURL}/files?url=${url}`;
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

async function getData(tags, PID) {
  const response = await fetch(`https://${hostURL}/posts?tags=${tags}&sourse=${settings.sourse}&pid=${PID}`);
  const data = await response.json();
  tagData = data.children;
  idx = 0;

  console.log(data);
  
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
    img.src = convertURL(tagData[i].attributes.preview_url);
    img.onclick = function () {
      click(img);
    };
    img.id = i;

    figure.classList.add("hover");
    figure.appendChild(img);
    gallery.appendChild(figure);

    testImage(img);
  }
}
