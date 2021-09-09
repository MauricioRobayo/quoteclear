import React from "react";
import styled from "styled-components/macro";
import { useQuery } from "react-query";
import { QuoteLoader } from "./loaders";
import { linkStyle, smallText } from "../../styles/mixins";
import { getQuote } from "../../services/api";

const RefreshButton = styled.button`
  ${linkStyle}
`;
const Wrapper = styled.div`
  max-width: ${({ theme }) => theme.maxWidth};
  margin: 1rem 1rem 0;
  width: 100%;
`;
const StyledQuote = styled.figure`
  margin: 0;
`;
const FigCaption = styled.figcaption`
  ${smallText}
  display: flex;
  justify-content: space-between;
  padding: 1rem;
`;
const Actions = styled.div`
  & > *:not(:last-child) {
    margin-right: 1em;
  }
  display: flex;
`;
const Blockquote = styled.blockquote`
  font-size: 1.25rem;
  font-family: ${({ theme }) => theme.fontFamily.text1};
  line-height: 1.25em;
  font-weight: 300;
  color: ${({ theme }) => theme.colors.text1};
  background-color: ${({ theme }) => theme.colors.surface3};
  padding: 0.5rem 1rem;
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ theme }) => theme.colors.surfaceShadow} 2px 4px 6px 0px;
  margin: 0;
  p {
    margin: 0.5em 0;
  }
`;

export function Quote() {
  const { isFetching, error, data, refetch } = useQuery("repoData", getQuote, {
    staleTime: Infinity,
  });

  function getNewQuote() {
    refetch();
    window.gtag("event", "refresh", {
      event_category: "engagement",
      event_label: "new quote requested",
    });
  }

  if (error) {
    if (error instanceof Error) {
      return <div>An error has occurred: {error.message}</div>;
    }
    return <div>An error has occurred: {JSON.stringify(error, null, 2)}</div>;
  }

  return (
    <Wrapper>
      <StyledQuote>
        <Blockquote>
          {isFetching ? (
            <QuoteLoader />
          ) : (
            data.text
              .split("\n")
              .filter((line: string) => line.trim() !== "")
              .map((line: string, index: number) => <p key={index}>{line}</p>)
          )}
        </Blockquote>
        {isFetching ? null : (
          <FigCaption>
            <div>
              <a href={data.source}>
                {data.source.replace("https://jamesclear.com/", "")}
              </a>
            </div>
            <Actions>
              <RefreshButton type="button" onClick={getNewQuote}>
                Refresh
              </RefreshButton>
              <div>
                <a href={`https://ctt.ac/${data.cttId}`}>Tweet</a>
              </div>
            </Actions>
          </FigCaption>
        )}
      </StyledQuote>
    </Wrapper>
  );
}
