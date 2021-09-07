import React from "react";
import { useQuery } from "react-query";

export function Quote() {
  const { isLoading, error, data } = useQuery("repoData", async () => {
    const response = await fetch("/api/randomQuote");
    if (!response.ok) {
      throw new Error("Request failed!");
    }
    return response.json();
  });

  if (isLoading) return <div>"Loading..."</div>;

  if (error) {
    if (error instanceof Error) {
      return <div>An error has occurred: {error.message}</div>;
    }
    return <div>An error has occured: {JSON.stringify(error, null, 2)}</div>;
  }

  return (
    <figure>
      <blockquote>{data.text}</blockquote>
      <figcaption>
        <div>
          <a href={`https://ctt.ac/${data.cttId}`}>Tweet</a>
        </div>
      </figcaption>
    </figure>
  );
}
