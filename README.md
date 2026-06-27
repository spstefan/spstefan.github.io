# stefanspanic.com

Personal site — built with [Jekyll](https://jekyllrb.com/) and hosted on GitHub Pages.
GitHub builds the site automatically on every push to `main`; there is nothing to build by hand.

## Writing a new post

1. Create a file in `_posts/` named `YYYY-MM-DD-some-title.md` (the date and the
   order matter — newest shows first).
2. Add this header at the top, then write the post in Markdown below it:

   ```markdown
   ---
   title: "Your post title"
   summary: "One line shown in the list and on the home page."
   ---

   Your post, in **Markdown**. Use `##` for section headings (a single `#`
   is reserved for the post title, which comes from `title:` above).
   ```

3. Commit and push. The post appears at `stefanspanic.com/writing/some-title/`,
   and previews on the home page and the Writing index update automatically.

## Pages

- `index.html` — About / landing (`/`)
- `cv.html` — CV (`/cv/`)
- `writing.html` — Writing index (`/writing/`)
- `_layouts/` — shared HTML (header, footer, article shell)
- `styles.css` — all styling (monochrome, serif)

## Previewing locally (optional)

With Ruby + Jekyll installed: `jekyll serve` then open `http://localhost:4000`.
