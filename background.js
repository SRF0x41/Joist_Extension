import { GoogleGenerativeAI } from "@google/generative-ai";

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'generateContent') {
    const API_KEY = 'AIzaSyBGqKIFeaWPSXcM1c2XCCVnwx6jBinKPG0';
    const ai = new GoogleGenerativeAI({ apiKey: API_KEY });

    const main = async () => {
      try {
        const response = await ai.models.generateContent({
          model: 'gemini-2.0-flash',
          contents: message.contents,
        });
        sendResponse({ success: true, data: response.text });
      } catch (error) {
        sendResponse({ success: false, error: error.message });
      }
    };
    main();
    return true; // Required to keep the message channel open for async response
  }
});
