/* ============================================================
   posts.js — your blog lives here.

   To add a post, copy a block below and edit it. Fields:
     slug    — the URL id (letters, numbers, hyphens; must be unique)
     title   — shown everywhere
     date    — "YYYY-MM-DD" (used for ordering; newest shows first)
     summary — one line, shown in the list & on the landing page
     body    — the article, written in Markdown

   Markdown supported: # headings, **bold**, *italic*, `code`,
   ``` code blocks, > quotes, - lists, 1. lists, [links](url),
   and --- horizontal rules.

   These three are placeholders — replace them with your own.
   ============================================================ */

window.POSTS = [
    {
        slug: "data-governance-cdmp",
        title: "Reading notes: data governance for the CDMP",
        date: "2026-06-20",
        summary: "Working through the DMBOK chapter on governance, and why “ownership” is the word that does the most quiet work.",
        body:
`I'm preparing for the **CDMP** exam, and the chapter on data governance keeps pulling me back to a single idea: governance is mostly a question of *who decides*.

## Ownership is a role, not a person

The DMBOK is careful to separate the **data owner** (accountable) from the **data steward** (responsible for the day-to-day). It's easy to collapse these into one overworked person, but the distinction matters:

- The owner sets policy and accepts risk.
- The steward applies the policy and maintains quality.
- Everyone else is a *consumer* with obligations, not just privileges.

> Governance fails quietly. Nobody files a ticket that says "our definitions diverged six months ago."

## Why this matters in heavy-asset industries

In the industrial-data world I care about, the cost of a bad definition compounds. A sensor tag that means two different things in two systems doesn't break anything today — it breaks a model in eighteen months.

More notes as I work through the rest of the syllabus.`
    },
    {
        slug: "industrial-data-platforms",
        title: "What I mean when I say “industrial data platform”",
        date: "2026-05-11",
        summary: "A short definition, and the three properties I think distinguish a platform from a very large database.",
        body:
`The phrase *industrial data platform* gets used loosely. Here's the working definition I use.

A platform is not just where the data lives. It's the set of shared services that let many teams build on the same foundation without coordinating every change.

## Three properties

1. **A stable contract.** Producers and consumers agree on schemas and meanings, and those don't change underneath you.
2. **Self-service.** A new team can onboard without a meeting with the platform team.
3. **Observability.** When something drifts, you find out before your users do.

If a system has all three, the word *platform* earns its keep. If it has none, it's a database with ambitions.`
    },
    {
        slug: "hello",
        title: "A small, slow website",
        date: "2026-04-02",
        summary: "Why I'm building a plain, monochrome corner of the internet instead of posting threads.",
        body:
`This is the first post on a site I'm building deliberately small.

No tracking, no newsletter pop-up, no infinite scroll. Just writing, a CV, and a way to reach me. It loads fast because there's almost nothing to load.

I'll mostly write about **data, platforms, and the work of making technical systems legible to the people who depend on them** — the space between engineering and the business that I find genuinely interesting.

If you found your way here, welcome.`
    }
];
