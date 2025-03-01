document.addEventListener("DOMContentLoaded", function () {
    const chatbotContainer = document.getElementById("chatbot-container");
    const chatbotIcon = document.getElementById("chatbot-icon");
    const closeButton = document.getElementById("close-btn");
    const sendBtn = document.getElementById("send-btn");
    const chatbotInput = document.getElementById("chatbot-input");
    const chatbotMessages = document.getElementById("chatbot-messages");

    // ✅ Ensure Mermaid.js is initialized
    if (typeof mermaid !== "undefined") {
        mermaid.initialize({ startOnLoad: false });
    } else {
        console.error("Mermaid.js not found! Make sure to include it in your HTML.");
    }

    // Toggle chatbot visibility
    chatbotIcon.addEventListener("click", function () {
        chatbotContainer.classList.remove("hidden");
        chatbotIcon.style.display = "none";
    });

    closeButton.addEventListener("click", function () {
        chatbotContainer.classList.add("hidden");
        chatbotIcon.style.display = "flex";
    });

    sendBtn.addEventListener("click", sendMessage);
    chatbotInput.addEventListener("keypress", function (e) {
        if (e.key === "Enter") sendMessage();
    });

    function sendMessage() {
        const userMessage = chatbotInput.value.trim();
        if (userMessage) {
            appendMessage("user", userMessage);
            chatbotInput.value = "";
            getBotResponse(userMessage);
        }
    }

    function appendMessage(sender, message) {
        const messageElement = document.createElement("div");
        messageElement.classList.add("message", sender);
        chatbotMessages.appendChild(messageElement);

        if (message.includes("```mermaid")) {
            renderMermaidDiagram(messageElement, message);
        } else {
            messageElement.innerHTML = marked.parse(message);
        }

        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    function renderMermaidDiagram(container, message) {
        // Extract the Mermaid code block
        const mermaidCode = message.match(/```mermaid\s*([\s\S]*?)\s*```/);
        if (mermaidCode && mermaidCode[1]) {
            const diagramContainer = document.createElement("div");
            diagramContainer.classList.add("mermaid");
            diagramContainer.innerHTML = mermaidCode[1];
            container.appendChild(diagramContainer);
            mermaid.init(undefined, diagramContainer);
        } else {
            container.innerHTML = marked.parse(message);
        }
    }

    async function getBotResponse(userMessage) {
        const apiKey = "AIzaSyBVeUSc-Y1g37G4iGwYZtWBUdPWKbywN1w";
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
        try {
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ "contents": [{ "parts": [{ "text": userMessage }] }] }),
            });

            const data = await response.json();
            const botMessage = data.candidates[0]?.content?.parts[0]?.text || "Sorry, I couldn't understand that.";

            appendMessage("bot", botMessage);
        } catch (error) {
            console.error("Error fetching bot response:", error);
            appendMessage("bot", "Sorry, something went wrong. Please try again.");
        }
    }
});

function openChatbot() {
    const newWindow = window.open("chatbot.html", "_blank", "width=400,height=600,top=100,left=100");
    newWindow.document.append("Hello from the parent window!");
    if (newWindow) {
        newWindow.focus();
    } else {
        alert("Please allow popups for this site!");
    }
}
