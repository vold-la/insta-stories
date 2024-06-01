import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import StoriesList from "../components/StoriesList";

// Mock fetch to return a list of user stories
beforeAll(() => {
  jest.spyOn(global, "fetch").mockResolvedValue({
    json: async () => [
      {
        userId: 1,
        userProfileImage: "/images/user1.jpg",
        stories: [
          { id: 1, imageUrl: "/images/story1.jpg", duration: 5000 },
          { id: 2, imageUrl: "/images/story2.jpg", duration: 5000 },
        ],
      },
      {
        userId: 2,
        userProfileImage: "/images/user2.jpg",
        stories: [
          { id: 3, imageUrl: "/images/story3.jpg", duration: 5000 },
          { id: 4, imageUrl: "/images/story4.jpg", duration: 5000 },
        ],
      },
    ],
  } as Response);
});

afterAll(() => {
  jest.restoreAllMocks();
});

describe("StoriesList", () => {
  it("renders user profiles and opens story viewer on click", async () => {
    render(<StoriesList />);

    // Check if user profile images are displayed
    const user1ProfileImage = await screen.findByAltText("User 1");
    expect(user1ProfileImage).toBeInTheDocument();

    const user2ProfileImage = await screen.findByAltText("User 2");
    expect(user2ProfileImage).toBeInTheDocument();

    // Simulate clicking on the first user's profile image
    fireEvent.click(user1ProfileImage);

    // Check if the story viewer is displayed
    await waitFor(() => {
      expect(screen.getByAltText("Story 1")).toBeInTheDocument();
    });

    // Simulate clicking the close button in the story viewer
    fireEvent.click(screen.getByText("Close"));

    // Check if the story viewer is closed
    await waitFor(() => {
      expect(screen.queryByAltText("Story 1")).not.toBeInTheDocument();
    });
  });
});
