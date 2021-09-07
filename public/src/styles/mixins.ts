import { css } from "styled-components";

export const linkStyle = css`
  border: none;
  margin: 0;
  padding: 0;
  background-color: transparent;
  color: ${({ theme }) => theme.colors.text1};
  font-weight: bold;
  text-decoration: none;
  border-bottom: 2px solid ${({ theme }) => theme.colors.surface4};
  cursor: pointer;
`;

export const smallText = css`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.text2};
`;
