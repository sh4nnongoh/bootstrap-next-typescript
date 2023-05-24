import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../app/highcharts/page";
const userStory = `
Given no inital state,
When user navigates to the highcharts page,
Then user sees the static information
`;
describe(userStory, () => {
  it("shows the static information", () => {
    render(<App />);
    expect(screen.getByRole("region", { name: "Toggle series visibility, Chart title" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Show Series 1" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "View chart menu, Chart title" })).toBeInTheDocument();
    const titleRegion = screen.getByRole("region", { name: "Chart title. Highcharts interactive chart." });
    expect(titleRegion).toBeInTheDocument();
    expect(titleRegion).toHaveTextContent("Chart title");
    expect(titleRegion).toHaveTextContent("Line chart with 3 data points.");
    expect(titleRegion).toHaveTextContent("The chart has 1 X axis displaying categories.");
    expect(titleRegion).toHaveTextContent("The chart has 1 Y axis displaying Values. Data ranges from 1 to 3.");
    expect(titleRegion).toHaveTextContent("Created with Highcharts");
  });
});
