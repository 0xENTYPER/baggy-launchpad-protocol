# Security model

## Scope

This document describes the intended trust boundaries and review targets. It is not an audit report and does not claim that unpublished production contracts are free of vulnerabilities.

## Assets to protect

- user funds entering or leaving the curve;
- token inventory reserved for curve trading and graduation;
- platform and creator fee balances;
- authority to configure or invoke graduation;
- integrity of token-to-market identity;
- wallet consent and transaction parameters.

## Trust boundaries

### User wallet

The wallet is the only signing authority for user actions. The application may prepare calldata but cannot silently execute it. The interface must display network, action, and bounded output before handoff.

### Launch factory

The factory is trusted to create valid token/curve pairs and register them atomically. Curve initialization is restricted to this boundary so an unrelated token cannot be attached later.

### Curve

The curve is the accounting source before graduation. External metadata, token cards, and indexers are informational and cannot modify reserves.

### Operational graduation role

Graduation is intentionally gated while external DEX integration is being validated. The role may initiate migration but must not be able to withdraw arbitrary user balances or substitute an unrelated token.

## Threats and controls

| Threat | Control |
| --- | --- |
| Reentrancy during buy, sell, claim, or migration | Reentrancy guards and checks-effects-interactions |
| Frontend quote becomes stale | Contract-enforced minimum output |
| Fee recipient rejects native value | Pull-based claim path |
| Fake token metadata | Contract address and factory event remain the identity source |
| Duplicate or premature graduation | Explicit completion/graduated state guards |
| Incorrect DEX token ordering | Address-order normalization before price and amount calculation |
| Wrong chain deployment | Chain-specific configuration and disabled-by-default launch UI |
| Transaction disappears from UI | Persisted hash and receipt reconciliation |
| Secret exposure | No keys in frontend variables or public repository |

## Invariants worth auditing

1. Curve reserves plus paid fees and migrated value reconcile with total inflow and outflow.
2. A token allocated to the curve or graduation path cannot be spent twice.
3. A completed or graduated curve cannot return to ordinary trading.
4. Fee claims reduce only the caller's authorized fee balance.
5. Graduation receives no more than the assets reserved by the completed curve.
6. DEX position parameters correspond to the same token and reserve pair.

## Operational release gates

- exact-chain testnet and fork coverage;
- independent Solidity review;
- economic simulation under adversarial trade sequences;
- verified deployment artifacts and reproducible compiler configuration;
- multisig or equivalent controls for operational authority;
- alerts for reserve, fee, graduation, and failed-transaction anomalies;
- documented pause, incident, and communication procedures.
