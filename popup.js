if (window.location.href.includes('chrome-extension://')) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.length === 0 || !tabs[0]?.id) {
            console.error("No active tab found.");
            return;
        }

        const tabId = tabs[0].id;
        console.log("Executing script on tab:", tabId);

        chrome.scripting.executeScript({
            target: { tabId },
            func: () => {
                const API_KEY = 'AIzaSyBGqKIFeaWPSXcM1c2XCCVnwx6jBinKPG0';
                const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

                const requestBody = {
                    contents: [{
                        parts: [{
                            text: 'Hello'
                        }]
                    }]
                };

                fetch(API_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(requestBody),
                })
                .then(response => response.text())  // Convert response to text
                .then(text => {
                    console.log('Response text:', text);  // Log the text response
                })
                .catch(error => {
                    console.error('Fetch error:', error);
                });
            }
        })
        .then(() => {
            console.log("Script executed successfully.");
        })
        .catch((error) => {
            console.error("Script execution failed:", error);
        });
    });
}




/*
if (window.location.href.includes('chrome-extension://')) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.length === 0 || !tabs[0]?.id) {
            console.error("No active tab found.");
            return;
        }

        const tabId = tabs[0].id;  
        console.log("Executing script on tab:", tabId);

        chrome.scripting.executeScript({
            target: { tabId },
            func: () => {
                // this is the isolated environment everything must be defined here

                // Collect text_area data
                console.log("Collecting text data ...");
                const textareas = document.querySelectorAll('textarea');
                collected_text_areas = [];
                for(const n of textareas){
                    collected_text_areas.push(n.value);

                    if(n){
                        n.value = "THIS IS EDITED TEXT";
                        // Trigger react 
                        n.dispatchEvent(new Event('input', { bubbles: true }));
                    }
                }
                console.log(collected_text_areas);
                
                
                



            }
        }).then(() => {
            console.log("✅ Script executed successfully.");
        }).catch((error) => {
            console.error("Script execution failed:", error);
        });
    });
} */