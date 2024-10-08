import { HttpError, get, post } from "./httpsService";
import { vi, describe, it, expect, afterEach } from "vitest";

global.fetch = vi.fn();

describe("httpsService", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("HttpError", () => {
    it("debería crear un error con el mensaje y código de estado correctos", () => {
      const errorMessage = "Not Found";
      const statusCode = 404;
      const error = new HttpError(errorMessage, statusCode);

      expect(error.message).toBe(errorMessage);
      expect(error.statusCode).toBe(statusCode);
      expect(error.name).toBe("HttpError");
    });
  });

  describe("get", () => {
    it("debería realizar una solicitud GET correctamente y retornar datos", async () => {
      const mockResponse = { success: true };

      (fetch as vi.Mock).mockResolvedValue({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await get("http://example.com/api");

      expect(fetch).toHaveBeenCalledWith("http://example.com/api", undefined);
      expect(result).toEqual(mockResponse);
    });

    it("debería lanzar un HttpError si la respuesta no es exitosa", async () => {
      const mockStatus = 500;
      const mockStatusText = "Internal Server Error";

      (fetch as vi.Mock).mockResolvedValue({
        ok: false,
        status: mockStatus,
        statusText: mockStatusText,
      });

      await expect(get("http://example.com/api")).rejects.toThrow(HttpError);
      await expect(get("http://example.com/api")).rejects.toThrow(
        `HTTP Error: ${mockStatus} - ${mockStatusText}`
      );
    });
  });

  describe("post", () => {
    it("debería realizar una solicitud POST correctamente y retornar datos", async () => {
      const mockResponse = { success: true };
      const postData = { name: "John Doe" };

      (fetch as vi.Mock).mockResolvedValue({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await post("http://example.com/api", postData);

      expect(fetch).toHaveBeenCalledWith(
        "http://example.com/api",
        expect.objectContaining({
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(postData),
        })
      );
      expect(result).toEqual(mockResponse);
    });

    it("debería lanzar un HttpError si la respuesta POST falla", async () => {
      const mockStatus = 400;
      const mockStatusText = "Bad Request";
      const postData = { name: "John Doe" };

      (fetch as vi.Mock).mockResolvedValue({
        ok: false,
        status: mockStatus,
        statusText: mockStatusText,
      });

      await expect(post("http://example.com/api", postData)).rejects.toThrow(
        HttpError
      );
      await expect(post("http://example.com/api", postData)).rejects.toThrow(
        `HTTP Error: ${mockStatus} - ${mockStatusText}`
      );
    });
  });
});
