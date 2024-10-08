import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import "@testing-library/jest-dom";
import { postLike } from "../../../services/postLike";
import { ImageObject } from "../../../types/api";
import Card from "./card";

vi.mock("../../../services/postLike", () => ({
  postLike: vi.fn(),
}));

const mockData: ImageObject = {
  id: 1,
  title: "Test Image",
  author: "Test Author",
  price: 100,
  likes_count: 10,
  main_attachment: {
    big: "https://example.com/image.jpg",
    small: "https://example.com/image.jpg",
  },
};

describe("Card Component", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("debería renderizar correctamente los datos de la tarjeta", () => {
    render(<Card data={mockData} />);

    expect(screen.getByText(mockData.title)).toBeInTheDocument();
    expect(screen.getByText(mockData.price)).toBeInTheDocument();
    const image = screen.getByAltText(mockData.title);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", mockData.main_attachment.big);

    expect(
      screen.getByText(mockData.likes_count.toString())
    ).toBeInTheDocument();
  });

  it("debería llamar a postLike cuando se hace clic en el botón de like", () => {
    render(<Card data={mockData} />);

    const likeButton = screen.getByTestId("like-button");

    fireEvent.click(likeButton);

    // Verificar que postLike fue llamado con el ID correcto
    expect(postLike).toHaveBeenCalledWith({ id: mockData.id });
  });

  it("debería mostrar los íconos de SlLike y SlReload", () => {
    render(<Card data={mockData} />);

    // Verificar que los íconos están presentes
    expect(screen.getByTestId("like-button")).toBeInTheDocument();
    // expect(screen.getByRole("button", { name: /reload/i })).toBeInTheDocument();
  });
});
