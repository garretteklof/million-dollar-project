import styled from "styled-components";
import { COLORS } from "../Variables";

export const Wrapper = styled.div`
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  &:focus {
    outline: none;
  }
`;
export const Window = styled.div`
  position: absolute;
  bottom: 50px;
  right: 0px;
  width: 330px;
  max-height: 215px;
  box-shadow: 0px 7px 40px 2px rgba(148, 149, 150, 0.3);
  background: white;
  border-radius: 10px;
  outline: none;
  z-index: 1;
  &:after {
    content: "";
    width: 14px;
    height: 14px;
    background: white;
    position: absolute;
    bottom: -6px;
    right: 30px;
    transform: rotate(45deg);
    border-radius: 2px;
  }
`;

export const Content = styled.div`
  padding: 10px;
  overflow: auto;
  width: 100%;
  max-height: 195px;
  margin-top: 7px;
  box-sizing: border-box;
`;

export const Category = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  > p {
    min-width: 100%;
    color: #b8c3ca;
    font-weight: 200;
    font-size: 13px;
    margin: 5px;
    letter-spacing: 1px;
  }
`;

export const Emoji = styled.span`
  margin: 5px;
  width: 30px;
  line-height: 30px;
  text-align: center;
  cursor: pointer;
  vertical-align: middle;
  font-size: 28px;
  transition: transform 60ms ease-out, -webkit-transform 60ms ease-out;
  &:hover {
    transform: scale(1.4);
  }
`;

export const Launcher = styled.a`
  > svg {
    height: 2.5rem;
    width: 2.5rem;
    fill: lightgray;
    &:hover {
      fill: ${COLORS.gunmetal};
    }
  }
`;
