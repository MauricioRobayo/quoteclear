export async function getQuote(): Promise<{
  cttId: string;
  text: string;
  source: string;
}> {
  const response = await fetch("/api/random");
  if (!response.ok) {
    throw new Error(`Request failed! Response code ${response.status}`);
  }
  return response.json();
}
