import { css } from "styled-components";

export const linkStyle = css`
  border: none;
  margin: 0;
  padding: 0;
  background-color: transparent;
  color: ${({ theme }) => theme.colors.text1};
  font-weight: bold;
  text-decoration-color: ${({ theme }) => theme.colors.surface4};
  text-underline-offset: 0.15em;
  text-decoration-thickness: 0.15em;
`;

export const smallText = css`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.text2};
`;
