/**
 * Smoke-check CORS from Node (does not prove browser CORS — use preview + DevTools too).
 * Run: node scripts/verify-cors.mjs
 */
const BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://car-wash-vbry.onrender.com/api";
const ORIGIN = process.argv[2] ?? "http://localhost:3000";

async function main() {
  const res = await fetch(`${BASE}/services?isActive=true`, {
    headers: { Origin: ORIGIN },
  });
  console.log("Status:", res.status);
  console.log("Access-Control-Allow-Origin:", res.headers.get("access-control-allow-origin"));
  const json = await res.json();
  console.log("success:", json.success, "count:", json.count ?? (json.data?.length ?? "n/a"));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
