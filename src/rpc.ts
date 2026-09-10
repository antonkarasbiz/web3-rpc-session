export type RpcEndpoint = {
  url: string;
  chain: "ethereum" | "polygon" | "solana";
  latencyMs: number;
  healthy: boolean;
};

export type RpcChoice = {
  url: string;
  chain: RpcEndpoint["chain"];
  latencyMs: number;
};

export function pickRpc(endpoints: RpcEndpoint[], chain: RpcEndpoint["chain"]): RpcChoice | null {
  const eligible = endpoints.filter((endpoint) => endpoint.healthy && endpoint.chain === chain);
  if (eligible.length === 0) {
    return null;
  }
  const best = eligible.reduce((winner, endpoint) =>
    endpoint.latencyMs < winner.latencyMs ? endpoint : winner,
  );
  return { url: best.url, chain: best.chain, latencyMs: best.latencyMs };
}
