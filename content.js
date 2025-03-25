// This function will be triggered when the user clicks the button in the popup
function readDOM() {
    const title = document.title;
    const h1 = document.querySelector('h1') ? document.querySelector('h1').innerText : 'No H1 tag found';
    
    return { title, h1 };
  }
  
  // Listen for messages from the popup and send DOM data
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'readDOM') {
      const domData = readDOM();
      sendResponse(domData);
    }
  });
  