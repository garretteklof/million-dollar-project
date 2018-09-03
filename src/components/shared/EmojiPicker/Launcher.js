import React from "react";
import { Launcher } from "./styles";
import Sprite from "../Sprite/";

const EmojiLauncher = ({ togglePicker }) => (
  <Launcher>
    <Sprite
      onMouseEnter={togglePicker}
      onClick={togglePicker}
      icon={"face-smile"}
    />
  </Launcher>
);

export default EmojiLauncher;
