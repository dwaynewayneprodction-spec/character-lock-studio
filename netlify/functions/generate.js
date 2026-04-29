export async function handler(event) {
  const REPLICATE_API_TOKEN = process.env.REPLICATE_API_TOKEN;

  const { prompt } = JSON.parse(event.body);

  const response = await fetch("https://api.replicate.com/v1/predictions", {
    method: "POST",
    headers: {
      "Authorization": `Token ${REPLICATE_API_TOKEN}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      version: "black-forest-labs/flux-1.1-pro",
      input: {
        prompt: prompt
      }
    })
  });

  const data = await response.json();

  return {
    statusCode: 200,
    body: JSON.stringify(data)
  };
}
