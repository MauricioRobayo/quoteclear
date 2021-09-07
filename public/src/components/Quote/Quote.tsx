import React from "react";
import styled from "styled-components/macro";
import { useQuery } from "react-query";
import { QuoteLoader } from "./loaders";

const StyledQuote = styled.figure`
  margin: 0 0.5rem;
`;
const Blockquote = styled.blockquote`
  font-family: ${({ theme }) => theme.fontFamily.text1};
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.text2};
  background-color: ${({ theme }) => theme.colors.surface2};
  padding: 1em 0.75em;
  border-radius: ${({ theme }) => theme.borderRadius};
  line-height: 1.25em;
  max-width: ${({ theme }) => theme.maxWidth};
  margin: 2rem 0 1rem 0;
  width: 100%;
  font-weight: 300;
  &::before,
  &::after {
    opacity: 0.75;
    font-size: 1.25em;
  }
  &::before {
    content: "“";
  }
  &::after {
    content: "”";
  }
`;

export function Quote() {
  const { isLoading, error, data } = useQuery("repoData", async () => {
    const response = await fetch("/api/randomQuote");
    if (!response.ok) {
      throw new Error("Request failed!");
    }
    return response.json();
  });

  if (isLoading) return <QuoteLoader />;

  if (error) {
    if (error instanceof Error) {
      return <div>An error has occurred: {error.message}</div>;
    }
    return <div>An error has occured: {JSON.stringify(error, null, 2)}</div>;
  }

  return (
    <StyledQuote>
      <Blockquote>{data.text}</Blockquote>
      <figcaption>
        <div>
          <a href={`https://ctt.ac/${data.cttId}`}>Tweet</a>
        </div>
      </figcaption>
    </StyledQuote>
  );
}
