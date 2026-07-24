# Open questions

All items from the first round are resolved as of 2026-07-24:

- ~~Q-001 (looking for line)~~ — removed entirely, principal's call.
- ~~Q-002 (photo)~~ — resolved. `PHOTO.jpg` supplied, cropped to `assets/img/profile.jpg` (profile), `assets/img/favicon.png` (favicon), and composited into `assets/img/og-image.png` (social share card). **To replace the photo later:** drop a new photo anywhere in the repo, tell me, and I'll regenerate all three crops the same way — or if doing it yourself, see the crop recipe in `NOTES.md`.
- ~~Q-003 (favicon/OG image)~~ — resolved, used the photo for both (see above), styled to match the `NOTES.md` palette (paper background, ink text, signal-blue accent).
- ~~Q-004 (domain)~~ — staying on `hojat-salehi.github.io` until the rest of the site is finalized; principal will reconsider purchasing a domain after that.
- ~~Q-005 (ORCID/dblp/Semantic Scholar)~~ — ORCID set (`0000-0002-4186-9349`). dblp and Semantic Scholar intentionally left blank permanently — not worth the extra profiles to maintain given Google Scholar already covers this.

- ~~Q-006 (Agentic-SysID experiment budget / fidelity-ladder descent rate)~~ — resolved 2026-07-24. Principal's call: this system is descriptive/run-it-yourself for now, not something he's logging real runs against. Card stays as-is (`[TK]` in the `result:` field, parameter-accuracy and RMSE numbers from the demo stand on their own) — not chasing this further unless he starts actually running it.
- ~~Q-007 (game-analyst-multiagent prediction track record)~~ — resolved 2026-07-24, same call as Q-006: descriptive card for now, no live accuracy number or sample report. Revisit if/when he actually starts running it against real scheduled games.

## Q-008 — CorBin-FL privacy/accuracy explorer: missing datasets and baselines

**Blocking:** Nothing — Demo 1 shipped with what's real and extractable.
**Placeholder:** none; the demo (`/demos/`) covers CIFAR-10, MNIST, FEMNIST with 9/6/4 methods respectively, all sourced from `results.log` and the README results table.
**Question:** `results.log` has no Shakespeare, Sent140, or Reddit data at all, and no CorBin-FL sweep for CIFAR-10 beyond the two points (ε=1, ε=5) already in the README table — the full λ-sweep for CIFAR-10 CorBin-FL doesn't seem to be in this repo clone, only in the paper's own results. Same gap for SignSGD, Gaussian LDP/CDP, and Augmented CorBin-FL — none of these appear in `results.log` at all. Since the brief calls this demo "the single best argument that the theory produces something real," it might be worth regenerating a fuller `results.log` (via `analyze_results.py` against your full local `results/` directory, if those runs still exist on your machine) and adding it to the repo, or pointing me at wherever those numbers already live.
**If unanswered:** demo stays at its current honest scope — real numbers, three datasets, no fabricated curves.

No open questions blocking launch right now.
