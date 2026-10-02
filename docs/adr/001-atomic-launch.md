# ADR 001: Atomic Token And Market Creation

- **Status:** Accepted
- **Context:** EVM launch flow

## Context

A token launch must deploy the asset, initialize its market, register discovery state, assign creator economics, and optionally execute the creator's initial purchase. Splitting those operations across independent user transactions creates partially initialized assets and a large recovery surface.

## Decision

The factory performs token creation, curve creation, initialization, registry insertion, and the optional initial purchase as one atomic transaction. Metadata is prepared before signing and referenced by the launch transaction.

## Consequences

- A reverted launch leaves no half-configured public market.
- The wallet presents one state-changing approval for the launch path.
- Factory execution is more complex and must be tested as one accounting boundary.
- Gas estimation and input validation become critical before the signature request.
- Metadata upload remains recoverable because it occurs before onchain execution.

## Rejected alternative

A multi-transaction wizard was rejected because it exposes creators to abandoned tokens, mismatched market addresses, and ambiguous retry behavior after partial success.
