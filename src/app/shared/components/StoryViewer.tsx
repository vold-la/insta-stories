import React, { useEffect, useState, useCallback } from 'react';
import Image from "next/image";
import CloseIcon from '../Icons/close';

interface Story {
  id: number;
  imageUrl: string;
  duration: number;
}

interface StoryViewerProps {
  stories: Story[];
  initialIndex: number;
  onClose: () => void;
  onStoryChange: (index: number) => void;
}

const StoryViewer: React.FC<StoryViewerProps> = ({ stories, initialIndex, onClose, onStoryChange }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const fallbackDuration = 5000;

  const updateIndex = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % stories.length);
  }, [stories.length]);

  useEffect(() => {
    const timer = setInterval(updateIndex, stories[currentIndex]?.duration || fallbackDuration);
    return () => clearInterval(timer);
  }, [currentIndex, stories, updateIndex]);

  const handleStoryChange = () => {
    onStoryChange(currentIndex);
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;

    if(currentIndex === stories.length - 1){
      onClose();
    }

    if (x < rect.width / 2) {
      setCurrentIndex((prevIndex) => (prevIndex === 0 ? stories.length - 1 : prevIndex - 1));
    } else {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % stories.length);
    }

    handleStoryChange(); // Call onStoryChange when story changes
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full bg-black z-50 flex items-center justify-center" onClick={handleClick}>
        <div className="relative w-full h-full">
          <div className="absolute top-4 left-4 right-4 z-10 flex justify-between items-center">
            {stories.map((story, index) => (
              <div key={index} className="flex-1 mx-1 bg-gray-400 h-1">
                <div
                  className={`${currentIndex < index ? 'bg-gray-400' : 'bg-white'} h-full `}
                  style={{ animation: currentIndex === index ? `progress ${story.duration}ms linear` : 'none' }}
                />
              </div>
            ))}
            <button className="text-black px-2 py-1 rounded" onClick={onClose}>
              <CloseIcon height={24} width={24} />
            </button>
          </div>
          {stories.map((story, index) => (
            <Image
              key={story.id}
              width={100}
              height={100}
              src={story.imageUrl}
              alt={`Story ${story.id}`}
              className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-[${story.duration || fallbackDuration}ms] ${currentIndex === index ? 'opacity-100' : 'opacity-0'}`}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default StoryViewer;
