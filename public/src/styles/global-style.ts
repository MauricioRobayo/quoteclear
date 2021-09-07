import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  body {
    color: ${({ theme }) => theme.colors.text1};
    font-family: ${({ theme }) => theme.fontFamily.text2};
    background-color: ${({ theme }) => theme.colors.surface1};
  }
  a {
    color: ${({ theme }) => theme.colors.brand};
  }
`;
