# BookPath Docs

This folder keeps planning and exploration material out of the static MVP runtime root.

## Document Priority

Highest priority: `specs/bookpath_ai_agent_spec.md`.

The BookPath spec is the canonical product definition. `plans/revised_mvp_plan.md`, root `DESIGN.md`, and root `README.md` narrow implementation scope, but they do not override the product definition unless the user explicitly says so.

Root `../PRODUCT.md` is the short product constitution derived from the full spec. Use it for daily work, but do not let it override `specs/bookpath_ai_agent_spec.md`.

## Folders

- `specs/` - original product and execution specifications.
- `plans/` - scope-reduction and MVP planning documents.

Removed from active docs:

- Old design exploration variants. They were useful during exploration, but the current source of truth is now the App Shell plus `DESIGN.md`.

## Current MVP Source Of Truth

For implementation and testing, read in this order:

- `specs/bookpath_ai_agent_spec.md`
- `../PRODUCT.md`
- `plans/revised_mvp_plan.md`
- `../DESIGN.md`
- `../CODEX.md`

Then use the runtime files:

- `../README.md`
- `../index.html`
- `../app.js`
- `../styles.css`
- `../smoke-test.mjs`
