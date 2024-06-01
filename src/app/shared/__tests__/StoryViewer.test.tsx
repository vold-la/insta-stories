import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import StoryViewer from "../components/StoryViewer";

const stories = [
  { id: 1, imageUrl: "/images/story1.jpg", duration: 5000 },
  { id: 2, imageUrl: "/images/story2.jpg", duration: 5000 },
];

describe("StoryViewer", () => {
  it("displays stories and navigates through them", async () => {
    render(
      <StoryViewer
        stories={stories}
        initialIndex={0}
        onClose={jest.fn()}
        onStoryChange={jest.fn()}
      />,
    );

    // Check if the first story is displayed
    const firstStoryImage = await screen.findByAltText("Story 1");
    expect(firstStoryImage).toBeInTheDocument();

    // Simulate clicking on the right side to go to the next story
    fireEvent.click(screen.getByRole("img"));

    // Check if the second story is displayed
    await waitFor(() => {
      expect(screen.getByAltText("Story 2")).toBeInTheDocument();
    });

    // Simulate clicking on the left side to go back to the first story
    fireEvent.click(screen.getByRole("img", { name: /Story 2/i }));

    // Check if the first story is displayed again
    await waitFor(() => {
      expect(screen.getByAltText("Story 1")).toBeInTheDocument();
    });
  });
});
