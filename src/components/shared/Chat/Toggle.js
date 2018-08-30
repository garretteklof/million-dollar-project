import React from "react";
import Avatar from "./Avatar";
import Button from "../../shared/Button/";
import Sprite from "../../shared/Sprite/";

const ChatToggle = ({ onToggle, isOpen, recipients }) => (
  <Button chat onClick={onToggle}>
    {isOpen ? <Avatar recipients={recipients} /> : <Sprite icon={"chat"} />}
  </Button>
);

export default ChatToggle;
