# Decision Log

## D001 — Permanent database-backed QR
New specimen QRs use a permanent UUID instead of embedding the full configuration. Existing `?d=` QRs remain supported.

## D002 — Supabase backend
Supabase is used for pilot Postgres, Auth, RLS and controlled RPC functions. Formal production use may require Vestas approval.

## D003 — Read without app login
Read-only scanning does not require Mr MeeSeeks login because current site reachability is assumed to be limited to appropriately cleared Vestas users. Review this if the access assumption changes.

## D004 — Vestas-only editor accounts
Create/edit operations require authenticated `@vestas.com` accounts enforced server-side.

## D005 — Separate Replaced By and Logged By
Replacement events record both the physical technician and the authenticated user who logged the event. Time-spent capture is intentionally deferred.

## D006 — Multiple specimens per GTRS
GTRS is not unique because one GTRS may cover multiple specimens.

## D007 — Unique optional Data Matrix
Data Matrix ID is optional but unique when present. Not Applicable is supported.

## D008 — 48-gauge architecture
DAQ 1 = SG1–16, DAQ 2 = SG17–32, DAQ 3 = SG33–48. Standard default is 350 Ω, 3-wire.

## D009 — Append-oriented replacement history
Replacement totals are derived from controlled event updates rather than free-form direct tally editing.

## D010 — Dot-peen scanner remains optional
Browser scanning is a convenience feature, not a dependency. Manual entry remains supported.

## D011 — ZXing scanner in 8.0.8
Native-only BarcodeDetector was replaced because iPhone support was inadequate and dot-peen performance was poor. Current scanner uses pinned ZXing 0.23.0 from UNPKG with enhanced preprocessing. Planned hardening is to host the approved bundle locally.
