function copyAllText() {
    console.log("finish loading")
    const body = document.body;
    const range = document.createRange();
    const selection = window.getSelection();

    range.selectNodeContents(body);
    selection.removeAllRanges();
    selection.addRange(range);

    try {
        const successful = document.execCommand('copy');
        const msg = successful ? 'successful' : 'unsuccessful';
        console.log('Copying text command was ' + msg);
        sendTextToBackground(selection.toString());
        console.log(selection.toString());
    } catch (err) {
        console.log('Oops, unable to copy', err);
    }

    // Clear selection if you want
    selection.removeAllRanges();
}

window.addEventListener('load', function() {
    copyAllText();
});

function sendTextToBackground(text) {
  chrome.runtime.sendMessage({ action: "sendText", text: text });
}


chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "displayPopup" && message.text !== "Review_Not_Found") {
      displayPopup(message.text);
    }
  });
  
  function displayPopup(text) {
    const popup = document.createElement('div');
    popup.style.position = 'fixed';
    popup.style.top = '20px';
    popup.style.left = '50%';
    popup.style.transform = 'translateX(-50%)';
    popup.style.padding = '20px';
    popup.style.width = '80%';
    popup.style.maxWidth = '600px'; // Maximum width of the popup
    popup.style.background = '#f9f9f9';
    popup.style.border = '1px solid #ccc';
    popup.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
    popup.style.borderRadius = '8px';
    popup.style.zIndex = '1000';
    popup.style.textAlign = 'center';
    popup.style.fontSize = '16px';
    popup.style.color = '#333';
    popup.style.boxSizing = 'border-box';

    // Title for the popup
    const title = document.createElement('div');
    title.textContent = 'Summary of Reviews';
    title.style.fontWeight = 'bold';
    title.style.marginBottom = '10px';
    title.style.color = '#2c3e50';

    popup.appendChild(title);
    popup.appendChild(document.createTextNode(text));

    document.body.appendChild(popup);

    // Click to close functionality
    popup.addEventListener('click', () => {
        document.body.removeChild(popup);
    });

    // Optionally, remove popup after some time
    setTimeout(() => {
        // Check if popup still exists in the document to avoid errors
        if (document.body.contains(popup)) {
            document.body.removeChild(popup);
        }
    }, 10000); // Removes the popup after 10 seconds
}
