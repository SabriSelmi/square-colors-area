import React from "react";
import "./FancyButton.css";

interface FancyButtonProps {
  onClick: (e : React.MouseEvent<HTMLButtonElement>) => void;
  label: string;
  className? : string;
}

const FancyButton: React.FC<FancyButtonProps> = ({ onClick, label, className }) => {
  return (
    <button className={"fancy-button " + className} onClick={onClick}>
      {label}
    </button>
  );
};

export default FancyButton;
