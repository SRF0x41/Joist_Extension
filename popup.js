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
            //     fetch("http://localhost:5000/api/data")
            //         .then(response => response.json())
            //         .then(data => console.log("Data received:", data))
            //         .catch(error => console.error("Error:", error));

             console.log("Collecting text area data ...");
                const textareas = document.querySelectorAll('textarea');
                const collected_text_areas = [];
                for (const textarea of textareas) {
                    collected_text_areas.push(textarea.value);
                    if (textarea) {
                        try {
                            chrome.runtime.sendMessage({action: 'call_gemini_api', text_line: textarea.value}, (response) => {
                                if(response.repairedText){
                                    console.log("Original Text: ", textarea.value);
                                    textarea.value = response.repairedText;
                                    console.log("Repaired text: ", response.repairedText);

                                    // Use execCommand to replace text (keeps undo history)
                                    document.execCommand("selectAll", false, null);
                                    document.execCommand("insertText", false, response.repairedText);

                                    // Trigger React/JS event listeners
                                    textarea.dispatchEvent(new Event('input', { bubbles: true }));
                                    textarea.dispatchEvent(new Event('change', { bubbles: true }));
                                }
                            });
                        } catch (error) {
                            console.error('Error repairing text:', error);
                        }
                    }
                }
                console.log("Collected Text Areas:", collected_text_areas);
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