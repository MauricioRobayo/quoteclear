export async function getQuote() {
  const response = await fetch("/api/random");
  if (!response.ok) {
    throw new Error(`Request failed! Response code ${response.status}`);
  }
  return response.json();
}
