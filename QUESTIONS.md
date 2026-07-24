# Open questions

## Q-001 — Home page "looking for" line
**Blocking:** Home page "currently" section
**Placeholder:** `[TK]` at `_pages/about.md`
**Question:** What roles/timeline should the "looking for" line state (e.g. "research scientist roles in privacy-preserving ML," "agentic AI engineering roles," a target start date)?
**If unanswered:** ships with the `[TK]` visible rather than an invented target.

## Q-002 — Professional photo
**Blocking:** Home page profile image (currently omitted entirely, not a placeholder)
**Question:** A professional photo for the Home page profile slot, per brief §7 asset list.
**If unanswered:** page ships with no photo — text-only, which is a legitimate look, not a broken one.

## Q-003 — Favicon / OG image
**Blocking:** `_config.yml` `icon:` and `og_image:` fields currently point at non-existent files
**Question:** A small square icon/mark for the browser tab favicon, and a social-share preview image.
**If unanswered:** favicon falls back to Jekyll/browser default; OG preview image is blank when links are shared.

## Q-004 — Domain purchase
**Blocking:** `url:` in `_config.yml`, CNAME setup, brief §8 checklist
**Status:** Not purchased yet (confirmed by principal 2026-07-23). Site currently configured against `https://hojat-salehi.github.io`.
**If unanswered:** stays on the default github.io URL indefinitely — not a blocker to launch.

## Q-005 — Identity/discoverability accounts (brief §8, explicitly principal-to-complete)
ORCID, dblp claim, Semantic Scholar claim, Google Search Console verification — none of these can be done on the principal's behalf. `_config.yml` has placeholders (`orcid_id`, `dblp_url`, `semanticscholar_id`) ready to fill in once created.

---

Always includes an "if unanswered" fallback per brief §7 — every item above is safe to ship without.
