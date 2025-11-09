const API_URL = "http://127.0.0.1:9191/api.php";
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
  return birds.map((bird) => {
   return {
      ...bird,
      imagen_url: resolveImageUrl(bird.imagen_url)
    }
  });
}

function renderBirds(birds) {
  listElement.innerHTML = "";
  birds.forEach((bird) => {
    const item = document.createElement("li");
    const image = document.createElement("img");
    image.src = bird.imagen_url || "";
    image.alt = bird.nombre_comun || "Bird";
    const details = document.createElement("div");
    details.className = "details";
    const commonName = document.createElement("div");
    commonName.className = "common-name";
    commonName.textContent = bird.nombre_comun || "Unknown bird";
    const scientificName = document.createElement("div");
    scientificName.className = "scientific-name";
    scientificName.textContent = bird.nombre_cientifico || "";
    const description = document.createElement("div");
    description.textContent = bird.descripcion || "";
    details.append(commonName, scientificName, description);
    if (image.src) {
      item.append(image);
    }
    item.append(details);
    listElement.append(item);
  });
}

function resolveImageUrl (birdImage) {
  const kko = birdImage.replace(/\/\//g, '/')

  try { 
    return new URL(kko, API_URL).href;
  } catch { 
    return '';
  }
}

fetchBirds();
