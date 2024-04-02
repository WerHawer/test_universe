import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../App.tsx";

jest.mock("../envVariables", () => ({
  envVariables: { API_KEY: "1ds5f135s1f35sd15f135s" },
}));

jest.mock("react-pdf/dist/esm/Page/AnnotationLayer.css", () => ({}));
jest.mock("react-pdf/dist/esm/Page/TextLayer.css", () => ({}));

jest.mock("axios", () => ({
  post: jest.fn(() =>
    Promise.resolve({
      data: "data",
    }),
  ),
  defaults: {
    baseURL: "",
  },
}));

describe("should convert user test to PDF and show it", () => {
  it("should convert user test to PDF and show it", async () => {
    render(<App />);

    const input = await screen.findByTestId("textarea");
    const submitButton = await screen.findByTestId("submit-button");
    const historyItem = await screen.findByTestId("history");
    const historyList = await screen.findByTestId("history-list");
    const historyEmpty = await screen.findByTestId("history-empty");

    expect(input).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
    expect(historyItem).toBeInTheDocument();
    expect(historyList).toBeInTheDocument();
    expect(historyEmpty).toBeInTheDocument();

    fireEvent.change(input, { target: { value: "Hello, world!" } });

    expect(input).toHaveValue("Hello, world!");

    fireEvent.click(submitButton);

    const pdfContainer = await screen.findByTestId("pdf-container");
    const resetButton = await screen.findByTestId("reset-button");
    const historyItem2 = await screen.findByTestId("history-item");

    expect(pdfContainer).toBeInTheDocument();
    expect(resetButton).toBeInTheDocument();
    expect(historyItem2).toBeInTheDocument();

    expect(input).not.toBeInTheDocument();
    expect(submitButton).not.toBeInTheDocument();
    expect(historyEmpty).not.toBeInTheDocument();

    fireEvent.click(resetButton);

    const input2 = await screen.findByTestId("textarea");
    const submitButton2 = await screen.findByTestId("submit-button");

    expect(input2).toBeInTheDocument();
    expect(submitButton2).toBeInTheDocument();
    expect(pdfContainer).not.toBeInTheDocument();
    expect(resetButton).not.toBeInTheDocument();

    fireEvent.click(historyItem2);

    const pdfContainer2 = await screen.findByTestId("pdf-container");

    expect(pdfContainer2).toBeInTheDocument();
  });
});
