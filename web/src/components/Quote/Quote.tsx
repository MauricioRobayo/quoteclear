import React from "react";
import styled from "styled-components/macro";
import { useQuery } from "react-query";
import { QuoteLoader } from "./loaders";
import { linkStyle, smallText } from "../../styles/mixins";
import { getQuote } from "../../services/api";
import { VscRefresh, VscTwitter } from "react-icons/vsc";

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
const Cite = styled.cite`
  ${smallText}

  font-style: normal;
`;
const Action = styled.div`
  * {
    border: none;
  }
  *:hover {
    border: none;
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
        <Blockquote cite={data?.source || ""}>
          {isFetching || !data ? (
            <QuoteLoader />
          ) : (
            data.text
              .split("\n")
              .filter((line: string) => line.trim() !== "")
              .map((line: string, index: number) => <p key={index}>{line}</p>)
          )}
        </Blockquote>
        {data ? (
          <FigCaption>
            <Cite>
              <a href={data.source}>
                {data.source.replace("https://jamesclear.com/", "")}
              </a>
            </Cite>
            <Actions>
              <Action>
                <RefreshButton type="button" onClick={getNewQuote}>
                  <VscRefresh />
                </RefreshButton>
              </Action>
              <Action>
                <a title="Tweet" href={`https://ctt.ac/${data.cttId}`}>
                  <VscTwitter />
                </a>
              </Action>
            </Actions>
          </FigCaption>
        ) : null}
      </StyledQuote>
    </Wrapper>
  );
}
