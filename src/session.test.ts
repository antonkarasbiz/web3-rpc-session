import assert from "node:assert/strict";
import { test } from "node:test";
import { pickRpc } from "./rpc.ts";
import { evaluateSession } from "./session.ts";

test("picks the fastest healthy rpc on the requested chain", () => {
  const choice = pickRpc(
    [
      { url: "https://slow.polygon", chain: "polygon", latencyMs: 180, healthy: true },
      { url: "https://fast.polygon", chain: "polygon", latencyMs: 40, healthy: true },
      { url: "https://eth.example", chain: "ethereum", latencyMs: 20, healthy: true },
    ],
    "polygon",
  );
  assert.equal(choice?.url, "https://fast.polygon");
});

test("skips unhealthy endpoints", () => {
  const choice = pickRpc(
    [{ url: "https://down.solana", chain: "solana", latencyMs: 10, healthy: false }],
    "solana",
  );
  assert.equal(choice, null);
});

test("rejects an expired or wrong-chain session", () => {
  const expired = evaluateSession(
    { address: "0xabc", chain: "polygon", expiresAt: 1 },
    "polygon",
    100,
  );
  const wrongChain = evaluateSession(
    { address: "0xabc", chain: "ethereum", expiresAt: 999 },
    "polygon",
    100,
  );
  assert.equal(expired.reason, "session expired");
  assert.equal(wrongChain.reason, "session chain mismatch");
});

test("accepts a live session on the expected chain", () => {
  const allowed = evaluateSession(
    { address: "0xabc", chain: "polygon", expiresAt: 500 },
    "polygon",
    100,
  );
  assert.equal(allowed.ok, true);
});
