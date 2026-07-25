# Open questions

All items from the first round are resolved as of 2026-07-24:

- ~~Q-001 (looking for line)~~ — removed entirely, principal's call.
- ~~Q-002 (photo)~~ — resolved. `PHOTO.jpg` supplied, cropped to `assets/img/profile.jpg` (profile), `assets/img/favicon.png` (favicon), and composited into `assets/img/og-image.png` (social share card). **To replace the photo later:** drop a new photo anywhere in the repo, tell me, and I'll regenerate all three crops the same way — or if doing it yourself, see the crop recipe in `NOTES.md`.
- ~~Q-003 (favicon/OG image)~~ — resolved, used the photo for both (see above), styled to match the `NOTES.md` palette (paper background, ink text, signal-blue accent).
- ~~Q-004 (domain)~~ — staying on `hojat-salehi.github.io` until the rest of the site is finalized; principal will reconsider purchasing a domain after that.
- ~~Q-005 (ORCID/dblp/Semantic Scholar)~~ — ORCID set (`0000-0002-4186-9349`). dblp and Semantic Scholar intentionally left blank permanently — not worth the extra profiles to maintain given Google Scholar already covers this.

- ~~Q-006 (Agentic-SysID experiment budget / fidelity-ladder descent rate)~~ — resolved 2026-07-24. Principal's call: this system is descriptive/run-it-yourself for now, not something he's logging real runs against. Card stays as-is (`[TK]` in the `result:` field, parameter-accuracy and RMSE numbers from the demo stand on their own) — not chasing this further unless he starts actually running it.
- ~~Q-007 (game-analyst-multiagent prediction track record)~~ — resolved 2026-07-24, same call as Q-006: descriptive card for now, no live accuracy number or sample report. Revisit if/when he actually starts running it against real scheduled games.

- ~~Q-008 (CorBin-FL privacy/accuracy explorer: missing datasets and baselines)~~ — mostly resolved 2026-07-24. Principal pointed me at `CorbinFL_paper/corbinfl.tex` — its own results tables (`tab:MNIST`, `tab:FEMNIST`, `tab:all`) turned out to be a strict superset of `results.log` and the README table combined: full 4-point ε-sweeps for CIFAR-10 and MNIST (including the CorBin-FL × CIFAR-10 points `results.log` was missing), plus Gaussian and Augmented CorBin-FL reference points. Rebuilt `assets/data/corbin_sweep.json` from these tables. Shakespeare and Sentiment140 turned out to use a *different* evaluation entirely — accuracy vs. communication round at fixed ε, not an ε-sweep — so they're shown as the paper's own published figures (`assets/img/demos/shakespeare-eps1-convergence.png`, `sent140-convergence.png`) in a separate section of `/demos/`, not forced into the sweep chart. **Still genuinely missing:** Reddit — confirmed not evaluated anywhere in the paper (only listed as a supported dataset in the code), so there is nothing to extract. SignSGD and Gaussian *CDP* specifically (as opposed to the Gaussian *PLDP* point that is now included) also don't appear in the paper's tables. Not chasing further — the demo's core claim (CorBin-FL's advantage under tight privacy budgets) is now fully backed by the paper's own published numbers across five datasets.

No open questions blocking launch right now.
