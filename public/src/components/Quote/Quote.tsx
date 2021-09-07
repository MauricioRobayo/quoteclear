import React from "react";
import styled from "styled-components/macro";
import { QueryClient, useQuery } from "react-query";
import { QuoteLoader } from "./loaders";
import { linkStyle } from "../../styles/mixins";

const RefreshButton = styled.button`
  ${linkStyle}
`;
const StyledQuote = styled.figure`
  margin: 0 0.5rem;
`;
const FigCaption = styled.figcaption`
  display: flex;
  justify-content: space-between;
  div {
    display: flex;
    & > div:not(:last-child) {
      margin-right: 1em;
    }
  }
`;
const Blockquote = styled.blockquote`
  font-size: 1.5rem;
  font-family: ${({ theme }) => theme.fontFamily.text1};
  line-height: 1.25em;
  font-weight: 300;
  color: ${({ theme }) => theme.colors.text2};
  background-color: ${({ theme }) => theme.colors.surface2};
  padding: 1em 0.75em;
  border-radius: ${({ theme }) => theme.borderRadius};
  max-width: ${({ theme }) => theme.maxWidth};
  margin: 2rem 0 1rem 0;
  width: 100%;
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
  const { isLoading, error, data, refetch } = useQuery(
    "repoData",
    async () => {
      const response = await fetch("/api/randomQuote");
      if (!response.ok) {
        throw new Error("Request failed!");
      }
      return response.json();
    },
    {
      refetchOnWindowFocus: false,
      enabled: false,
    }
  );

  function newQuote() {
    refetch();
  }

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
      <FigCaption>
        <div>
          <div>
            <a href={data.source}>Source</a>
          </div>
          <div>
            <RefreshButton type="button" onClick={newQuote}>
              Refresh
            </RefreshButton>
          </div>
        </div>
        <div>
          <a href={`https://ctt.ac/${data.cttId}`}>Tweet</a>
        </div>
      </FigCaption>
    </StyledQuote>
  );
}
