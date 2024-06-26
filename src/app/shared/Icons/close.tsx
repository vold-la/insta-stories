import React from "react";

interface CloseIconProps {
  height?: string | number;
  width?: string | number;
  zIndex?: number;
}

const CloseIcon: React.FC<CloseIconProps> = ({
  height = 24,
  width = 24,
  zIndex = 0,
}) => {
  return (
    <svg
      fill="#000000"
      height={height}
      width={width}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      style={{ zIndex }}
    >
      <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10s10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17L12 13.41L8.41 17L7 15.59L10.59 12 L7 8.41L8.41 7L12 10.59L15.59 7L17 8.41L13.41 12L17 15.59z" />
    </svg>
  );
};

export default CloseIcon;
