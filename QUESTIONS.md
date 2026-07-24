# Open questions

All items from the first round are resolved as of 2026-07-24:

- ~~Q-001 (looking for line)~~ — removed entirely, principal's call.
- ~~Q-002 (photo)~~ — resolved. `PHOTO.jpg` supplied, cropped to `assets/img/profile.jpg` (profile), `assets/img/favicon.png` (favicon), and composited into `assets/img/og-image.png` (social share card). **To replace the photo later:** drop a new photo anywhere in the repo, tell me, and I'll regenerate all three crops the same way — or if doing it yourself, see the crop recipe in `NOTES.md`.
- ~~Q-003 (favicon/OG image)~~ — resolved, used the photo for both (see above), styled to match the `NOTES.md` palette (paper background, ink text, signal-blue accent).
- ~~Q-004 (domain)~~ — staying on `hojat-salehi.github.io` until the rest of the site is finalized; principal will reconsider purchasing a domain after that.
- ~~Q-005 (ORCID/dblp/Semantic Scholar)~~ — ORCID set (`0000-0002-4186-9349`). dblp and Semantic Scholar intentionally left blank permanently — not worth the extra profiles to maintain given Google Scholar already covers this.

## Q-006 — Agentic-SysID experiment budget and fidelity-ladder descent rate

**Blocking:** Systems page card for Agentic-SysID
**Placeholder:** `[TK]` in `_data/systems.yml`, `agentic-sysid` entry, `result:` field
**Question:** The brief asks for (a) experiments consumed per run and (b) how often
the fidelity ladder descends past the white-box phase. I pulled real parameter-accuracy
and RMSE numbers straight from `demo/demo.gif`'s last frame, but those two specific
numbers live in the experiment database (`data/`), which is gitignored and not present
in this repo clone — so I have nothing to extract them from. Do you have a results log,
a notebook, or can you just tell me: across the runs you've done, roughly how many
plant experiments does a full pendulum identification consume, and how often does
validation actually kick the pipeline down to grey-box or black-box instead of
accepting the white-box model?
**If unanswered:** card ships with those two numbers omitted — the parameter-accuracy
and RMSE numbers already sourced from the demo stand on their own.

## Q-007 — game-analyst-multiagent: no prediction track record yet

**Blocking:** Systems page card for Game Analyst
**Placeholder:** `[TK]` in `_data/systems.yml`, `game-analyst-multiagent` entry, `result:` field
**Question:** The brief calls this out specifically — "measured prediction accuracy
over N games... this is what separates it from a toy." The repo is built to grade
itself (`game_analysis.db` + the post-game review step), but `*.db`, `reports/`,
and `memories_db/` are all gitignored and empty in this clone — there's no run
history anywhere I can extract from. Same story for a sample HTML report to link
as an artifact. There isn't a number I can pull here; this needs you to actually
run `python full_game_analysis.py analyze ...` against real, currently-scheduled
games (and `review` once they finish) so a track record starts accumulating.
**If unanswered:** card ships with the architecture and the debate mechanism
described, no accuracy number and no sample report link, both flagged as the
system's current biggest weakness rather than glossed over.

No other open questions blocking launch right now.
