# Testing strategy

## Objective

Testing should prove accounting and lifecycle properties, not merely that happy-path calls return without reverting.

## Contract unit tests

- token and curve are initialized once and linked correctly;
- optional creator purchase uses the same launch transaction;
- quotes match settlement for representative reserve states;
- buy and sell reject outputs below the signed minimum;
- platform and creator fees accrue independently;
- unauthorized initialization, claims, and graduation revert;
- completed and graduated states disable invalid transitions.

## Fuzz tests

- randomized buy sizes across the supported reserve domain;
- randomized sell sizes limited by wallet balances;
- alternating buy/sell sequences with fee reconciliation;
- minimum-output boundaries around rounding behavior;
- asset ordering and price conversion for graduation pairs.

## Invariant tests

```text
accounted native value
  = active reserve
  + claimable fees
  + value migrated to graduation
  + value returned to users
```

Equivalent inventory invariants should hold for curve tokens and the graduation allocation. The precise formula depends on the selected curve model and fee policy.

## Integration tests

- metadata upload completes before wallet signing;
- wrong-network state blocks launch creation;
- wallet rejection returns to an editable form;
- transaction replacement follows the replacement hash;
- confirmation decodes the expected factory event;
- a reload resumes receipt lookup from the persisted hash;
- unavailable metadata renders verified fallback identity;
- DEX graduation is tested against the exact target-chain contracts.

## Release matrix

| Gate | Local | Testnet | Mainnet candidate |
| --- | ---: | ---: | ---: |
| Build and static analysis | Required | Required | Required |
| Unit tests | Required | Required | Required |
| Fuzz and invariant tests | Required | Required | Required |
| Wallet integration | Mocked | Real wallet | Real wallet |
| DEX integration | Fork or mock | Exact contracts | Exact contracts |
| Independent review | Recommended | Required before public beta | Required |
| Monitoring and incident plan | Draft | Validated | Required |

## Non-goals

Screenshots, manual clicking, and a successful deployment transaction are useful checks, but none of them replace reserve invariants or independent contract review.
