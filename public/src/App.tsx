import React from "react";
import { ThemeProvider } from "styled-components/macro";
import { Normalize } from "styled-normalize";
import { Quote } from "./components/Quote";
import usePreferredColorScheme from "./hooks/usePreferredColorScheme";
import { GlobalStyle, theme } from "./styles";

function App() {
  const preferredColorScheme = usePreferredColorScheme();
  return (
    <>
      <ThemeProvider theme={theme[preferredColorScheme]}>
        <Normalize />
        <GlobalStyle />
        <header>
          <h1>JAMES CLEAR QUOTES</h1>
          <div>
            <p>
              Taken from{" "}
              <a href="https://jamesclear.com/3-2-1">The 3-2-1 Newsletter</a>
            </p>
            <p>“The most wisdom per word of any newsletter on the web.”</p>
          </div>
        </header>
        <Quote />
      </ThemeProvider>
    </>
  );
}

export default App;
