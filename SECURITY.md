# Security Policy

## Repository scope

This repository is a sanitized engineering case study. It does not contain deployable production contracts, private infrastructure, live addresses, secrets, or complete operational configuration.

The examples are provided to explain architecture and interface boundaries. They have not been published as audited production code and must not be deployed as-is.

## Reporting a vulnerability

Do not open a public issue for a suspected vulnerability affecting the live Baggy product or protocol.

Use GitHub's private vulnerability reporting flow for this repository and include:

- the affected product surface or protocol boundary;
- reproducible steps and expected impact;
- whether funds, signatures, permissions, or user data may be affected;
- any transaction, chain, or environment context that can be shared safely;
- a private contact method for follow-up.

Do not include private keys, seed phrases, access tokens, or credentials in a report.

## Response principles

Reports are triaged by potential impact on funds, authorization, accounting, metadata integrity, and availability. Acknowledgement does not confirm a bounty or a vulnerability. Public disclosure should wait until the affected production path is remediated and users are no longer exposed.

## Supported material

Security review of this public repository covers documentation accuracy, sanitized interface examples, and accidental disclosure. Production deployments, contracts, and infrastructure are intentionally outside the public repository.
