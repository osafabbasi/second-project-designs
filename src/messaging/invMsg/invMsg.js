const friends = document.querySelectorAll('.friends');
const chatUser = document.getElementById('chatUser');
const chatMessages = document.getElementById('chatMessages');
const messageInput = document.getElementById('messageInput');
const sendBtn = document.getElementById('sendBtn');

// Dummy chat data for each friend
const chatData = {
  0: ["Hey there! 👋", "Thanks for reaching out!"],
  1: ["Hi! How can I help you today?"],
  2: ["Yo! Let's catch up."]
};

// Store current chat ID
let currentFriendId = 0;

// Load chat function
function loadChat(id) {
  currentFriendId = id;
  chatMessages.innerHTML = ""; // Clear previous messages
  chatUser.textContent = `Chat with Friend ${id + 1}`;

  chatData[id]?.forEach(msg => {
    const botMsg = document.createElement('div');
    botMsg.classList.add('message', 'bot-msg');
    botMsg.textContent = msg;
    chatMessages.appendChild(botMsg);
  });

  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Send message
sendBtn.addEventListener('click', () => {
  const msg = messageInput.value.trim();
  if (msg === "") return;

  const userMsg = document.createElement('div');
  userMsg.classList.add('message', 'user-msg');
  userMsg.textContent = msg;
  chatMessages.appendChild(userMsg);
  messageInput.value = "";

  setTimeout(() => {
    const botReply = document.createElement('div');
    botReply.classList.add('message', 'bot-msg');
    botReply.textContent = "Thanks for messaging!";
    chatMessages.appendChild(botReply);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }, 500);
});

// Click on any friend to load their chat
friends.forEach((friend, index) => {
  friend.addEventListener('click', () => {
    loadChat(index);
  });
});

// Load first chat by default
loadChat(0);
