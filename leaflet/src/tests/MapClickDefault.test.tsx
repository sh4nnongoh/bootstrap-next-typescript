import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LeafletMap from "../pages/leaflet";
const userStory = `
Given no inital state,
When user navigates to the home page,
and clicks on the map,
Then user sees the primary pin
`;
describe(userStory, () => {
  beforeEach(async () => {
    render(<LeafletMap />);
    await waitFor(() => screen.findByText("Singapore Land Authority"));
  });
  afterEach(async () => {
    await waitFor(() => screen.findByTestId("render-count-map-1"));
    await waitFor(() => screen.findByTestId("render-count-map-layer-1"));
  });
  it("shows the primary pin only after user clicks on the map", async () => {
    const map = screen.getByRole("presentation");
    expect(screen.queryByAltText("primary-pin")).not.toBeInTheDocument();
    userEvent.click(map as Element);
    await waitFor(() => screen.findByAltText("primary-pin"));
  });
});
