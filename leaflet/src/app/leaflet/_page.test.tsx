import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LeafletMap from './page';
const userStory = `
Given no inital state,
When user navigates to the home page,
and clicks on the map,
Then user sees the primary pin
`;
describe(userStory, () => {
  afterEach(async () => {
    await waitFor(() => screen.findByTestId('render-count-map-1'));
    await waitFor(() => screen.findByTestId('render-count-map-layer-1'));
  });
  it('shows the primary pin only after user clicks on the map', async () => {
    render(<LeafletMap />);
    await waitFor(() => screen.findByText('Singapore Land Authority'));
    expect(screen.queryByAltText('primary-pin')).not.toBeInTheDocument();
    userEvent.click(screen.getAllByRole('presentation')[0]);
    await waitFor(() => screen.findByAltText('primary-pin'));
  });
});
