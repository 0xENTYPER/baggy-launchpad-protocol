# ADR 003: Explicit Graduation Boundary

- **Status:** Accepted
- **Context:** Bonding curve to external DEX liquidity

## Context

Graduation moves reserves and a token allocation from the internal curve into an external liquidity venue. Performing migration as an incidental side effect of the trade that reaches the target mixes settlement, third-party integration, and operational recovery in one path.

## Decision

The curve enters a completed state when its reserve target is reached. Normal curve trading stops. A separately authorized graduation coordinator then validates parameters, moves the reserved assets, initializes or locates the external pool, and verifies the resulting liquidity position.

## Consequences

- The final curve trade remains bounded to curve accounting.
- Graduation can be retried or investigated without reopening trading.
- The completed state may be visible before external liquidity is ready.
- Operational authorization and monitoring become explicit security boundaries.
- Asset order, native wrapping, pool configuration, and unused amounts need chain-specific verification.

## Rejected alternative

Automatic migration inside the final buy was rejected because third-party pool behavior could revert or complicate the user settlement that completed the curve.
