import React from "react";
import Button from "../../shared/Button/";
import Sprite from "../../shared/Sprite/";

const ChatToggle = ({ onToggle }) => (
  <Button chat onClick={onToggle}>
    <Sprite icon={"chat"} />
  </Button>
);

export default ChatToggle;
