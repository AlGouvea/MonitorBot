const chatContainer = document.querySelector(".chat-container");
const userInput = document.getElementById("user-input");
const sendButton = document.getElementById("send-button");

sendButton.addEventListener("click", async () => {
  const userMessage = userInput.value;
  if (userMessage.trim() === "") return;

  const userMessageElement = createMessageElement(
    userMessage,
    "user-message",
    ""
  );
  chatContainer.appendChild(userMessageElement);
  userInput.value = "";

  const botResponses = await sendMessageToRasa(userMessage);
  for (let botResponse of botResponses) {
    let botMessageElement;
    if (botResponse.text) {
      botMessageElement = createMessageElement(
        botResponse.text,
        "bot-message",
        ""
      );
    } else if (botResponse.image) {
      botMessageElement = createMessageElement(
        botResponse.image,
        "bot-message",
        ""
      );
    }
    chatContainer.appendChild(botMessageElement);
  }
});

function createMessageElement(message, className, sender) {
  const messageElement = document.createElement("div");
  messageElement.textContent = `${sender}${message}`;
  messageElement.classList.add("message", className);
  return messageElement;
}

async function sendMessageToRasa(message) {
  const url = "http://localhost:5005/webhooks/rest/webhook"; // Replace with your Rasa server URL

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      sender: "user",
      message: message,
    }),
  });

  const jsonResponse = await response.json();
  return jsonResponse; // An array of Rasa responses
}
