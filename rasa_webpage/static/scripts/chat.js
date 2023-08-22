// document.addEventListener("DOMContentLoaded", function() {
//     const chatMessages = document.getElementById("chat-messages");
//     const userInput = document.getElementById("user-input");
//     const messageForm = document.getElementById("message-form");

//     messageForm.addEventListener("submit", async function(event) {
//         event.preventDefault(); // Prevent the default form submission behavior

//         const message = userInput.value;
//         if (message.trim() === "") return;

//         appendMessage("You", message);
//         userInput.value = "";

//         try {
//             const response = await fetch("http://localhost:5005/webhooks/rest/webhook", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json"
//                 },
//                 body: JSON.stringify({
//                     sender: "Alvaro",
//                     message: message
//                 })
//             });

//             console.log("Response status:", response); // Log the response status
//         } catch (error) {
//             console.error("Error sending message:", error);
//         }
//     });

//     function appendMessage(sender, message) {
//         const messageElement = document.createElement("div");
//         messageElement.classList.add("message");
//         messageElement.textContent = `${sender}: ${message}`;
//         chatMessages.appendChild(messageElement);
//     }
// });
