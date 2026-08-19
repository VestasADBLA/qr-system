# Database

## Core tables

### `public.specimens`

One row per physical specimen.

Key fields:

- `id` UUID — permanent database/QR identifier
- `specimen_id`
- `gtrs_number`
- `data_matrix_id` — optional
- `installer_name`
- `epic_issue_no`
- `revision`
- `status`
- timestamps

Rules:

- `id` is unique/primary key.
- `gtrs_number` is **not unique**.
- `data_matrix_id` is unique when populated.

### `public.strain_gauges`

Current state of each configured gauge.

Key fields include specimen UUID, gauge number (1–48), gauge factor, resistance, wire count, replacement count and timestamps.

### `public.gauge_replacements`

Append-oriented replacement event history.

Key fields:

- specimen UUID
- gauge number
- previous/new gauge factor
- replacement note
- `replaced_by`
- `logged_by`
- replacement timestamp

## Controlled functions

- `create_specimen_record(...)`
- `record_gauge_replacement(...)`
- `get_specimen_dashboard(uuid)`

## RLS and grants

RLS is enabled on the application tables.

Anonymous users do not receive direct table SELECT access. Read-only specimen access is provided by `get_specimen_dashboard`.

Hard delete is not part of the normal application workflow.

## Expected specimen indexes

- `specimens_pkey`
- `specimens_matrix_unique`
- `specimens_gtrs_idx`

`specimens_gtrs_unique` must **not** exist.

## Migration discipline

Any schema/RLS/function change should be captured in SQL, tested, documented, added to the changelog and designed to preserve existing permanent UUID QRs unless explicitly stated otherwise.
