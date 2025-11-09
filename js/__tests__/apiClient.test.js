const axios = require("axios");

jest.mock("axios", () => ({
  get: jest.fn(),
}));

afterEach(() => {
  jest.resetModules();
});

test("get birds list from api", async () => {
  const data = [
    {
      id_ave: 1,
      nombre_comun: "Pardalet de la Albufera",
      nombre_cientifico: "Pardaletus albuferae",
      descripcion: "Pardaleta de la Albufera",
      imagen_url: "./imgs/aves/pardaleta.jpg",
    },
  ];
  axios.get.mockResolvedValue({ data });
  const { getBirds } = require("../src/apiClient");
  const result = await getBirds();
  expect(axios.get).toHaveBeenCalledWith("http://127.0.0.1:9191/api.php");
  expect(result).toEqual(data);
});
