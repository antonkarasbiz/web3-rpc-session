import { pickRpc } from "./rpc.ts";
import { evaluateSession } from "./session.ts";

const rpc = pickRpc(
  [
    { url: "https://polygon-rpc.com", chain: "polygon", latencyMs: 55, healthy: true },
    { url: "https://backup.polygon", chain: "polygon", latencyMs: 90, healthy: true },
  ],
  "polygon",
);

const session = evaluateSession(
  {
    address: "0xowner",
    chain: "polygon",
    expiresAt: Date.now() + 60_000,
  },
  "polygon",
);

console.log(JSON.stringify({ rpc, session }));
