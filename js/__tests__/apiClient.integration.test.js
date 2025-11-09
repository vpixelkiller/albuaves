const nock = require("nock");

jest.setTimeout(10000);

describe("integración con la API PHP", () => {
  afterEach(() => {
    nock.cleanAll();
  });

  test("obtiene la lista real de aves", async () => {
    const payload = [
      {
        id_ave: 1,
        nombre_comun: "Pardalet de la Albufera",
        nombre_cientifico: "Pardaletus albuferae",
        descripcion: "Pardaleta de la Albufera",
        imagen_url: "./imgs/aves/pardaleta.jpg",
      },
    ];

    nock("http://127.0.0.1:9191").get("/api.php").reply(200, payload);

    const { getBirds } = require("../src/apiClient");
    const birds = await getBirds();
    expect(Array.isArray(birds)).toBe(true);
    expect(birds.length).toBe(1);
    expect(birds[0]).toEqual(payload[0]);
  });
});
