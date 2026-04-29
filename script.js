async function demo() {
  const fileInput = document.getElementById("fileInput");
  const prompt = document.getElementById("prompt").value;
  const status = document.getElementById("status");

  const file = fileInput.files[0];

  status.textContent = "Sending to AI...";

  let payload = {
    prompt: prompt || "cinematic edit, keep the same character"
  };

  if (file) {
    const isImage = file.type.startsWith("image/");
    const isVideo = file.type.startsWith("video/");

    if (isImage) {
      payload.type = "image";
      payload.file = await fileToDataURL(file);
    } else if (isVideo) {
      if (file.size > 4 * 1024 * 1024) {
        status.textContent =
          "Video is too large for this setup. Use a public video URL instead, or connect storage next.";
        return;
      }

      payload.type = "video";
      payload.file = await fileToDataURL(file);
    } else {
      status.textContent = "Upload an image or video only.";
      return;
    }
  } else {
    payload.type = "text";
  }

  const res = await fetch("/.netlify/functions/generate", {
    method: "POST",
    body: JSON.stringify(payload)
  });

  const data = await res.json();

  console.log(data);

  if (!res.ok) {
    status.textContent = "AI error: " + (data.error || JSON.stringify(data));
    return;
  }

  status.innerHTML =
    "AI job created. Open result here: " +
    `<a href="${data.urls?.get || data.urls?.web || '#'}" target="_blank">View Replicate job</a>`;
}

function fileToDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
