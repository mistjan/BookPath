# Seed Data

Future seed files from the full BookPath specification:

- `movements.json`
- `authors.json`
- `works.json`
- `paths.json`
- `awards.json`
- `lists.json`
- `publishers.json`
- `translators.json`

Current rule: do not generate 100+ works until the 5-movement static MVP has passed user testing.

Current static source: `../../src/data/bookpath-data.js`.

Do not duplicate seed JSON here yet. When the project moves to a real database or mobile local store, derive first seed files from the static data contract instead of inventing a second model.
