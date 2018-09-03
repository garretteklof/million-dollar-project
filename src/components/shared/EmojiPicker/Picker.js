import React from "react";
import emoji from "./emoji";
import { Window, Content, Category, Emoji } from "./styles";

export default class Picker extends React.Component {
  componentDidMount() {
    const elem = this.emojiNode;
    elem.style.opacity = 0;
    window.requestAnimationFrame(() => {
      elem.style.transition = "opacity 100ms";
      elem.style.opacity = 1;
    });
    elem.focus();
  }

  render() {
    return (
      <Window
        onBlur={this.props.onBlur}
        innerRef={ref => {
          this.emojiNode = ref;
        }}
        tabIndex="0"
      >
        <Content>
          {emoji.map(({ category, emojis }) => (
            <Category key={category}>
              <p>{category}</p>
              {emojis.map(emoji => (
                <Emoji
                  key={emoji}
                  onClick={() => {
                    this.props.onEmojiPicked(emoji);
                    this.emojiNode.blur();
                  }}
                >
                  {emoji}
                </Emoji>
              ))}
            </Category>
          ))}
        </Content>
      </Window>
    );
  }
}
