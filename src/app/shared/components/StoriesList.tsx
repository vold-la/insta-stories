import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';

const FullScreenStoryViewer = React.lazy(() => import('./StoryViewer'));

interface Story {
  id: number;
  imageUrl: string;
  duration: number;
}

interface UserData {
  userId: number;
  userProfileImage: string;
  stories: Story[];
}

const StoriesList: React.FC = () => {
  const [usersData, setUsersData] = useState<UserData[]>([]);
  const [showFullScreenViewer, setShowFullScreenViewer] = useState(false);
  const [selectedUserData, setSelectedUserData] = useState<UserData | null>(null);
  const [lastViewedIndexes, setLastViewedIndexes] = useState<{ [key: number]: number }>({});
  const [showSelection, setShowSelection] = useState(false);

  const userCount = 6; // update this to increase user's story
  const duration = 3000; // this is for story visibility in ms
  const selectionDuration = 1500; // duration for which the selection indicator is visible

  const abortControllerRef = useRef<AbortController | null>(null);
  let hideSelectionTimeout: NodeJS.Timeout;

  useEffect(() => {
    abortControllerRef.current = new AbortController();

    const fetchStories = async () => {
      try {
        const response = await fetch(`/api/stories?users=${userCount}&duration=${duration}`, {
          signal: abortControllerRef.current?.signal,
        });
        if (!response.ok) {
          throw new Error(`Failed to fetch stories: ${response.status}`);
        }
        const data: UserData[] = await response.json();
        setUsersData(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchStories();

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  useEffect(() => {
    return () => {
      clearTimeout(hideSelectionTimeout);
    };
  }, []);

  const handleCloseFullScreenViewer = () => {
    setShowFullScreenViewer(false);
  };

  const handleProfileClick = (userData: UserData) => {
    setSelectedUserData(userData);
    setShowFullScreenViewer(true);
    setShowSelection(true);
    hideSelectionTimeout = setTimeout(() => setShowSelection(false), selectionDuration);
  };

  const handleStoryChange = (index: number) => {
    if (selectedUserData) {
      setLastViewedIndexes({ ...lastViewedIndexes, [selectedUserData.userId]: index });
    }
  };

  const getLastViewedIndex = (userId: number) => {
    return lastViewedIndexes[userId] || 0;
  };

  return (
    <>
      <div className="flex items-center pt-10 pb-10 justify-center h-full overflow-x-auto">
        {usersData.map((userData) => (
          <div key={userData.userId} className="relative ml-4" onClick={() => handleProfileClick(userData)}>
            <div className="w-20 h-20 rounded-full overflow-hidden cursor-pointer relative">
              <Image src={userData.userProfileImage} width={80} height={80} alt={`User ${userData.userId}`} className="w-full h-full object-cover" />
            </div>
            {showSelection && selectedUserData?.userId === userData.userId && (
              <div className="absolute top-0 left-0 w-20 h-20 rounded-full border-4 border-pink-500"></div>
            )}
          </div>
        ))}
      </div>
      {showFullScreenViewer && selectedUserData?.stories && (
        <React.Suspense fallback={<></>}>
          <FullScreenStoryViewer
            initialIndex={getLastViewedIndex(selectedUserData.userId)}
            stories={selectedUserData.stories}
            onClose={handleCloseFullScreenViewer}
            onStoryChange={handleStoryChange}
          />
        </React.Suspense>
      )}
    </>
  );
};

export default StoriesList;
