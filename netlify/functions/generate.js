export async function handler(event) {
  try {
    const token = process.env.REPLICATE_API_TOKEN;
    const body = JSON.parse(event.body || "{}");

    if (!token) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Missing REPLICATE_API_TOKEN" })
      };
    }

    const response = await fetch(
      "https://api.replicate.com/v1/models/black-forest-labs/flux-schnell/predictions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Prefer: "wait"
        },
        body: JSON.stringify({
          input: {
            prompt: body.prompt || "cinematic image"
          }
        })
      }
    );

    const data = await response.json();

    return {
      statusCode: response.status,
      body: JSON.stringify(data)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
}
