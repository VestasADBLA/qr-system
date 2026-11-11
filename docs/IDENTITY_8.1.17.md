# Identity changes — 8.1.17

- The homepage owns the Vestas email/password sign-in and recovery UI. Session key remains `mrmeeseeks_supabase_session` for compatibility.
- QR Generator retains the original auth logic internally for session restore and legacy password recovery URLs, but login controls are removed from its visible UI.
- Technician selection defaults to the signed-in email handle. An approved directory provides optional alternative technicians; it is not a security boundary.
- Historical aliases are presentation-only in Gauge Dashboard; originals remain untouched in `specimens.installer_name` and `gauge_replacements.replaced_by`.
- Jim and Bob are filtered only from the dashboard people table, not deleted from audit or specimen records.
- Dashboard `specimens` aggregation is approximate across merged aliases; do not use it as a deduplicated unique specimen count.
- Follow-up: implement authenticated staff directory, admin-approved alias mapping, server-side RPC identity enforcement and verified migration. Never auto-merge unverified people.

## 8.1.17a alias correction
Joshua Hall: jsuha, Joshua hal, Josh hall, Joshua hall. Adam Blake: adbla, adbla@vestas.com, Adam Blake. Luke Rayner: Luke, Luke Rayner. Matt Smith: mtsmh, Matt Smith. Case and whitespace are normalised; @vestas.com usernames are resolved through verified aliases. Jim and Bob remain excluded from the people table, with audit records retained. Other employee email addresses must be verified before adding them to the approved selector.
