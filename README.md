# Web3 RPC session

RPC failover and wallet-session checks for the [antonkarasbiz](https://github.com/antonkarasbiz) trading stack.

Maintained by **Anton Karas (AntonX)** — full-stack, blockchain, and AI.

<p align="center">
  <a href="mailto:antonkarasbiz@gmail.com"><img src="https://img.shields.io/badge/Email-antonkarasbiz%40gmail.com-EA4335?style=for-the-badge&logo=gmail&logoColor=white" alt="Email" /></a>
  <a href="https://t.me/antonkaras_biz"><img src="https://img.shields.io/badge/Telegram-antonkaras__biz-26A5E4?style=for-the-badge&logo=telegram&logoColor=white" alt="Telegram" /></a>
  <a href="https://discord.com/users/381074277046691222"><img src="https://img.shields.io/badge/Discord-AntonX-5865F2?style=for-the-badge&logo=discord&logoColor=white" alt="Discord" /></a>
</p>

Pair this with [web3-primitives](https://github.com/antonkarasbiz/web3-primitives). That repo decides whether a chain, EIP-712 domain, and allowance are legal. This repo decides **which RPC to use** and **whether the wallet session is still valid** before a bot signs.

## What it covers

| Module | Job |
| --- | --- |
| `src/rpc.ts` | Pick the fastest healthy RPC for Ethereum, Polygon, or Solana |
| `src/session.ts` | Reject missing, expired, or wrong-chain wallet sessions |

```text
RPC health + latency → session check → caller may sign
```

## Setup

```bash
npm install
npm test
npm run dev
```

`npm run dev` prints one Polygon RPC choice and one live session decision as JSON.

## How it fits the rest of the desk

| Repo | Uses this layer for |
| --- | --- |
| [web3-primitives](https://github.com/antonkarasbiz/web3-primitives) | Chain registry, EIP-712 domain, allowance gate |
| [polymarket-trading-bot](https://github.com/antonkarasbiz/polymarket-trading-bot) | Polygon RPC + funded wallet session before CLOB sends |
| [evm-order-router](https://github.com/antonkarasbiz/evm-order-router) | EVM RPC selection under a gas ceiling |
| [solana-execution-engine](https://github.com/antonkarasbiz/solana-execution-engine) | Solana RPC failover before quote simulation |

Need this wired into a wallet, a bot, or a private fork? [Email](mailto:antonkarasbiz@gmail.com) or [Telegram](https://t.me/antonkaras_biz).

## License

MIT. On-chain actions can lose funds. This repository is software, not financial advice.
