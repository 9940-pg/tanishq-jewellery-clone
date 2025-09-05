export async function POST({ request }) {
  try {
    const { prompt } = await request.json();

    const model = "mistralai/Mistral-7B-Instruct-v0.2"; // more reliable than gpt2

    const response = await fetch(`https://api-inference.huggingface.co/models/${model}`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.HF_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputs: prompt }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("HF API KEY error:", response.status, errText);
      return new Response(
        JSON.stringify({ error: `HF API KEY failed (${response.status})` }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const result = await response.json();
    console.log("HF API KEY result:", result);

    const reply = result[0]?.generated_text || "Hmm... no reply 🤔";

    return new Response(
      JSON.stringify({ reply }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("GPT API error:", err);
    return new Response(
      JSON.stringify({ error: "Server error in GPT endpoint." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

export async function GET() {
  return new Response(JSON.stringify({ error: "Use POST instead" }), {
    status: 405,
    headers: { "Content-Type": "application/json" }
  });
}
