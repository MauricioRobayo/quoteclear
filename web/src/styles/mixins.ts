import { css } from "styled-components";

export const linkStyle = css`
  border: none;
  padding: 0 0 0.2em 0;
  background-color: transparent;
  color: ${({ theme }) => theme.colors.text1};
  font-weight: bold;
  text-decoration: none;
  border-bottom: 2px solid ${({ theme }) => theme.colors.surface4};
  cursor: pointer;
  display: inline-block;
  line-height: 1em;
  &:hover {
    border-bottom: 2px solid ${({ theme }) => theme.colors.brand};
  }
`;

export const smallText = css`
  &,
  * {
    font-size: 0.85rem;
    color: ${({ theme }) => theme.colors.text2};
  }
`;
