document.addEventListener("DOMContentLoaded", () => {
  const inputField = document.getElementById("userInput");
  const chat = document.getElementById("chat");
  const sendBtn = document.getElementById("sendBtn");

  async function sendMessage() {
    const input = inputField.value;
    if (!input) return;

    chat.innerHTML += `<p><b>You:</b> ${input}</p>`;

    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer OPENAI_API_KEY" // ⚠️ Replace with your key
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: input }]
        })
      });

      const data = await response.json();
      const reply = data.choices?.[0]?.message?.content || "Error: No reply";

      chat.innerHTML += `<p><b>Bot:</b> ${reply}</p>`;
    } catch (err) {
      chat.innerHTML += `<p><b>Bot:</b> Oops! Something went wrong.</p>`;
      console.error(err);
    }

    inputField.value = "";
  }

  // Attach event listener after DOM is ready
  sendBtn.addEventListener("click", sendMessage);
});
