# Specimen QR Generator — Mr MeeSeeks

Current application build: **Mr MeeSeeks 8.0.8**  
Creator: **Adam Blake**

## Purpose

The Specimen QR Generator creates and manages permanent QR labels for test specimens. A generated QR opens a live read-only specimen dashboard containing specimen identity, GTRS, optional Data Matrix ID, installer information, strain-gauge configuration, gauge factors, replacement counts and replacement history.

The current architecture uses GitHub Pages for the web application and Supabase for authentication and database storage.

## Current operating model

- Scanning/viewing a permanent specimen QR does **not** require a Mr MeeSeeks login.
- Creating a specimen, generating a new permanent QR, editing configuration or logging a gauge replacement requires an authenticated `@vestas.com` account.
- Existing legacy database-free `?d=` QR codes remain supported.
- New database-backed QRs use a permanent specimen UUID (`?s=<uuid>`).
- A database-backed QR does not need reprinting when gauge factors or replacement information change.
- Data Matrix ID is optional and may be marked **Not Applicable**.
- One GTRS number may be shared by multiple specimens.
- Data Matrix IDs remain unique when populated.

## Main repository files

- `index.html` — application UI and client logic.
- `qrcode.js` — local QR generation library.
- `vestas-logo.jpg` — application branding asset.
- `THIRD_PARTY_SCANNER.txt` — scanner dependency/licensing note.
- `docs/ARCHITECTURE.md`
- `docs/SECURITY.md`
- `docs/DATABASE.md`
- `docs/DECISIONS.md`
- `CHANGELOG.md`

## Deployment

GitHub Pages serves the repository root. The minimum runtime files are:

1. `index.html`
2. `qrcode.js`
3. `vestas-logo.jpg`

Mr MeeSeeks 8.0.8 currently loads `@zxing/library` version `0.23.0` from UNPKG at runtime for Data Matrix decoding. Manual Data Matrix entry remains available if the scanner library is unavailable.

## Status

8.0.x should currently be treated as the **pilot baseline**. Before a formal production release, validate the complete workflow with multiple users and obtain any required Vestas Information Security / SaaS approval for Supabase.
