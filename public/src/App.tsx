import React from "react";
import { useQuery } from "react-query";

function App() {
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

  return <div>{JSON.stringify(data, null, 2)}</div>;
}

export default App;
