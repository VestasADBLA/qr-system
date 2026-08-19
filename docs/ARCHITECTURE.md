# Architecture

## Overview

Mr MeeSeeks 8.0.8 uses a browser-based client hosted on GitHub Pages and a Supabase backend.

```text
Phone / PC browser
      |
      | HTTPS
      v
GitHub Pages
(index.html, qrcode.js, logo)
      |
      | Supabase Data API / Auth
      v
Supabase
  ├─ Auth
  ├─ specimens
  ├─ strain_gauges
  ├─ gauge_replacements
  └─ controlled RPC functions
```

## QR models

### Legacy QR

Older database-free QR codes contain the configuration in the URL query parameter:

```text
?d=<encoded payload>
```

These remain readable for backward compatibility.

### Permanent database QR

New QRs contain only a database specimen identifier:

```text
?s=<specimen UUID>
```

The QR therefore remains valid after changes to gauge factors or replacement history.

## Primary workflows

### Create specimen

1. User signs in with an authenticated `@vestas.com` account.
2. User enters specimen details and gauge configuration.
3. App calls the secure `create_specimen_record` RPC.
4. Supabase creates the specimen and initial gauge rows.
5. App generates a permanent UUID-based QR.
6. QR label is saved/printed and attached to the specimen.

### Scan specimen

1. User scans permanent QR.
2. App calls `get_specimen_dashboard`.
3. Dashboard is displayed read-only.
4. Login is not required for this read-only workflow.

### Edit specimen

1. Authenticated Vestas user opens the edit route.
2. Editable specimen/gauge data is loaded.
3. Normal configuration changes save to permitted columns.
4. Existing permanent QR remains unchanged.

### Gauge replacement

1. User presses `+ Replacement`.
2. App requests the name of the person who physically replaced the gauge.
3. Authenticated user identity is captured separately as `Logged By`.
4. App calls `record_gauge_replacement`.
5. Function atomically records the event, stores previous/new GF, increments the replacement count and specimen revision, and stores Replaced By / Logged By.
6. The same permanent QR displays the updated live record.

## Data Matrix

The Data Matrix field is optional.

- Some insert specimens have a dot-peened Data Matrix.
- Other specimen types may not have one.
- Users can select **Not Applicable**.
- Populated Data Matrix IDs are unique.
- 8.0.8 uses ZXing Data Matrix decoding with enhanced contrast/inversion attempts and camera controls where supported.
- Manual entry remains the fallback.

## Backward compatibility

Legacy embedded-data QRs and new database-backed QRs are intentionally supported in parallel.
