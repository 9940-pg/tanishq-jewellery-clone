import { HfInference } from "@huggingface/inference";

const hf = new HfInference(import.meta.env.HF_API_TOKEN);

export async function POST({ request }) {
  try {
    const { text } = await request.json();
    if (!text) return new Response(null, { status: 400 });

    const lang = /[अ-ह]/.test(text) ? "hi" : "en";

    // Hugging Face TTS call
    const audioData = await hf.audioTextToSpeech({
      model: "ai4bharat/indic-parler-tts",
      inputs: text,
      voice: "female", // or "male"
      language: lang
    });

    return new Response(audioData, {
      status: 200,
      headers: { "Content-Type": "audio/wav" },
    });

  } catch (err) {
    console.error("TTS error:", err.message);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}