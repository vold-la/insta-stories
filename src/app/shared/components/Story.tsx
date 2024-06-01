import React, { useEffect } from "react";
import Image from "next/image";

type StoryProps = {
  imageUrl: string;
  duration: number;
  onNext: () => void;
};

const Story: React.FC<StoryProps> = ({ imageUrl, duration, onNext }) => {
  useEffect(() => {
    const timer = setTimeout(onNext, duration);
    return () => clearTimeout(timer);
  }, [duration, onNext]);

  return (
    <div className="story">
      <Image
        width={100}
        height={100}
        src={imageUrl}
        alt="Story"
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default Story;
