function demo() {
  const file = document.getElementById("fileInput").files[0];
  const prompt = document.getElementById("prompt").value;
  const status = document.getElementById("status");

  if (!file) {
    status.textContent = "Upload an image or video first.";
    return;
  }

  status.textContent =
    "Demo received: " + file.name + ". The AI backend/GPU engine gets connected in the next build step.";
}
