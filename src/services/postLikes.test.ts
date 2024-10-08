import { postLike } from "./postLike";
import { post, HttpError } from "../api/httpsService";
import { vi, describe, it, expect, afterEach } from "vitest";

vi.mock("../api/httpsService", async (importActual) => {
  const actual = await importActual();
  return {
    ...actual,
    post: vi.fn(),
  };
});

describe("postLike", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("debería retornar una respuesta exitosa cuando la API responde correctamente", async () => {
    const mockResponse = { success: true };

    (post as vi.Mock).mockResolvedValue(mockResponse);

    const result = await postLike({ id: 1 });

    expect(result.isOk).toBe(true);
    expect(result.data).toEqual(mockResponse);
    expect(result.error).toBeNull();
  });

  it("debería retornar un error cuando la API falla", async () => {
    const mockError = new HttpError("Error en la API");

    (post as vi.Mock).mockRejectedValue(mockError);

    const result = await postLike({ id: 1 });

    expect(result.isOk).toBe(false);
    expect(result.data).toBeNull();
    expect(result.error).toBe(mockError.message);
  });
});
