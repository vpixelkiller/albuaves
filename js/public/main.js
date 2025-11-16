import { setupAddBirdModal } from "./modal.js";
import { createBirdCard } from "./birdCard.js";

const API_URL = "http://127.0.0.1:9191/php/api.php";
const statusElement = document.getElementById("status");
const listElement = document.getElementById("birds");

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
    const card = createBirdCard(bird);
    listElement.append(card);
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
setupAddBirdModal(API_URL, fetchBirds);
