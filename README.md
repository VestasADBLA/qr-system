# Specimen QR Generator — Mr MeeSeeks

**Current application build:** Mr MeeSeeks **8.1.12** (Mini Beam Rigs only)  
**Creator:** Adam Blake  
**Repository:** https://github.com/VestasADBLA/qr-system  
**Application:** https://vestasadbla.github.io/qr-system/

## Purpose

Mr MeeSeeks creates and manages permanent QR labels for engineering test specimens. Scanning a label opens the live specimen record, including specimen identity, GTRS, optional Data Matrix ID, installer information, strain-gauge configuration, gauge factors and replacement history. A separate Catman DAQ Setup Verification workflow lets an authenticated technician confirm test-specific DAQ settings against a nine-screen reference checklist and save a signed audit record.

## Current operating model

- Reading a permanent specimen QR does **not** require a Mr MeeSeeks login.
- Creating specimens, generating new permanent QRs, editing configuration, logging gauge replacements and signing Catman DAQ verifications require an authenticated Vestas account.
- New database-backed QRs use the permanent specimen UUID in `?s=<uuid>`; legacy database-free `?d=` QRs remain supported.
- QR labels do not need reprinting when gauge factors or replacement information change.
- Data Matrix ID is optional and may be marked **Not Applicable**. Populated Data Matrix IDs must be unique; a GTRS may cover multiple specimens.
- The specimen form supports up to **64 strain-gauge channels**, arranged across up to four DAQ groups, and retains gauge-replacement history.
- A completed Catman checklist is a **technician declaration** based on manually checking Catman settings. It is not an automatic measurement or direct read-back from Catman.

## Catman DAQ Setup Verification (8.1.9)

Open `catman-checklist.html` from the main application. The technician selects the specimen and test rig, follows the reference screenshots, ticks every applicable check, and signs the final confirmation. The completed verification is stored against the specimen in Supabase, including the rig number, checklist revision, checks, authenticated user and verification time. Previous signed verifications can be reviewed in the history section.

**Current test-rig choices:** `Mini Beam Rig 1`, `Mini Beam Rig 2`, `Mini Beam Rig 3`, `Mini Beam Rig 4`, `Mini Beam Rig 5`. **Insert Rigs 1–10 are not included in the current dropdown.**

| Test rig | Catman sample rate | Checklist coverage |
|---|---:|---|
| Mini Beam Rig 1 | 100 Hz | Static + initial setup + NTP (fatigue sections omitted) |
| Mini Beam Rigs 2–5 | 50 Hz | Static + Fatigue + initial setup + NTP |

The rig dropdown contains names only. In **Initial DAQ Configuration**, the mandatory **Sample rate** checkbox automatically states **“Verify the Static DAQ sample frequency is set to 100 Hz”** for Mini Beam Rig 1, or **50 Hz** for Mini Beam Rigs 2–5. The operator must tick this check before sign-off. The wording updates when the selected rig changes; changing rigs also resets the checklist confirmations.

### Checklist sections and requirements

1. **Initial DAQ Configuration — Slide1.PNG:** Sensor naming follows DMS 0102-3629 (`SG_001`, etc.); MOOG connected; all Catman gauge factors match values already recorded in the specimen QR system; correct rig-specific sample frequency; zero connected gauges at zero applied load.
2. **DAQ Job Static – General — Slide2.PNG:** Start immediately; stop after 15 minutes.
3. **DAQ Job Static – Storage — Slide3.PNG:** Keep all data; prompt on DAQ termination; **CRITICAL: MS Excel 97–2003 `.xls`, not `.xlsx`**; use the correct specimen-specific ingestion folder and `%DateTime%.xls` filename. Example (not a universal path): `C:\tvdpshare\Import\GTRS-2026-17863\004\Static_0c9b8296-ae23-4462-975f-50fc154d8ea0\%DateTime%.xls`.
4. **DAQ Job Static – Channels — Slide4.PNG:** Statistics Journal OFF; Store and Save ON for active measurement and required MOOG channels; Cycles need not be selected.
5. **DAQ Job Fatigue – General — Slide5.PNG:** Start immediately; stop manually.
6. **DAQ Job Fatigue – Storage — Slide6.PNG:** Manual control; Data saving None (test mode). The file format is irrelevant for fatigue and is shown as a separate informational note, **not a checkbox**.
7. **DAQ Job Fatigue – Channels — Slide7.PNG:** Statistics Journal ON for every active MX1615B strain-gauge channel. For the required MOOG channels, enable Statistics Journal, Store and Save: `FCS_RTFE_xxx.xxx.xxx.xx_NTP_1`, `ForceCmd_A`, `ForceFdbk_A`, `ForceFdbk_B`, `PositionCmd`, `PositionFdbk`, `Cycles`.
8. **DAQ Job Fatigue – Job Parameters — Slide8.PNG:** Create statistics journal ON; update interval 1 minute; backup Never; Minimum, Maximum, Mean and Range ON; writing during waiting for trigger ON.
9. **NTP Synchronisation — Slide9.PNG:** **CRITICAL:** After DAQ start, confirm MOOG NTP and MX1615B hardware timestamps are identical. If not, **stop the test and contact ADBLA**.

All applicable checks are mandatory even when not visually marked critical. The checklist uses `CATMAN-001 Rev A`. There is no second-reviewer sign-off in this workflow.

### Supabase and audit

The Catman verification feature uses the `catman_verifications` record structure and the `submit_catman_verification` / `get_catman_verifications` RPC functions. Its verification records contain a specimen identifier, numeric rig identifier (1–5 in the current UI), checklist revision, checked items, user identity and timestamp. **Do not run the older 8.1.9 Insert Rig migration solely for the Mini Beam-only release.** If it was already applied, removing Insert Rigs from the UI does not require rolling the migration back. The initial Catman verification database setup must already have been applied for submissions to work.

## Repository files

- `index.html` — main application and client logic.
- `catman-checklist.html` — authenticated Catman checklist and verification history.
- `assets/catman/Slide1.PNG` through `Slide9.PNG` — reference screenshots, one per checklist section.
- `qrcode.js` — local QR generation library.
- `vestas-logo.jpg` — branding asset.
- `THIRD_PARTY_SCANNER.txt` — scanner dependency/licensing note.
- `docs/ARCHITECTURE.md`, `docs/SECURITY.md`, `docs/DATABASE.md`, `docs/DECISIONS.md` — supporting documentation (review these alongside future releases).
- `CHANGELOG.md` — historical change log (should be maintained alongside this README).

## Deployment and verification

GitHub Pages serves the repository root. Deploy `index.html` and `catman-checklist.html` to the root, and all nine correctly capitalised PNG files to `assets/catman/`. Retain `qrcode.js`, `vestas-logo.jpg` and existing documentation. GitHub Pages paths and filenames are case-sensitive.

Before accepting a deployment, test: legacy and UUID QR scanning; read-only access; authenticated create/edit and gauge replacement; specimen lookup in Catman; the five rig options; 100/50 Hz guidance; Rig 1 fatigue omission; screenshot loading; all required checklist checks; submission and history persistence; and correct account-level permissions. Confirm the Catman SQL objects are installed. The scanner has previously used `@zxing/library` from UNPKG; verify the current dependency in `index.html` when changing scanner code.

## Release history since README 8.0.8

| Version | Documentation summary |
|---|---|
| **8.0.8** | Earlier documented pilot baseline: permanent specimen QRs, authenticated changes, optional Data Matrix ID and replacement tracking. |
| **8.1.7** | Catman DAQ Setup Verification introduced with specimen-linked Supabase verification/audit workflow and screenshot-guided checks. |
| **8.1.8** | Nine direct Catman screenshots replaced earlier references; checklist reordered and Static/Fatigue settings, critical warnings and `.xls` ingestion guidance clarified. |
| **8.1.12** | Initial DAQ Configuration sample-rate checkbox now explicitly displays the rig-specific Static DAQ frequency (100 Hz for Rig 1; 50 Hz for Rigs 2–5), rather than a generic instruction or rig-dropdown label. No database change. |
| **8.1.9** | Gauge-factor comparison references QR-system values; filename example corrected to `%DateTime%.xls`; Fatigue file-format note separated; MX1615B/MOOG checks clarified; Mini Beam rigs renamed 1–5; frequency guidance moved to Initial DAQ Configuration. Insert Rig options were proposed but **removed** from the current release. |

Intermediate changes between 8.0.8 and 8.1.7 are not individually reconstructed here; consult repository commit history and the existing `CHANGELOG.md` for precise intermediate release details.

## Status and planned work

This remains a **pilot** pending full multi-user validation and any necessary Vestas Information Security / SaaS approvals for Supabase. Potential future work includes Insert Rigs 1–10, but their checklist applicability should be confirmed before enabling them. Keep this README, the changelog and architecture/security/database documents aligned whenever application or SQL behaviour changes.

## 8.1.12 — duplicate protection and email confirmation

- Catman search shows distinct UUIDs, revision labels, and an explicit warning when multiple permanent UUIDs share a GTRS/specimen number. It does not silently hide or merge these records.
- Main specimen search identifies conflicting records and shows abbreviated UUIDs.
- New-specimen creation checks for an existing matching GTRS/specimen pair and refuses to create another via the UI. Existing records should be opened and edited; changes retain the UUID.
- `Supabase_8.1.12_Duplicate_Protection.sql` provides a read-only duplicate report and a conditional unique-index migration. **Do not run the index step while duplicate groups remain.** Existing records must be reviewed individually with their QR, gauge and verification dependencies.
- Login UI includes a resend-confirmation action. Administrators must separately check Supabase Auth logs, confirmation settings, redirect URL and SMTP delivery. See `AUTH_EMAIL_TROUBLESHOOTING.md`.
- The browser-side duplicate check is supplementary; database uniqueness is only guaranteed once the unique index has been successfully created.

## 8.1.12 — UI and Catman workflow

- Data Matrix and DAQ 1 gauge entry sections collapsed by default; existing input data preserved when toggled.
- Opening the Catman checklist from a saved specimen passes its permanent UUID; direct checklist access still supports search.
- Initial DAQ checklist displays read-only, current gauge factors retrieved from the specimen dashboard. Verification is blocked if reference data cannot be loaded.
- Static sampling: Mini Beam Rig 1 100 Hz, Mini Beam Rigs 2–5 50 Hz. Fatigue statistics recording uses a `.stat` file and does not use the static sample-rate requirement.
- Slide headings aligned to DAQ Jobs navigation. Static Store and Save require TPR-listed sensors and five specified MOOG channels; Cycles and Laser Trip not required.
- Retains 8.1.11 duplicate prevention and email-confirmation recovery. SQL uniqueness migration still requires review of existing duplicates before execution.
