async function demo() {
  const prompt = document.getElementById("prompt").value;
  const status = document.getElementById("status");

  status.textContent = "Sending to AI...";

  const res = await fetch("/.netlify/functions/generate", {
    method: "POST",
    body: JSON.stringify({ prompt })
  });

  const data = await res.json();

  console.log(data);
  status.textContent = "AI request sent. Check Replicate predictions for the result.";
}
