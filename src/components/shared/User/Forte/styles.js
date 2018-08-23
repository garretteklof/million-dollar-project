import styled from "styled-components";

import { FORTE_PROP_BG } from "../../Variables";

export const Container = styled.div`
  ${FORTE_PROP_BG};
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  > svg {
    height: 3rem;
    width: 3rem;
  }
`;
