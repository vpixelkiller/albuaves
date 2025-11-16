const API_URL = "http://127.0.0.1:9191/php/api.php";
const statusElement = document.getElementById("status");
const listElement = document.getElementById("birds");
const addBirdButton = document.getElementById("add-bird-button");
const modalBackdrop = document.getElementById("modal-backdrop");
const addBirdForm = document.getElementById("add-bird-form");
const commonNameInput = document.getElementById("common-name-input");
const scientificNameInput = document.getElementById("scientific-name-input");
const descriptionInput = document.getElementById("description-input");
const imageUrlInput = document.getElementById("image-url-input");
const cancelButton = document.getElementById("cancel-button");
const modalErrorElement = document.getElementById("modal-error");

async function fetchBirds() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    const birds = await response.json();
    const cleanedBirds = cleanBirds(birds);

    renderBirds(Array.isArray(cleanedBirds) ? cleanedBirds : []);
    statusElement.textContent = `Loaded ${Array.isArray(birds) ? birds.length : 0} birds`;
  } catch (error) {
    statusElement.textContent = "Error loading birds";
    listElement.innerHTML = `<li>${error.message}</li>`;
  }
}

function cleanBirds(birds) {
  if (!Array.isArray(birds)) {
    return [];
  }
  return birds.map((bird) => ({
    ...bird,
    img_url: resolveImageUrl(bird.img_url),
  }));
}

function renderBirds(birds) {
  listElement.innerHTML = "";
  birds.forEach((bird) => {
    const item = document.createElement("li");
    const image = document.createElement("img");
    image.src = bird.img_url || "";
    image.alt = bird.common_name || "Bird";
    const details = document.createElement("div");
    details.className = "details";
    const commonName = document.createElement("div");
    commonName.className = "common-name";
    commonName.textContent = bird.common_name || "Unknown bird";
    const scientificName = document.createElement("div");
    scientificName.className = "scientific-name";
    scientificName.textContent = bird.scientific_name || "";
    const description = document.createElement("div");
    description.textContent = bird.description || "";
    details.append(commonName, scientificName, description);
    if (image.src) {
      item.append(image);
    }
    item.append(details);
    listElement.append(item);
  });
}

function resolveImageUrl(birdImage) {
  if (!birdImage || typeof birdImage !== "string") {
    return "";
  }
  const normalised = birdImage.replace(/\/\//g, "/");
  try {
    return new URL(normalised, API_URL).href;
  } catch {
    return "";
  }
}

fetchBirds();

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
    const response = await fetch(API_URL, {
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
    await fetchBirds();
  } catch (error) {
    modalErrorElement.textContent = "Could not save bird.";
  }
});

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
