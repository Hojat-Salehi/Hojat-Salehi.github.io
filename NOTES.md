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
- Custom domain (hojatsalehi.com) not purchased yet — building against the default `hojat-salehi.github.io` URL for now; principal will reconsider once the rest of the site is finalized (confirmed 2026-07-24).
- 2026-07-24: work-authorization line revised to "Currently authorized to work in the US through OPT (eligible for STEM extension), no employer sponsorship required." — principal's preferred phrasing over the original draft.
- 2026-07-24: **canonical name vs. display name split**, per brief §8 — `site.first_name`/`site.last_name` stay "Hojat Allah"/"Salehi" (canonical, matches publications; used in footer copyright, `<meta name="author">`, and the JSON-LD Person schema so search engines/citation tools match the right identity). Added `site.display_name: "Hojat Salehi"`, used only in the three purely visual/human-facing spots: the H1 on Home, the nav-bar brand on other pages, and the browser tab title / social-share title. Principal wanted "Allah" dropped from the visible name but not from the parts that need to match his publication record.
- 2026-07-24: `_pages/about.md`'s `title: blank` (a value with special meaning elsewhere in the theme — see below) was leaking into the nav bar as the literal, visible string "blank" for the Home nav item. Changed to `title: Home`. Confirmed safe: the only other place that checks for the literal string `"blank"` is `metadata.html`'s browser-tab-title logic, which is guarded by `page.url != "/"` too, so Home's own tab title is unaffected.
- 2026-07-24: `max_width` raised from 800px to 1040px for a roomier desktop/laptop layout. This is only an upper bound on the content column (`_sass/_layout.scss`), so mobile is unaffected either way — a phone viewport is always narrower than either value.
- 2026-07-24: removed the RSS icon from the social row (`rss_icon: false`) — it's the `fa-rss-square` icon, which does look like a WiFi signal, and it linked to a feed with zero posts. Re-enable once the Notes blog (Phase 4) has real content.
- 2026-07-24: **photo added** (`PHOTO.jpg`, supplied by principal) and processed into three assets with Pillow (no ImageMagick available in this environment, but Pillow 8.3.2 is):
  - `assets/img/profile.jpg` — head/shoulders crop, source crop box `(0.08w, 0, 0.92w, 0.70h)`, resized to 900px wide.
  - `assets/img/favicon.png` — tight square face crop, source crop box `(0.30w, 0.02h, 0.78w, 0.02h+0.48w)`, resized to 192×192.
  - `assets/img/og-image.png` — 1200×630 generated card: the favicon crop masked into a circle (380px), name in NimbusSans-Bold 74pt, tagline in NimbusSans-Regular 34pt, URL in DejaVu Sans Mono, on the NOTES.md paper/ink/signal palette. Fonts used from system paths under `/usr/share/fonts/urw-base35/` and `/usr/share/fonts/dejavu/`.
  - **To regenerate with a new photo:** replace the source file and re-run the same crop-box ratios (they're relative to the source image's own width/height, so they should reframe reasonably on a similarly-composed portrait photo) — or just ask me to redo it.
- 2026-07-24: ORCID set (`0000-0002-4186-9349`). dblp and Semantic Scholar profiles will **not** be created — principal's call, Google Scholar already covers citation discovery and it's not worth maintaining extra profiles.
- 2026-07-24: **Phase 2 started — Systems page, one system at a time.** Replaced `_pages/projects.md` (al-folio's default card-grid page, driven by the unused `_projects` collection) with `_pages/systems.md`, driven by `_data/systems.yml` and a custom `_includes/system_card.html` partial rendering the brief's required Problem → Approach → Result → Artifact structure — never a feature list, never al-folio's icon-grid pattern (brief §5/§6.2). Removed the now-unused `_projects` collection entry from `_config.yml` and the unused `_includes/projects.html` / `projects_horizontal.html` templates. Added `_sass/_systems.scss` for the card layout, using the theme's existing `--global-*` CSS custom properties so it already works in light/dark — full bespoke visual pass still lands with Task #7.
  - `nav: false` on `/systems/` until all four systems have real cards — will flip to `true` once the Systems page as a whole is ready, consistent with the brief's "every card has a figure and a real number" gate for Phase 2.
- 2026-07-24: **CorBin-FL Systems card — fully sourced, no principal input needed.** Figure 1 (four-panel method schematic: Initialization / Secure Pairwise Link / Model Update and Share Seeds / Aggregation) was rasterized from `CorbinFL_paper/CorbinFL_Method (1).pdf` via Ghostscript (`gs -sDEVICE=pngalpha -r300`, no `pdftoppm`/ImageMagick available in this environment), trimmed of whitespace and resized to 1600px wide with Pillow. The PCA error-concentration figure came straight from `repos/CorBin-FL/pca_all_weights.png` (flattened alpha to white, resized to 1400px, optimized — 521KB → 420KB). The ten-baseline comparison table and the CIFAR-10/FEMNIST accuracy numbers are both transcribed directly from `repos/CorBin-FL/README.md`'s own tables — nothing computed or estimated.
- 2026-07-24: **Agentic-SysID Systems card — partially sourced, one `[TK]` filed.** The architecture flowchart came from `repos/Agentic-SysID/demo/FlowChart.png`. The parameter-accuracy numbers (K_u/K_d/K_s within 1–3% of true values) and the 10.05° RMSE came from reading the last frame of `demo/demo.gif` with Pillow (`im.seek(im.n_frames - 1)`) — those are real numbers baked into the animation by an actual pipeline run, not invented. What I could *not* get: experiments-consumed-per-run and fidelity-ladder-descent frequency, both of which the brief explicitly asks for — the experiment database that would answer this (`data/`) is gitignored and absent from this clone. Filed as Q-006 in `QUESTIONS.md` rather than guessing.
