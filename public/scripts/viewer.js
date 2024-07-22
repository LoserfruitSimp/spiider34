// Lookup Tables
const [leftArrow, rightArrow, enter, m, t, a, d] = [37, 39, 13, 77, 84, 65, 68];

const GalleryToggle = { true: "display: grid;", false: "display: none;" };
const TagsToggle = { true: "", false: "display: none;" };

const urls = {
  rule34: "rule34.xxx",
  hypnohub: "hypnohub.net",
  safebooru: "safebooru.org",
  realbooru: "realbooru.com",
  xbooru: "xbooru.com",
  gelbooru: "gelbooru.com",
};

// Document Elements
let GalleryElement = document.getElementsByClassName("gallery")[0];
let OrderdListElement = document.getElementById("orderdList");
let TagGalleryElement = document.getElementById("topTags");
let TopBarElement = document.getElementById("topBar");
let SearchElement = document.getElementById("tags");
let VideoElement = document.getElementById("video");
let ImageElement = document.getElementById("img");

// Data Arrays
let topTags = [];
let tagData = [];

// Gallery Toggles
let tagsGalActive = false;
let galleryActive = false;

// Post Info Numbers
let totalPages = 0;
let totalPosts = 0;
let activePid = 0;
let idx = 0;

// Inital Tags Setup
const TagsParam = new URLSearchParams(window.location.search).get("tags");
document.getElementById("tagsH").innerHTML = TagsParam;
SearchElement.value = TagsParam;

// Inital call
getData(TagsParam, 0).then(() => {
  // If no posts were found...
  if (tagData.length === 0) {
    ImageElement.src = "https://cdn-icons-png.flaticon.com/512/103/103085.png";
    return;
  }
});

// User Input Events
addEvent(document, "keydown", function (e) {
  e = e || window.event;

  switch (e.keyCode) {
    case a:
      prevImage();
      break;
    case d:
      nextImage();
      break;
    case leftArrow:
      prevImage();
      break;
    case rightArrow:
      nextImage();
      break;
    case m:
      if (!checkSearchActive()) {
        galleryActive = !galleryActive;
        GalleryElement.style = GalleryToggle[galleryActive];
      }
      break;
    case t:
      if (!checkSearchActive()) {
        tagsGalActive = !tagsGalActive;
        TagGalleryElement.style = TagsToggle[tagsGalActive];
      }
      break;
  }
});

addEvent(window, "click", function (e) {
  e = e || window.event;
  if (
    document.activeElement.id === "" &&
    !galleryActive &&
    !tagsGalActive &&
    e.screenY < (window.screen.height / 3) * 2
  ) {
    if (e.x > window.innerWidth / 2) {
      nextImage();
    } else {
      prevImage();
    }
  }
});

addEvent(ImageElement, "load", () => (TopBarElement.style.transform = "scaleX(0)"));
addEvent(VideoElement, "play", () => (TopBarElement.style.transform = "scaleX(0)"));

addEvent(document.getElementById("home"), "click", function (e) {
  window.location.replace(`http://${hostURL}`);
});

function GalleryImageClicked(img) {
  if (controlKeyPressed) {
    // New Tab
    window.open(convertURL(tagData[img.id].file_url));
  } else {
    // Regular
    idx = Number(img.id);
    setActivePost(tagData[idx]);

    galleryActive = !galleryActive;
    GalleryElement.style = GalleryToggle[galleryActive];
  }
}

function setActivePost(data) {
  //document.getElementById("curTags").innerHTML = data.tags;
  document.getElementById("sourse").innerHTML = `https://${urls[settings.sourse]
    }/index.php?page=post&s=view&id=${data.id}`;
  document.getElementById("page").innerHTML = `Page <strong>${activePid / 100 + 1}</strong> of <strong>${totalPages}</strong> | Post <strong>${(idx + 1) + activePid}</strong> of <strong>${totalPosts}</strong>`

  TopBarElement.style.transform = "scaleX(0.5)";

  let activeMedia = ImageElement;
  if (data.file_url.endsWith(".webm") || data.file_url.endsWith(".mp4")) {
    activeMedia = VideoElement;
    ImageElement.style = "display: none;";
    VideoElement.style = "";
  } else {
    activeMedia = ImageElement;

    VideoElement.style = "display: none;";
    ImageElement.style = "";
    VideoElement.src = "";
  }

  const staticIndex = idx
  fetch(`/checktags?sourse=${settings.sourse}&tags=${data.tags}`).then(async (response) => {
    const data = await response.json();
    // 4 == Char, 3 == copyright, 5 == meta 1 == artist, 0 == general

    if (staticIndex !== idx) return

    const typeArrays = [];
    for (let i = 0; i <= 6; i++) {
      typeArrays.push([]);
    }

    data.forEach(obj => {
      if (obj.type >= 0 && obj.type <= 6) {
        typeArrays[obj.type].push(obj.name);
      }
    });

    document.getElementById("curTags").innerHTML = `<span class="red"> ${typeArrays[3].join(" ")}</span >`
    document.getElementById("curTags").innerHTML += `<span class="orange"> ${typeArrays[4].join(" ")}</span >`
    document.getElementById("curTags").innerHTML += `<span class="yellow"> ${typeArrays[1].join(" ")}</span >`
    document.getElementById("curTags").innerHTML += `<span class="green"> ${typeArrays[5].join(" ")}</span >`
    document.getElementById("curTags").innerHTML += `<span class="blue"> ${typeArrays[0].join(" ")}</span >`
    document.getElementById("curTags").innerHTML += `<span class="purple"> ${typeArrays[2].join(" ")}</span >`
  })

  fetch(convertURL(data.file_url)).then((response) => {
    TopBarElement.style.transform = "scaleX(0.8)";

    const dataType = response.headers.get("Content-Type");
    if (
      settings.quality === "Full" ||
      activeMedia.id === "video" ||
      data.sample_url === ""
    ) {
      if (dataType.includes("text")) {
        TopBarElement.style.transform = "scaleX(0.9)";
        console.log("Trying file as gif...");
        data.file_url = data.file_url.slice(0, -3) + "gif";
        data.sample_url = data.file_url.slice(0, -3) + "gif";
        setActivePost(data);
      } else {
        console.log("Set file to " + data.file_url);
        activeMedia.src = convertURL(data.file_url);
      }
    } else {
      if (dataType.includes("text")) {
        TopBarElement.style.transform = "scaleX(0.9)";
        console.log("Trying file as mp4...");
        data.file_url = data.file_url.slice(0, -4) + "mp4";
        setActivePost(data);
      } else if (dataType.includes("image") || dataType.includes("video")) {
        console.log("Set file to " + data.sample_url);
        activeMedia.src = convertURL(data.sample_url);
      } else {
        console.log("Set file to " + data.file_url);
        activeMedia.src = convertURL(data.file_url);
      }
    }
    TopBarElement.style.transform = "scaleX(0.95)";
  });
}

function nextImage() {
  if (!checkSearchActive()) {
    if (idx < tagData.length - 1) {
      idx = idx + 1;
      setActivePost(tagData[idx]);
    } else {
      getData(TagsParam, activePid + 100);
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
        getData(TagsParam, activePid - 100);
      }
    }
  }
}

function convertURL(url) {
  return `http://${hostURL}/files?url=${url}`;
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
    `http://${hostURL}/posts?tags=${tags}&sourse=${settings.sourse}&pid=${PID}`
  );

  const json = await response.json();
  const data = json.data

  if (Array.isArray(data)) {
    if (data.length === 0) {
      return
    }

    tagData = data;
  } else {
    tagData = data.post;
  }

  console.log(tagData);

  totalPosts = json.total
  totalPages = Math.ceil(totalPosts / 100)

  activePid = PID;
  idx = 0;

  setActivePost(tagData[idx]);
  GalleryElement.innerHTML = "";

  for (let i = 0; i < tagData.length; i++) {
    const figure = document.createElement("figure");
    const img = document.createElement("img");

    if (
      tagData[i].file_url.endsWith(".webm") ||
      tagData[i].file_url.endsWith(".mp4")
    ) {
      img.style = "border: solid red; border-width: thin;";
    }

    img.src = convertURL(tagData[i].preview_url);
    img.classList.add("galleryItem");
    img.onclick = function () {
      GalleryImageClicked(img);
    };
    img.id = i;

    figure.classList.add("hover");
    figure.appendChild(img);
    GalleryElement.appendChild(figure);

    let tester = new Image();
    tester.onerror = function () {
      img.parentElement.remove();
    };
    tester.src = img.src;

    topTags = tagData[i].tags.split(" ").concat(topTags);
  }

  const count = topTags.reduce((acc, curr) => {
    acc[curr] = (acc[curr] || 0) + 1;
    return acc;
  }, {});

  const sortedCount = Object.keys(count).sort((a, b) => count[b] - count[a]);

  for (let i = 0; i < sortedCount.length; i++) {
    const li = document.createElement("li");
    li.innerHTML = `<a style="text-decoration: none; color: pink;" href="p?tags=${sortedCount[i]
      }">${sortedCount[i]} (${count[sortedCount[i]]})</a>`;
    OrderdListElement.appendChild(li);
  }
}
