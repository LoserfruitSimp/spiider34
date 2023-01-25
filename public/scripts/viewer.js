const [leftArrow, rightArrow, enter, m] = [37, 39, 13, 77];

const tagsQ = window.location.href
  .slice(window.location.href.indexOf("?") + 1)
  .split("&")[0]
  .substring(5)
  .replaceAll("%20", " ");
const toggle = { true: "display: grid;", false: "display: none;" };
const urls = {
  "rule34": "rule34.xxx",
  "hypnohub": "hypnohub.net",
  "safebooru": "safebooru.org",
  "realbooru": "realbooru.com",
  "xbooru": "xbooru.com",
  "furrybooru": "furry.booru.org",
  "gelbooru": "gelbooru.com"
};

var gallery = document.getElementsByClassName("gallery")[0];
var authorText = document.getElementById("author");
var sourseText = document.getElementById("sourse");
var tagsText = document.getElementById("curTags");
var tagsElement = document.getElementById("tagsH");
var search = document.getElementById("search");
var video = document.getElementById("video");
var image = document.getElementById("img");
var home = document.getElementById("home");
var tags = document.getElementById("tags");
var page = document.getElementById("page");

var active = false;
var totalPages = 0;
var activePid = 0;
var tagData = [];
var idx = 0;

tagsElement.innerHTML = tagsQ;
tags.value = tagsQ;

getData(tagsQ, 0);

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
  if (
    document.activeElement.id === "" &&
    !active &&
    e.screenY < (window.screen.height / 3) * 2
  ) {
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
  if (controlKeyPressed) {
    // New Tab
    window.open(convertURL(tagData[img.id].file_url));
  } else {
    // Regular
    idx = Number(img.id);
    setActivePost(tagData[idx]);

    active = !active;
    gallery.style = toggle[active];
  }
}

function setActivePost(data) {
  tagsText.innerHTML = data.tags;
  authorText.innerHTML = data.owner;
  sourseText.innerHTML = "https://" + urls[settings.sourse] + "/index.php?page=post&s=view&id=" + data.id
  page.innerHTML = `${activePid / 100 + 1} | ${idx + 1}`;

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

  if (settings.quality === "Full" || activeMedia.id === "video" || data.sample_url === "") {
    activeMedia.src = convertURL(data.file_url);
  } else {
    fetch(convertURL(data.sample_url)).then((response) => {
      const dataType = response.headers.get("Content-Type");
      if (dataType.includes("text")) {
        data.file_url = data.file_url.slice(0, -4) + "mp4";
        setActivePost(data);
        return
      }
      
      if (dataType.includes("image") || dataType.includes("video")) {
        activeMedia.src = convertURL(data.sample_url);
      } else {
        activeMedia.src = convertURL(data.file_url);
      }
    });
  }
}

function nextImage() {
  if (!checkSearchActive()) {
    if (idx < tagData.length - 1) {
      console.log(tagData.length);
      idx = idx + 1;
      setActivePost(tagData[idx]);
    } else {
      if (tagData.length === 100) {
        getData(tagsQ, activePid + 100);
      }
    }
  }
}

function prevImage() {
  if (!checkSearchActive()) {
    if (idx > 0) {
      idx = idx - 1;
      setActivePost(tagData[idx]);
    } else {
      if (activePid != 0) {
        getData(tagsQ, activePid - 100);
      }
    }
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

async function getData(tags, PID) {
  const response = await fetch(
    `https://${hostURL}/posts?tags=${tags}&sourse=${settings.sourse}&pid=${PID}`
  );
  
  const data = await response.json();
  
  if (Array.isArray(data)) {
    tagData = data;
  } else {
    tagData = data.post
  }
  
  console.log(tagData);
  
  activePid = PID;
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
    img.src = convertURL(tagData[i].preview_url);
    img.onclick = function () {
      click(img);
    };
    img.id = i;

    figure.classList.add("hover");
    figure.appendChild(img);
    gallery.appendChild(figure);

    var tester = new Image();
    tester.onerror = function () {
      img.parentElement.remove();
    };
    tester.src = img.src;

//     // File URL Preload
//     if (settings.quality === "Full") {
//       if (
//         !tagData[i].file_url.endsWith(".webm") ||
//         !tagData[i].file_url.endsWith(".mp4")
//       ) {
//         const file = new Image();
//         file.src = convertURL(tagData[i].file_url);
//         file.remove();
//       }
//     }

//     // Sample URL Preload
//     if (settings.quality === "Sample") {
//       const sample = new Image();
//       sample.src = convertURL(tagData[i].sample_url);
//       sample.remove();
//     }
  }
}
