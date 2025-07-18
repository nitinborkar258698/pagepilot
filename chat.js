let chatData = {};
const messages = document.getElementById('chat-messages');
const input = document.getElementById('userInput');

function sendMessage() {
  const text = input.value.trim();
  if (!text) return;
  appendMessage('You', text);
  handleBot(text);
  input.value = '';
}

function appendMessage(sender, text) {
  const msg = document.createElement('div');
  msg.className = sender === 'You' ? 'user-msg' : 'bot-msg';
  msg.innerText = `${sender}: ${text}`;
  messages.appendChild(msg);
  messages.scrollTop = messages.scrollHeight;
}

let step = 0;
function handleBot(userText) {
  switch (step) {
    case 0:
      appendMessage('Bot', 'Welcome! What should be the headline of your landing page?');
      step++;
      break;
    case 1:
      chatData.headline = userText;
      appendMessage('Bot', 'Great! Now enter a subheadline.');
      step++;
      break;
    case 2:
      chatData.subheadline = userText;
      appendMessage('Bot', 'Upload a hero image or capture one.');
      step++;
      break;
    case 3:
      appendMessage('Bot', 'Now type the button text (e.g. "Download Now")');
      chatData.imageUrl = window.lastUploadedImage || '';
      step++;
      break;
    case 4:
      chatData.buttonText = userText;
      appendMessage('Bot', 'Finally, enter the redirect URL.');
      step++;
      break;
    case 5:
      chatData.redirectUrl = userText;
      appendMessage('Bot', 'Generating your landing page...');
      generateLandingPage();
      break;
  }
}

function generateLandingPage() {
  fetch('/generate-page', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(chatData),
  })
    .then(res => res.json())
    .then(data => {
      appendMessage('Bot', `✅ Your landing page is ready: ${data.url}`);
    });
}