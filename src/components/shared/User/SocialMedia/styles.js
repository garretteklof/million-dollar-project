import styled from "styled-components";

import { FORTE_PROP_BG } from "../../Variables";

export const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 0.5rem 0;
`;

export const SpriteShape = styled.div`
  ${FORTE_PROP_BG};
  height: 2.25rem;
  width: 2.25rem;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  &:not(:first-of-type) {
    margin-left: 0.5rem;
  }
  &:not(:last-of-type) {
    margin-right: 0.5rem;
  }
  > svg {
    height: 1.25rem;
    width: 1.25rem;
    fill: white;
  }
`;
