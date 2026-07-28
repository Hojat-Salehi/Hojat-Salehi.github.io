# Hojat Allah Salehi — personal site

Source for [hojatsalehi.com](https://hojatsalehi.com) (custom domain via `CNAME`; `hojat-salehi.github.io` redirects here). Built on [al-folio](https://github.com/alshedivat/al-folio) v0.9.0, heavily customized.

## Structure

- `_pages/` — Home (`about.md`), Publications, CV
- `_bibliography/papers.bib` — single source of truth for the Publications page (edit this file, nothing else, to add/update a paper)
- `_data/cv.yml` — CV page content
- `assets/pdf/` — CV PDF download
- `NOTES.md` — design decisions and rejected alternatives
- `QUESTIONS.md` — open questions blocking full launch

## Build

No local Ruby/Jekyll in the environment this was built in — the site is built and deployed via `.github/workflows/deploy.yml` (GitHub Actions, using `jekyll-scholar` for BibTeX-driven publications) on every push to `main`, publishing static output to the `gh-pages` branch.

To build locally with Ruby available:

```bash
bundle install
bundle exec jekyll serve
```

## License

Theme code inherited from al-folio remains under its original MIT license (see `LICENSE`). All content (CV, publications, prose) is © Hojat Allah Salehi.
