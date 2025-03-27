// background.js

// Function that logs "Hello World"
function logHelloWorld() {
  console.log("Hello World");
}

// Function to repair text using Gemini API
async function repairText(text_line) {
  const API_KEY = 
  const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

  const prompt_request = {
      contents: [{
          parts: [{
              text: `Correct the spelling and grammar in the provided text, preserving the original formatting unchanged. Output only the corrected text. If no text is provided or youre unsure how to proceed, output the original text unchanged or return "nothing". Text to edit: ${text_line}`
          }]
      }]
  };

  try {
      const response = await fetch(API_URL, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(prompt_request),
      });

      const data = await response.json(); // Convert response to JSON
      const repaired_text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (repaired_text) {
          return repaired_text;  // Return the repaired text
      } else {
          throw new Error('Text not found in response');
      }
  } catch (error) {
      console.error('Fetch error:', error);
      throw error;  // Propagate error
  }
}

// Listen for messages from other parts of the extension
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'logHelloWorld') {
      logHelloWorld();
      sendResponse({ status: 'Hello World logged' });
  }

  if (message.action === 'call_gemini_api') {
      console.log(typeof message.text_line);
      repairText(message.text_line).then(repaired_text => {
        sendResponse({repairedText: repaired_text});
      }).catch(error => {
        sendResponse({ error: "Error: " + error.message });
      });
  }

  return true;
});