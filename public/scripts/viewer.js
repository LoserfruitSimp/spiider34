const [leftArrow, rightArrow, enter, m] = [37, 39, 13, 77];
const toggle = { true: "display: grid;", false: "display: none;" };

const tagsQ = new URLSearchParams(window.location.search).get('tags')

const urls = {
  "rule34": "rule34.xxx",
  "hypnohub": "hypnohub.net",
  "safebooru": "safebooru.org",
  "realbooru": "realbooru.com",
  "xbooru": "xbooru.com",
  "gelbooru": "gelbooru.com"
};

var gallery = document.getElementsByClassName("gallery")[0];
var topBar = document.getElementById("topBar");
var video = document.getElementById("video");
var image = document.getElementById("img");
var tags = document.getElementById("tags");

var active = false;
var totalPages = 0;
var activePid = 0;
var tagData = [];
var idx = 0;

document.getElementById("tagsH").innerHTML = tagsQ;
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

addEvent(document.getElementById("home"), "click", function (e) {
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
  document.getElementById("curTags").innerHTML = data.tags;
  document.getElementById("author").innerHTML = data.owner;
  document.getElementById("sourse").innerHTML = `https://${urls[settings.sourse]}/index.php?page=post&s=view&id=${data.id}`
  document.getElementById("page").innerHTML = `${activePid / 100 + 1} | ${idx + 1}`;
  
  topBar.style.transform = "scaleX(0.5)";
  
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
  
  fetch(convertURL(data.file_url)).then((response) => {
    topBar.style.transform = "scaleX(0.8)";
    
    const dataType = response.headers.get("Content-Type");
    if (settings.quality === "Full" || activeMedia.id === "video" || data.sample_url === "") {
      if (dataType.includes("text")) {
          console.log("Trying file as gif...")
          data.file_url = data.file_url.slice(0, -3) + "gif";
          data.sample_url = data.file_url.slice(0, -3) + "gif";
          setActivePost(data);
      } else {
          console.log("Set file to " + data.file_url)
          activeMedia.src = convertURL(data.file_url);
      }
    } else {
      if (dataType.includes("text")) {
          console.log("Trying file as mp4...")
          data.file_url = data.file_url.slice(0, -4) + "mp4";
          setActivePost(data);
      } else if (dataType.includes("image") || dataType.includes("video")) {
          console.log("Set file to " + data.sample_url)
          activeMedia.src = convertURL(data.sample_url);
      } else {
          console.log("Set file to " + data.file_url)
          activeMedia.src = convertURL(data.file_url);
      }
  }
  });
  
}

function nextImage() {
  if (!checkSearchActive()) {
    if (idx < tagData.length - 1) {
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
