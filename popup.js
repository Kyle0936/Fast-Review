document.getElementById('summarize').addEventListener('click', async () => {
    let [tab] = await chrome.tabs.query({active: true, currentWindow: true});
    chrome.scripting.executeScript({
      target: {tabId: tab.id},
      func: () => {
        chrome.runtime.sendMessage({action: "summarizeReviews"});
      },
    });
  });
  