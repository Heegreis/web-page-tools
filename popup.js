// Initialize butotn with users's prefered color
let changeColor = document.getElementById("changeColor");
let getUrlMD = document.getElementById("getUrlMD");

chrome.storage.sync.get("color", ({ color }) => {
  changeColor.style.backgroundColor = color;
});

// When the button is clicked, inject setPageBackgroundColor into current page
changeColor.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: setPageBackgroundColor,
  });
});

getUrlMD.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: getUrlWithTitleMdType,
  });
});

// The body of this function will be execuetd as a content script inside the
// current page
function setPageBackgroundColor() {
  chrome.storage.sync.get("color", ({ color }) => {
    document.body.style.backgroundColor = color;
  });
}

function getUrlWithTitleMdType() {
  // [document.title](window.location.href)
  console.log("writeText")
  // let url = decodeURI(encodeURI(encodeURI(window.location.href)));
  let url = decodeURI(window.location.href);
  // let TextToCopy = "[" + document.title + "](" + window.location.href + ")";
  let TextToCopy = "[" + document.title + "](" + url + ")";

  let TempText = document.createElement("input");
  TempText.value = TextToCopy;
  document.body.appendChild(TempText);
  TempText.select();
  
  document.execCommand("copy");
  document.body.removeChild(TempText);
  
  alert("Copied the text: " + TempText.value);
}