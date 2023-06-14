export async function getPostion(ip?: string) {
  const key = import.meta.env.VITE_API_KEY;
  if (ip) {
    const res = await fetch(
      `https://geo.ipify.org/api/v2/country,city?apiKey=${key}&ipAddress=${ip}`
    );
    return await res.json();
  }
  const res = await fetch(
    `https://geo.ipify.org/api/v2/country,city?apiKey=${key}&ipAddress`
  );
  return await res.json();
}
