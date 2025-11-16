const axios = require("axios");

const baseUrl = process.env.API_BASE_URL || "http://127.0.0.1:9191/api.php";

async function getBirds() {
  const response = await axios.get(baseUrl);
  console.log(response.data);
  return response.data;
}

module.exports = { getBirds };
