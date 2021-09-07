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
  margin: 2rem 1rem;
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
  padding: 1em;
  text-align: center;
  border-radius: ${({ theme }) => theme.borderRadius};
  margin: 0 0 0.5rem 0;
  &::before,
  &::after {
    opacity: 0.5;
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
  const { isLoading, error, data, refetch } = useQuery("repoData", getQuote, {
    staleTime: Infinity,
  });

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
