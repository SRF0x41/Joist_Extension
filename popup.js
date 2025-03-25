// Send message to content script to read DOM
chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tabId = tabs[0].id;
    
    chrome.scripting.executeScript({
      target: { tabId },
      function: readDOM
    }, (results) => {
      const domData = results[0].result;
      document.getElementById('title').innerText = domData.title;
      document.getElementById('h1').innerText = domData.h1;
    });
  });
  
  // Function to read DOM
  function readDOM() {
    const title = document.title;
    const h1 = document.querySelector('h1') ? document.querySelector('h1').innerText : 'No H1 tag found';
    
    return { title, h1 };
  }
  