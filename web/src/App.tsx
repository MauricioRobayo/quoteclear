import React from "react";
import styled, { ThemeProvider } from "styled-components/macro";
import { Normalize } from "styled-normalize";
import { Quote } from "./components/Quote";
import usePreferredColorScheme from "./hooks/usePreferredColorScheme";
import { GlobalStyle, theme } from "./styles";
import { smallText } from "./styles/mixins";

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.header`
  margin-top: 2rem;
  text-align: center;
  font-family: ${({ theme }) => theme.fontFamily.text2};
`;

const Title = styled.h1`
  letter-spacing: 0.1em;
  font-size: 1.25rem;
  font-weight: normal;
  text-align: center;
  font-weight: bold;
  display: flex;
  justify-content: center;
  span {
    letter-spacing: 0;
    font-weight: normal;
    font-size: 0.85rem;
    margin-left: 0.25em;
  }
`;

const Flip = styled.span`
  display: Inline-block;
  transform: scale(-1, 1);
`;

const Main = styled.main`
  display: flex;
  max-width: ${({ theme }) => theme.maxWidth};
  width: 97.5%;
`;

const Footer = styled.footer`
  * {
    ${smallText}
    margin: 0.5rem 0;
  }
  flex: 1;
  padding-bottom: 1rem;
  text-align: center;
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
`;

function App() {
  const preferredColorScheme = usePreferredColorScheme();
  return (
    <ThemeProvider theme={theme[preferredColorScheme]}>
      <Normalize />
      <GlobalStyle />
      <Wrapper>
        <Header>
          <Title>
            JAMES CLEAR{" "}
            <span>
              <Flip>Q</Flip>UOTES
            </span>
          </Title>
          <div>
            <p>
              from <a href="https://jamesclear.com/3-2-1">3-2-1 Newsletter</a>
            </p>
          </div>
        </Header>
        <Main>
          <Quote />
        </Main>
        <Footer>
          <p>
            <a href="https://james-clear-quotes.web.app/api/random">JSON API</a>
          </p>
          <p>
            This is an{" "}
            <a href="https://github.com/MauricioRobayo/james-clear-quotes">
              open source
            </a>{" "}
            project.
          </p>
        </Footer>
      </Wrapper>
    </ThemeProvider>
  );
}

export default App;
