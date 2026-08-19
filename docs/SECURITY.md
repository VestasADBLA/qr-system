# Security

## Scope

This document records the current security design and accepted assumptions for the Specimen QR Generator / Mr MeeSeeks 8.0.8 pilot.

## Security assumptions

The current product decision is that users who can reach the published site are already operating within an appropriately controlled Vestas environment and are permitted to view specimen information.

Therefore:

- read-only permanent-QR viewing does not require a Mr MeeSeeks login;
- creating or editing database records does require authentication;
- account creation is restricted to `@vestas.com`.

If the assumption about site/network access changes, anonymous read access should be removed and read access moved to authenticated users.

## Authentication

Supabase Auth is used for editor accounts.

Current policy:

- email/password authentication;
- signup restricted server-side to `@vestas.com`;
- users create a separate Mr MeeSeeks password;
- users should **not** reuse their Vestas/network password;
- password reset is provided through Supabase Auth.

Future preferred enterprise direction: evaluate Vestas SSO if approved and technically available.

## Authorization

Supabase Row Level Security (RLS), explicit grants and controlled RPC functions are used together.

General policy:

- `anon`: no direct table browsing; limited read access only through `get_specimen_dashboard`.
- `authenticated`: controlled read/write permissions.
- normal users cannot hard-delete records.
- replacement history is append-oriented rather than manually overwriting replacement totals.

## API keys

The browser contains only the Supabase publishable key.

This key is **not treated as a secret**. Application security relies on database permissions, RLS and controlled functions.

Never place Supabase secret/service-role keys or database passwords in the browser, QR payload or public repository.

## Public read model

A permanent QR contains a random UUID, not the full specimen record.

Anonymous users do not have direct SELECT permission on the underlying tables; they can request one specimen through `get_specimen_dashboard(uuid)`.

Residual risk: anyone who obtains a valid specimen URL and can reach the site may view that specimen's read-only record.

## Write protection

Creating specimens and logging replacements use controlled database functions.

`create_specimen_record` requires a genuine authenticated `@vestas.com` user and creates the specimen plus initial gauges.

`record_gauge_replacement` requires a genuine authenticated `@vestas.com` user and atomically records the event, Replaced By, Logged By, previous/new GF, replacement count and specimen revision.

## Data constraints

- One GTRS may relate to multiple specimens.
- GTRS is indexed but is not unique.
- Data Matrix ID is optional.
- Populated Data Matrix IDs are unique.
- Gauge numbers are limited to SG1–SG48.
- Standard gauge assumption is 350 Ω, 3-wire unless otherwise specified.

## Third-party/cloud considerations

Supabase is an external cloud/SaaS dependency. Formal production use may require internal Vestas approval covering data classification, region/residency, retention, personal data, audit, backup/recovery and corporate identity.

GitHub Pages is also part of the deployment architecture and should be treated consistently with internal hosting/security requirements.

## Scanner dependency

8.0.8 loads ZXing JavaScript from UNPKG at runtime.

Risks:

- availability dependency on an external CDN;
- supply-chain dependency.

Recommended hardening after scanner validation: host the pinned ZXing library locally in the repository.

## Recommended operational controls

- enable MFA on Supabase administrator accounts;
- keep Supabase secret/service-role credentials out of GitHub;
- review RLS/grants after schema changes;
- retain database migration scripts;
- avoid direct manual editing of replacement events except for controlled admin corrections;
- test account recovery and multi-user behaviour before production rollout.

## Known pilot limitations

- no formal Vestas SSO;
- anonymous read relies on controlled site reachability;
- no administrator UI yet;
- no formal retention/archive workflow yet;
- no project-level export/cost dashboard yet;
- dot-peen scanning remains best-effort and may not match a specialist industrial scanner.
