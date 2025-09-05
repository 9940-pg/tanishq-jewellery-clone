document.addEventListener("DOMContentLoaded", () => {
  const bg = document.getElementById("eva-bg");
  if (bg?.complete) bg.classList.add("loaded");
  else if (bg) bg.onload = () => bg.classList.add("loaded");

  // --- Mic setup ---
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  recognition.lang = "en-US";
  recognition.continuous = true;
  recognition.interimResults = false;

  let isSpeaking = false;
  const chatLog = document.getElementById("chatLog");

  function addMessage(text, sender = "bot") {
    const p = document.createElement("p");
    p.textContent = text;
    p.className = sender;
    chatLog.appendChild(p);
    chatLog.scrollTop = chatLog.scrollHeight;
  }

  // --- Eva GPT reply (updated for JSON) ---
async function evaReply(text) {
  try {
    const res = await fetch(`${window.location.origin}/api/gpt`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: text }),
    });

    if (!res.ok) {
      const errText = await res.text(); // <-- fix: await separately
      console.error("GPT error:", res.status, errText);
      return "Sorry, I couldn't understand that.";
    }

    const data = await res.json(); // <-- parse JSON
    return data.reply || "I'm here, ask me anything.";
  } catch (err) {
    console.error("Eva logic error:", err);
    return "Oops, something went wrong.";
  }
}


  function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.pitch = 1;
    utterance.rate = 1;

    const voices = speechSynthesis.getVoices();
    const femaleVoice = voices.find(v => /female|woman/i.test(v.name));
    if (femaleVoice) utterance.voice = femaleVoice;

    isSpeaking = true;
    try { recognition.stop(); } catch {}

    speechSynthesis.speak(utterance);
    utterance.onend = () => {
      isSpeaking = false;
      try { recognition.start(); } catch {}
    };
  }

  recognition.onresult = async (e) => {
    const transcript = e.results[e.results.length - 1][0].transcript.trim();
    console.log("User:", transcript);

    addMessage(transcript, "user");

    const reply = await evaReply(transcript);
    console.log("Eva:", reply);

    addMessage(reply, "bot");
    speak(reply);
  };

  recognition.onerror = (e) => console.error("Mic error:", e);

  recognition.onend = () => {
    if (!isSpeaking) {
      try { recognition.start(); } catch {}
    }
  };

  const overlay = document.getElementById("startOverlay");
  overlay.addEventListener("click", () => {
    try {
      recognition.start();
      console.log("Eva is listening 🎤");
    } catch (e) {
      console.warn("Start failed:", e);
    }
    overlay.style.display = "none";
  });
});

