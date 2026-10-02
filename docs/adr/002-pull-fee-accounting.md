# ADR 002: Pull-Based Fee Accounting

- **Status:** Accepted
- **Context:** Curve settlement and creator economics

## Context

Every buy and sell may create platform and creator fees. Sending those fees to external recipients during settlement couples market availability to recipient behavior and makes failures harder to isolate.

## Decision

Settlement accrues platform and creator fees into separate claimable balances. Authorized recipients withdraw their balance through an explicit claim path using checks-effects-interactions.

## Consequences

- A reverting recipient cannot block trading.
- Creator and platform revenue can be reconciled independently.
- The protocol must maintain and test fee-conservation invariants.
- Claims add a separate transaction and require clear authorization rules.
- Monitoring can distinguish trading volume, accrued fees, and withdrawn fees.

## Rejected alternative

Immediate fee transfers were rejected because they add an external call to every settlement and turn recipient availability into a market dependency.
