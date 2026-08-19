# Changelog

## 8.0.8
- Replaced native-only Data Matrix scanner with ZXing-based decoding.
- Added iPhone/Safari camera path.
- Added TRY_HARDER, contrast/inverted preprocessing, scan reticle, zoom and torch where supported.

## 8.0.7
- Made Data Matrix fully optional.
- Added Not Applicable.
- Fixed read-only validation for specimens without a Data Matrix.

## 8.0.6
- Added Last Replaced By to gauge tables.
- Added full Replacement History with Replaced By, Logged By, GF change, timestamp and note.

## 8.0.5
- Added Replaced By and Logged By traceability for replacements.

## 8.0.4
- Renamed app to Specimen QR Generator.
- Added password-reset flow.

## 8.0.3
- Fixed `desiredGauges` initialization order.

## 8.0.2
- Switched new specimen creation to secure `create_specimen_record` RPC.

## 8.0.1
- Corrected revision handling and replacement write path.

## 8.0.0
- Introduced Supabase architecture, permanent UUID QRs, Vestas editor authentication and legacy QR compatibility.

## 7.2
- Added optional specimen Data Matrix ID.

## 7.1
- Added gauge replacement counters to database-free QR payloads.

## Earlier 7.x
- Expanded to 48 gauges across three DAQ groups.
- Added 40 × 30 mm print-label workflow.
- Added specimen/GTRS/BMT/installer metadata and Vestas branding.
