export async function getQuote() {
  const response = await fetch("/api/randomQuote");
  if (!response.ok) {
    throw new Error(`Request failed! Response code ${response.status}`);
  }
  return response.json();
}
