# Third-party scanner notice

Mr MeeSeeks 8.0.8 uses `@zxing/library` version `0.23.0` for Data Matrix decoding.

Project: https://github.com/zxing-js/library  
License: Apache-2.0

The current implementation loads the pinned browser bundle from UNPKG at runtime.

Recommended hardening after scanner validation: store the approved pinned bundle locally in the repository and reference the local asset from `index.html`.
