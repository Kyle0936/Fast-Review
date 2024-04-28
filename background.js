chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "sendText") {
    console.log("start sending");
    fetch("http://localhost:3000/summarize", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ reviews: [request.text] }),
    })
      .then((response) => response.json())
      .then((data) => {console.log("Success:", data); chrome.tabs.sendMessage(sender.tab.id, {action: "displayPopup", text: data.summary});})
      .catch((error) => {
        console.error("Error:", error);
      });
  }
});
