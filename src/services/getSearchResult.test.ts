import { get, HttpError } from "../api/httpsService";
import { SearchApiResponse } from "../types/api";
import { vi, describe, it, expect, afterEach } from "vitest";
import { getSearchResults } from "./getSearchResult";
vi.mock("../api/httpsService", async (importActual) => {
  const actual = await importActual(); // Importa el módulo original

  return {
    ...actual,
    get: vi.fn(),
  };
});

describe("getSearchResults", () => {
  afterEach(() => {
    vi.clearAllMocks(); // Limpia los mocks después de cada prueba
  });

  it("debería retornar una respuesta exitosa cuando la API responde correctamente", async () => {
    const mockResponse: SearchApiResponse = {
      images: [{ id: "1", url: "http://example.com/image1.jpg" }],
    };

    (get as vi.Mock).mockResolvedValue(mockResponse);

    const result = await getSearchResults();

    expect(result.isOk).toBe(true);
    expect(result.data).toEqual(mockResponse);
    expect(result.error).toBeNull();
  });

  it("debería retornar un error cuando la API falla", async () => {
    // Definir el error mock
    const mockError = new HttpError("Error en la API");

    (get as vi.Mock).mockRejectedValue(mockError);

    const result = await getSearchResults();

    expect(result.isOk).toBe(false);
    expect(result.data).toBeNull();
    expect(result.error).toBe(mockError.message);
  });
});
