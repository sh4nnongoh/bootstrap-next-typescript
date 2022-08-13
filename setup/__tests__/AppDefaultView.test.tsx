import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../pages";
const userStory = `
Given no inital state,
When user navigates to the web page,
Then user sees the static information
`;
describe(userStory, () => {
  render(<App />);
  it("shows the phrase Next.js!", () => {
    const linkElement = screen.getByText(/Next.js!/i);
    expect(linkElement).toBeInTheDocument();
  });
});
