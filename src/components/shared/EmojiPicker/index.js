import React from "react";
import Picker from "./Picker";
import Launcher from "./Launcher";
import { Wrapper } from "./styles";

export default class EmojiPicker extends React.Component {
  state = {
    isOpen: false
  };

  handlePickerBlur = () => this.setState({ isOpen: false });

  togglePicker = e => {
    e.preventDefault();
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    const { isOpen } = this.state;
    const { onEmojiPicked } = this.props;
    return (
      <Wrapper>
        {isOpen && (
          <Picker
            onEmojiPicked={onEmojiPicked}
            onBlur={this.handlePickerBlur}
          />
        )}
        <Launcher togglePicker={this.togglePicker} />
      </Wrapper>
    );
  }
}
