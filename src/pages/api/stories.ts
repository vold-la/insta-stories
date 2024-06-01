import { NextApiRequest, NextApiResponse } from "next";

type Story = {
  id: number;
  imageUrl: string;
  duration: number;
};

type UserData = {
  userId: number;
  userProfileImage: string;
  stories: Story[];
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<UserData[]>,
) {
  const { users = 3, duration } = req.query;

  const usersData: UserData[] = Array.from(
    { length: Number(users) },
    (_, index) => ({
      userId: index + 1,
      userProfileImage: `https://picsum.photos/300/200?random=${index + 1}`,
      stories: Array.from(
        { length: Math.floor(Math.random() * 5) + 1 },
        (_, storyIndex) => ({
          // Random number of stories per user (1 to 5)
          id: storyIndex + 1,
          imageUrl: `https://picsum.photos/300/200?random=${Math.floor(Math.random() * 100) + 1}`, // Random image URL
          duration: Number(duration) || 3000,
        }),
      ),
    }),
  );

  res.status(200).json(usersData);
}
