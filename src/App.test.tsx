import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

beforeAll(() => jest.spyOn(window, "fetch"));

test("<App/> snapshot", () => {
  const wrapper = render(<App />);
  expect(wrapper).toMatchSnapshot();
});

test("fetch data from API on page load", async () => {
  render(<App />);

  (window.fetch as jest.Mock).mockResolvedValueOnce({
    ok: true,
    json: async () => ({ success: true }),
  });

  expect(window.fetch).toHaveBeenCalledWith(
    process.env.REACT_APP_API_URL,
    expect.objectContaining({
      method: "GET",
    })
  );

  expect(window.fetch).toHaveBeenCalledTimes(1);
});
