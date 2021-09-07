import React from "react";
import styled from "styled-components/macro";
import { useQuery } from "react-query";
import { QuoteLoader } from "./loaders";
import { linkStyle, smallText } from "../../styles/mixins";
import { getQuote } from "../../services/api";

const RefreshButton = styled.button`
  ${linkStyle}
`;
const StyledQuote = styled.figure`
  max-width: ${({ theme }) => theme.maxWidth};
  margin: 4rem 1rem 0 1rem;
  width: 100%;
`;
const FigCaption = styled.figcaption`
  * {
    ${smallText}
  }
  padding: 1em;
  display: flex;
  justify-content: space-between;
  div {
    display: flex;
    & > div:not(:last-child) {
      margin-right: 1em;
    }
  }
`;
const Blockquote = styled.blockquote<{ isLoading: boolean }>`
  font-size: 1.25rem;
  font-family: ${({ theme }) => theme.fontFamily.text1};
  line-height: 1.25em;
  font-weight: 300;
  color: ${({ theme }) => theme.colors.text1};
  background-color: ${({ theme }) => theme.colors.surface2};
  padding: 0.5em 1em;
  border-radius: ${({ theme }) => theme.borderRadius};
  margin: 0;
  p {
    margin: 0.5em 0;
  }
`;

export function Quote() {
  const { isFetching, error, data, refetch } = useQuery("repoData", getQuote, {
    staleTime: Infinity,
  });

  console.log({ isFetching });

  if (error) {
    if (error instanceof Error) {
      return <div>An error has occurred: {error.message}</div>;
    }
    return <div>An error has occurred: {JSON.stringify(error, null, 2)}</div>;
  }

  return (
    <StyledQuote>
      <Blockquote isLoading={isFetching}>
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
            <div>
              <a href={data.source}>Source</a>
            </div>
            <div>
              <RefreshButton type="button" onClick={() => refetch()}>
                Refresh
              </RefreshButton>
            </div>
          </div>
          <div>
            <a href={`https://ctt.ac/${data.cttId}`}>Tweet</a>
          </div>
        </FigCaption>
      )}
    </StyledQuote>
  );
}
