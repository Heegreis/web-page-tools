window.onload = function () {
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
  };

  chrome.runtime.onMessage.addListener(getUrlWithTitleMdType);
}
