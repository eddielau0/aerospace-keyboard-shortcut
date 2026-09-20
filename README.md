# AeroSpace Keyboard Shortcut Map

An offline, single-page reference for the AeroSpace keyboard bindings in this project. It presents the `main` and `service` binding modes as a visual keyboard map and searchable shortcut index.

## Use

Open `index.html` directly in any modern browser. No server, package manager, network connection, fonts, or external assets are required. Use the mode tabs to switch maps and the search field (or click a key) to narrow the index.

## Data source and syncing

The shortcut data is a snapshot of the bindings in the user's AeroSpace configuration. This repository intentionally contains only shortcut metadata - never a local absolute path, application routing rules, or private configuration.

When the configuration changes:

1. Compare the `mode.main.binding` and `mode.service.binding` sections with `app.js`.
2. Add, remove, or update the corresponding entries in the `main` or `service` arrays. Keep the AeroSpace command and mode accurate.
3. Update the counts in the mode-tab labels in `index.html`.
4. Open `index.html` and check both mode tabs, keyboard labels, search, and a narrow mobile viewport.

The page is plain HTML, CSS, and JavaScript so the result stays portable and easy to review in a git diff.
