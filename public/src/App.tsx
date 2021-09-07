import React from "react";
import { Quote } from "./components/Quote";

function App() {
  return (
    <>
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
    </>
  );
}

export default App;
