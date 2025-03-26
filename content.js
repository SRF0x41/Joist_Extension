// This function will be triggered when the user clicks the button in the popup

  
  // Listen for messages from the popup and send DOM data
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'readDOM') {
      const domData = readDOM();
      sendResponse(domData);
    }
  });
  