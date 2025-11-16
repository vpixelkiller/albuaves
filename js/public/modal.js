const modalBackdrop = document.getElementById("modal-backdrop");
const addBirdForm = document.getElementById("add-bird-form");
const commonNameInput = document.getElementById("common-name-input");
const scientificNameInput = document.getElementById("scientific-name-input");
const descriptionInput = document.getElementById("description-input");
const imageUrlInput = document.getElementById("image-url-input");
const cancelButton = document.getElementById("cancel-button");
const modalErrorElement = document.getElementById("modal-error");
const addBirdButton = document.getElementById("add-bird-button");

export function setupAddBirdModal(apiUrl, onSuccess) {
  addBirdButton.addEventListener("click", () => {
    modalErrorElement.textContent = "";
    addBirdForm.reset();
    modalBackdrop.classList.remove("hidden");
  });

  cancelButton.addEventListener("click", () => {
    modalBackdrop.classList.add("hidden");
  });

  addBirdForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    modalErrorElement.textContent = "";

    const commonName = commonNameInput.value.trim();
    const scientificName = scientificNameInput.value.trim();
    const description = descriptionInput.value.trim();
    const imageUrl = imageUrlInput.value.trim();

    if (!commonName || !scientificName || !imageUrl) {
      modalErrorElement.textContent = "Common name, scientific name and image are required.";
      return;
    }

    if (!/\.png$/i.test(imageUrl) && !/\.jpe?g$/i.test(imageUrl)) {
      modalErrorElement.textContent = "Image must be PNG, JPG or JPEG.";
      return;
    }

    try {
      await validateImageDimensions(imageUrl);
    } catch (error) {
      modalErrorElement.textContent = error.message;
      return;
    }

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          common_name: commonName,
          scientific_name: scientificName,
          description,
          img_url: imageUrl,
        }),
      });
      if (!response.ok) {
        throw new Error("Request failed");
      }
      modalBackdrop.classList.add("hidden");
      if (typeof onSuccess === "function") {
        await onSuccess();
      }
    } catch (error) {
      modalErrorElement.textContent = "Could not save bird.";
    }
  });
}

function validateImageDimensions(url) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => {
      if (image.naturalWidth > 2048 || image.naturalHeight > 2048) {
        reject(new Error("Image size must not exceed 2048 px on any side."));
      } else {
        resolve();
      }
    };
    image.onerror = () => reject(new Error("Could not load image from the provided URL."));
    image.src = url;
  });
}


