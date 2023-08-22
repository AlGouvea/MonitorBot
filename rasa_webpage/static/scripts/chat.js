const chatContainer = document.querySelector(".chat-container");
const userInput = document.getElementById("user-input");
const sendButton = document.getElementById("send-button");

sendButton.addEventListener("click", async () => {
    const userMessage = userInput.value;
    if (userMessage.trim() === "") return;

    const userMessageElement = createMessageElement(userMessage, "user-message");
    chatContainer.appendChild(userMessageElement);
    userInput.value = "";

    const botResponses = await sendMessageToRasa(userMessage);
    for (const botResponse of botResponses) {
        const botMessageElement = createMessageElement(botResponse.text, "bot-message");
        chatContainer.appendChild(botMessageElement);
    }
});

function createMessageElement(message, className) {
    const messageElement = document.createElement("div");
    messageElement.textContent = message;
    messageElement.classList.add("message", className);
    return messageElement;
}

async function sendMessageToRasa(message) {
    const url = "http://localhost:5005/webhooks/rest/webhook"; // Replace with your Rasa server URL

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            sender: "user",
            message: message
        })
    });

    const jsonResponse = await response.json();
    return jsonResponse; // An array of Rasa responses
}