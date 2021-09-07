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
  margin: 4rem 1rem 0 1rem;
  width: 100%;
`;
const FigCaption = styled.figcaption`
  * {
    ${smallText}
  }
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
  font-size: 1.25rem;
  font-family: ${({ theme }) => theme.fontFamily.text1};
  line-height: 1.25em;
  font-weight: 300;
  color: ${({ theme }) => theme.colors.text1};
  background-color: ${({ theme }) => theme.colors.surface2};
  padding: 0.5em 1em;
  border-radius: ${({ theme }) => theme.borderRadius};
  margin: 0 0 0.5rem 0;
  p {
    margin: 0.5em 0;
  }
`;

export function Quote() {
  const { isLoading, isFetching, error, data, refetch } = useQuery(
    "repoData",
    getQuote,
    {
      staleTime: Infinity,
    }
  );

  if (error) {
    if (error instanceof Error) {
      return <div>An error has occurred: {error.message}</div>;
    }
    return <div>An error has occured: {JSON.stringify(error, null, 2)}</div>;
  }

  console.log(data?.text);

  return (
    <StyledQuote>
      <Blockquote>
        {isLoading || isFetching ? (
          <QuoteLoader width="90%" height="1em" />
        ) : (
          data.text
            .split("\n")
            .filter((line: string) => line.trim() !== "")
            .map((line: string, index: number) => <p key={index}>{line}</p>)
        )}
      </Blockquote>
      {isLoading || isFetching ? null : (
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
