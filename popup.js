// This function will be executed in the context of the active tab

function editTextAreaOnTab() {
    // Find the first <textarea> element on the page
    const textarea = document.querySelector('textarea');
    
    // If a <textarea> is found, modify its value
    if (textarea) {
      textarea.value = "Hello, World!";  // Set the content of the textarea to "Hello, World!"
      // Trigger React's onChange event
      textarea.dispatchEvent(new Event('input', { bubbles: true }));
    } else {
      console.log("No textarea found on the page.");
    }

    return {textarea};
}

function collectTextData(){
    const textareas = document.querySelectorAll('textarea');
    // Textareas is a node list
    text_areas_data = [];
    for(let i = 0; i < textareas.length; i++){
        text_areas_data.push(textareas[i].value);
    }
    return text_areas_data;
}


if(window.location.href.includes('chrome-extension://')){
    console.log("This is a simple script test");

    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        const tabId = tabs[0].id;  // Get the ID of the active tab
        chrome.scripting.executeScript({ target: {tabId}, function: collectTextData }, (collected_text_areas) => {
            console.log(collected_text_areas[0].result);
        });
    });
}
  
  // Check if the script is running in the popup context or as a content script
//   if (window.location.href.includes('chrome-extension://')) {
    // This block runs when the script is executed in the popup context (the extension's popup UI)





    
    // Query the active tab in the current window
    // chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    //   const tabId = tabs[0].id;  // Get the ID of the active tab
  
    //   // Execute the editTextAreaOnTab function on the active tab
    //   chrome.scripting.executeScript({
    //     target: { tabId },   // We execute the script on the tab with the given tabId
    //     function: editTextAreaOnTab  // The function to run in the context of the page (on the active tab)
    //   }, (results) => {
    //     dom_data = results[0].result;

    //     document.getElementById('textarea').innerText = dom_data.textarea.value;


    //   });
    // });
//   } else {
//     // This block runs when the script is executed in the content script context (inside the webpage)
  
//     // Listen for messages sent from the popup or other parts of the extension
//     chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//       if (message.action === 'button') {  // If the message action is 'editTextArea'
//         const textarea = document.querySelector('textarea');
//         if (textarea) {
//           textarea.value = "Hello, World!";  // Modify the textarea value
//           sendResponse({ success: true });
//         } else {
//           sendResponse({ success: false, error: "No textarea found on the page" });
//         }
//       }
//     });
//   }
  