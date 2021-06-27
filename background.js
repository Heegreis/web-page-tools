let color = '#3aa757';

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color });
  console.log('Default background color set to %cgreen', `color: ${color}`);

  chrome.contextMenus.create({
    title: '取得title和url',
    id: 'getUrlMD',
    contexts: ['page']
  });
});

chrome.contextMenus.onClicked.addListener(function (info, tab) {
  if (info.menuItemId !== "getUrlMD") { return }
  // send a message from the extension to content script of current tab
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    chrome.tabs.sendMessage(tabs[0].id, { getUrl: true })
  });
});