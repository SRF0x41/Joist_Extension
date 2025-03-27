# Chrome Extension: Text Area Grammar Fixer

## Overview
This Chrome extension scans text areas on web pages and corrects spelling and grammar using the Gemini API. It sends text input to a Node.js backend that securely manages the API key and returns the corrected text.

## Features
- Detects and collects text from all `<textarea>` elements.
- Sends the text to a Node.js backend, which interacts with the Gemini API.
- Replaces the original text with the corrected version while preserving undo history.
- Triggers input and change events to ensure compatibility with JavaScript frameworks like React.

## Installation
1. Clone this repository:
   ```sh
   git clone https://github.com/your-repo/text-area-grammar-fixer.git
   cd text-area-grammar-fixer
   ```
2. Install dependencies for the Node.js backend:
   ```sh
   cd backend
   npm install
   ```
3. Start the Node.js backend:
   ```sh
   node server.js
   ```
4. Load the Chrome extension:
   - Open Chrome and navigate to `chrome://extensions/`.
   - Enable "Developer mode" (top-right corner).
   - Click "Load unpacked" and select the `extension` folder.

## Usage
1. Open any webpage with text areas.
2. Click the extension icon to activate it.
3. Text will be automatically corrected and updated in the text area.

## Architecture
- **Popup Script (`popup.js`)**: Executes scripts in the active tab to collect text and send it to the background script.
- **Background Script (`background.js`)**:
  - Listens for messages from the popup.
  - Sends text to the Node.js backend for processing.
  - Returns the corrected text to be injected back into the webpage.
- **Node.js Backend (`server.js`)**:
  - Manages the API key securely.
  - Sends requests to the Gemini API.
  - Returns the corrected text to the extension.

## API Integration
The Node.js backend interacts with the Gemini API to correct text. The request structure follows this format:
```json
{
  "contents": [{
    "parts": [{
      "text": "Correct the spelling and grammar in the provided text, preserving the original formatting unchanged. Output only the corrected text. If no text is provided or you're unsure how to proceed, output the original text unchanged or return 'nothing'. Text to edit: <user_text>"
    }]
  }]
}
```

## Future Improvements
- Support for additional text input fields.
- Options page for user settings.
- Enhanced error handling and logging.
