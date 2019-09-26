import styled from "styled-components";
import style from "./style";

const LinkTo = styled.a`
  color: ${style.color};
  text-decoration: none;
  background-color: transparent;
  &:hover {
    color: ${style.hoverColor};
  }
`;

export default LinkTo;
