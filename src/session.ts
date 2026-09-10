export type WalletSession = {
  address: string;
  chain: "ethereum" | "polygon" | "solana";
  expiresAt: number;
};

export type SessionDecision = {
  ok: boolean;
  reason: string | null;
};

export function evaluateSession(
  session: WalletSession,
  expectedChain: WalletSession["chain"],
  now = Date.now(),
): SessionDecision {
  if (!session.address) {
    return { ok: false, reason: "missing wallet address" };
  }
  if (session.chain !== expectedChain) {
    return { ok: false, reason: "session chain mismatch" };
  }
  if (session.expiresAt <= now) {
    return { ok: false, reason: "session expired" };
  }
  return { ok: true, reason: null };
}
