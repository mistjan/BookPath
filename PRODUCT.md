# BookPath Product Constitution

This is the short daily product guide for BookPath.

Authority note: `docs/specs/bookpath_ai_agent_spec.md` remains the highest-weight document. If this file conflicts with that spec, the spec wins unless the user explicitly says otherwise.

## Product Positioning

BookPath is a Chinese-first guide map for the world of books.

It helps readers understand literary movements, recognize classic works, follow reading paths, interpret awards and lists, and decide what to read next.

BookPath is not:

- an ebook reader
- a reading tracker
- a community
- a social product
- a generic book list site
- a ranking or score aggregator
- a shopping or piracy destination

## Core Promise

The product promise is:

> Help a reader understand where they are in the book world and choose the next book with confidence.

The first-version success question is:

> After opening a movement page, does the reader understand what this is, what to read, why to read it, and which book should come first?

## Product Map

The full BookPath product is organized around:

1. Movement map
2. Movement detail
3. Work guide cards
4. Reading paths
5. Awards center
6. Lists center
7. Search and filters
8. Content admin
9. AI draft generation and review

The current static MVP only validates the core reading-decision flow:

> movement -> works -> reading path -> guide card -> next book

## Reader Experience Principles

- Do not make BookPath a normal book list.
- Do not explain classics as "high score" or "important" without a concrete reason.
- Do not turn recommendation into "you may also like".
- Do not chase content volume before the path logic works.
- Protect beginners from starting with the hardest classic.
- Every page should reduce reading-decision anxiety.
- Awards, lists, editions, and search must serve "what should I read next?"

## Content Rules

## Title Modeling Rule

Work titles must preserve the original work identity:

- `Work.titleOriginal` is the source-language title and the main Work title.
- `Work.titleTranslatedCn` is the Chinese translated/common title for Chinese readers.
- `Edition.titleCn` is the title of a concrete Chinese edition and belongs with publisher, translator, and publication metadata.
- Do not collapse original title, translated title, and edition title into one field.

## Content Rules

Movement pages should explain:

- one-sentence meaning
- beginner explanation
- why it appeared
- what it changed or reacted against
- core features
- common misunderstandings
- beginner warning
- why it matters
- entry works
- core works
- advanced works
- books beginners should not start with
- related movements

Guide cards should explain:

- what the work is
- why it is classic
- why it is worth reading
- who it suits
- who it does not suit
- difficulty and reason
- what to know before reading
- reading advice
- movement relationship
- where to go next

Reading paths must be ordered from easier entry to harder or richer reading. The most classic book is not automatically the best first book.

## Static MVP Boundary

The current implementation is a static prototype.

Current content scope:

Literature and literature-adjacent works only.

- Literature
- Literary movements
- Literary works
- Literary awards and lists as later navigation layers
- Literature-adjacent works only when they directly support literary reading paths

Do not include pure philosophy, general social science, business, self-help, technical, or other non-literary books in the current content set.

Allowed:

- Static HTML/CSS/JS
- 5 movement flows
- 5 guide cards per movement
- 5 path steps per movement
- Static app-shell route pages
- Inert future architecture folders

Not live yet:

- Backend
- Database
- Search implementation
- Admin behavior
- User accounts
- AI generation API
- Awards/lists as functional modules
- Editions/translations module
- More than 5 movement flows

Route shells may exist to express the future product map, but they must not pretend to be implemented features.

## Mobile-App Direction

The eventual mobile app should map naturally to:

- Book world map / home
- Movement regions
- Movement detail
- Reading path
- Work landmark / guide card
- Feedback or decision capture
- Search, awards, and lists as later navigation layers

Build current web structure so these screens can be migrated without redesigning the product model.
