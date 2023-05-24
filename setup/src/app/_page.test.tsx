import { render, screen } from '@testing-library/react';
import App from './page';
const userStory = `
Given no inital state,
When user navigates to the home page,
Then user sees the static information
`;
describe(userStory, () => {
  it('shows the static information', () => {
    render(<App />);
    expect(screen.getByText('Get started by editing')).toBeInTheDocument();
  });
});
