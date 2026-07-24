# Design notes — running log

## Design token proposal (v1) — for principal review before any CSS is written

Brief §5 explicitly warns against a generic "modern minimal tech startup" look and points at a richer vocabulary: instrumentation, signal plots, phase portraits, oscilloscope traces, engineering drawing conventions. This proposal leans into that directly, and ties the palette to something the principal's own work already produces (the blue/orange "measured vs. identified" contrast that shows up in the Agentic-SysID demo and CorBin-FL comparison plots), rather than picking colors arbitrarily.

### Palette (light mode primary, per brief §5)

| Token | Hex | Use |
|---|---|---|
| `paper` | `#FAF7F0` | Page background — warm off-white, like drafting paper, not clinical white |
| `ink` | `#1C1B18` | Primary text — near-black with warmth, not pure `#000` |
| `signal` | `#1857A4` | Primary accent, links, "measured/actual" trace color |
| `trace` | `#C4622D` | Secondary accent, "identified/model" trace color, used sparingly for contrast pairs (e.g. actual-vs-identified, theory-vs-practice) |
| `grid` | `#DAD4C4` | Hairlines, dividers, subtle graph-paper texture in whitespace |
| `ok` | `#3E6B4F` | Small utility green — reserved for things like "validated" / result badges, used rarely |

Dark mode (optional per brief): inverted on a graphite `#16181B` background, `signal`/`trace` brightened ~10% for contrast, `grid` dropped to near-invisible.

### Typography

- **Display** (headlines, theme labels, the hero line): **Fraunces**, variable font, used only at large sizes with its "soft" optical axis dialed toward literary-but-precise rather than fully decorative. Not Inter, not a generic sans.
- **Body**: **Source Sans 3** — plain, legible, utilitarian; carries the actual reading weight of the site.
- **Mono** (equations, code snippets, dataset names, axis labels, the `[R1]`-style tags): **IBM Plex Mono** — genuinely technical, not decorative-monospace.

All three are open-source, self-hostable (no external font CDN calls needed at runtime, keeps the "no API keys / no bloat" constraint clean).

### Layout concept

- Site is organized by the four research themes, never by audience (per brief §0 — no "For Researchers / For Engineers" split).
- Each theme section is framed like an instrument-panel entry: a thin rule + small mono "channel label" (e.g. `CH.1 — INFORMATION THEORY`) above the theme heading, echoing an oscilloscope's channel indicator without literally drawing an oscilloscope.
- A very faint dot-grid (graph-paper reference, `grid` token at ~4% opacity) sits in generous whitespace areas only — never behind text, never busy enough to read as decoration first.
- Two-column proof format everywhere a theme or system is shown: framing prose on the left, one real figure/plot on the right. No card-grid-of-icons pattern (that's the generic-template tell the brief warns against).

### The one signature element (brief §5: "spend boldness in one place")

The hero. Per brief §5's explicit suggestion: open with the Agentic-SysID demo — the real pendulum plant and the identified model swinging in lockstep, styled as a two-channel readout using exactly the `signal` (actual) / `trace` (identified) pair from the palette above, so the accent colors on this one bold element *are* the content, not decoration layered on top. Muted, autoplaying, pauseable, `prefers-reduced-motion` swaps it for a static frame. Everything else on the site stays quiet: no other motion, no gradients, no icon grids.

### What I'm deliberately not doing

- No particle backgrounds, no auto-typing text, no scroll-jacking (explicitly banned, brief §5).
- No stock photography or abstract "AI" imagery — every image is a real result or a real figure.
- Not using al-folio's default Inter/Roboto stack or its card-heavy publication/project list styling — heavily de-templating per brief §5's requirement that the site "must not be recognizable as al-folio."

---

## Decisions log

- 2026-07-23: `Hojat-Salehi.github.io` did not exist yet on GitHub; principal creating it now via github.com/new (empty, no README/license) since repo creation needs the web UI or an API token, not just the SSH deploy key already set up for push/pull.
- 2026-07-23: No local Ruby/Jekyll/Node available in this build environment (confirmed — no interpreter, no environment-modules entry, conda present but non-functional). Chosen approach: push incrementally to the live repo and use GitHub Pages' own remote build as validation, since it's the same engine that renders the real site. Principal confirmed this tradeoff is acceptable (repo not yet announced anywhere).
- Work-authorization line, confirmed final wording: "Currently authorized to work in the US through OPT with STEM extension, no employer sponsorship required."
- No Scholar citation counts will be displayed on the Publications page (principal's call, brief §6.1 required asking before displaying them).
- Custom domain (hojatsalehi.com) not purchased yet — building against the default `hojat-salehi.github.io` URL for now; domain/CNAME/HTTPS setup deferred until purchased.
