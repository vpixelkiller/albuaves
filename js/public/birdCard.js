export function createBirdCard(bird) {
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

  return item;
}


