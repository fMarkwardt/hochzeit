export async function loadHtml(path) {
  const res = await fetch(path, { cache: "no-store" });
  if (!res.ok) throw new Error(`Konnte ${path} nicht laden (${res.status})`);
  return await res.text();
}