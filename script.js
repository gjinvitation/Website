const $ = id => document.getElementById(id);

let pages = [
  {
    title: "સીમંત સંસ્કાર આમંત્રણ",
    family: "બારૈયા પરિવાર",
    welcome: "આપનું હાર્દિક સ્વાગત કરે છે.",
    date: "૨૫ ડિસેમ્બર, બપોરે ૧૨ વાગ્યે",
    place: "સુરત",
    font: "'Noto Sans Gujarati', sans-serif",
    color: "#6d174d",
    size: 22,
    position: 0,
    image: "images/background.png",
    video: ""
  }
];

let currentPage = 0;

const fieldIds = [
  "title", "family", "welcome",
  "date", "place", "font",
  "color", "size", "position"
];

// Save current page
function savePage() {
  const p = pages[currentPage];

  fieldIds.forEach(id => {
    p[id] = $(id).value;
  });
}

// Show page in editor
function loadPage() {
  const p = pages[currentPage];

  fieldIds.forEach(id => {
    $(id).value = p[id];
  });

  $("pageSelect").innerHTML = "";

  pages.forEach((page, index) => {
    let option = document.createElement("option");
    option.value = index;
    option.textContent = "પેજ " + (index + 1);
    $("pageSelect").appendChild(option);
  });

  $("pageSelect").value = currentPage;

  showBackground();
  update();
}

// Background image or video
function showBackground() {
  const p = pages[currentPage];

  $("vid").pause();

  if (p.video) {
    $("vid").src = p.video;
    $("vid").style.display = "block";
    $("bg").style.display = "none";
    $("vid").play().catch(() => {});
  } else {
    $("vid").removeAttribute("src");
    $("vid").style.display = "none";

    $("bg").src = p.image || "images/background.png";
    $("bg").style.display = "block";
  }
}

// Update live preview
function update() {

  $("t").textContent = $("title").value;
  $("f").textContent = $("family").value;
  $("w").textContent = $("welcome").value;
  $("d").textContent = $("date").value;
  $("p").textContent = $("place").value;

  $("words").style.fontFamily = $("font").value;
  $("words").style.color = $("color").value;
  $("words").style.fontSize = $("size").value + "px";

  $("words").style.transform =
    `translateY(calc(-50% + ${$("position").value}px))`;

  savePage();
}

// Input changes
fieldIds.forEach(id => {
  $(id).addEventListener("input", update);
});

// Page selection
$("pageSelect").addEventListener("change", function() {
  savePage();
  currentPage = Number(this.value);
  loadPage();
});

// Previous page
$("prev").onclick = function() {
  savePage();

  if (currentPage > 0) {
    currentPage--;
    loadPage();
  }
};

// Next page
$("next").onclick = function() {
  savePage();

  if (currentPage < pages.length - 1) {
    currentPage++;
    loadPage();
  }
};

// Add new page
$("addPage").onclick = function() {
  savePage();

  pages.push({
    ...pages[currentPage],
    image: "images/background.png",
    video: ""
  });

  currentPage = pages.length - 1;
  loadPage();
};

// Upload background photo
$("photo").addEventListener("change", function() {

  const file = this.files[0];

  if (!file) return;

  const url = URL.createObjectURL(file);

  pages[currentPage].image = url;
  pages[currentPage].video = "";

  showBackground();

  this.value = "";
});

// Upload background video
$("video").addEventListener("change", function() {

  const file = this.files[0];

  if (!file) return;

  const url = URL.createObjectURL(file);

  pages[currentPage].video = url;
  pages[currentPage].image = "";

  showBackground();

  this.value = "";
});

// Start website
loadPage();
                 
