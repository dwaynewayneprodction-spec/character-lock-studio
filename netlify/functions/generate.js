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

    let modelUrl;
    let input;

    if (body.type === "image") {
      modelUrl =
        "https://api.replicate.com/v1/models/black-forest-labs/flux-kontext-pro/predictions";

      input = {
        prompt: body.prompt,
        input_image: body.file,
        aspect_ratio: "match_input_image"
      };
    } else if (body.type === "video") {
      modelUrl =
        "https://api.replicate.com/v1/models/bytedance/seedance-2.0-fast/predictions";

      input = {
        prompt: body.prompt,
        video: body.file,
        duration: 5
      };
    } else {
      modelUrl =
        "https://api.replicate.com/v1/models/black-forest-labs/flux-schnell/predictions";

      input = {
        prompt: body.prompt || "cinematic image"
      };
    }

    const response = await fetch(modelUrl, {
      method: "POST",
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
        Prefer: "wait"
      },
      body: JSON.stringify({ input })
    });

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
