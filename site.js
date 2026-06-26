/* ============================================================
   site.js — shared logic for the blog
   No dependencies. Reads window.POSTS (from posts.js).
   ============================================================ */

(function () {
    "use strict";

    /* --- Date formatting ----------------------------------- */
    function formatDate(iso) {
        var d = new Date(iso + "T00:00:00");
        if (isNaN(d)) return iso;
        return d.toLocaleDateString("en-US", {
            year: "numeric", month: "long", day: "numeric"
        });
    }

    /* --- Posts, newest first ------------------------------- */
    function allPosts() {
        return (window.POSTS || []).slice().sort(function (a, b) {
            return b.date.localeCompare(a.date);
        });
    }

    function findPost(slug) {
        return (window.POSTS || []).filter(function (p) {
            return p.slug === slug;
        })[0];
    }

    /* --- Minimal Markdown -> HTML -------------------------- */
    function esc(s) {
        return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }

    function inline(s) {
        // operate on escaped text
        return esc(s)
            .replace(/`([^`]+)`/g, function (m, c) { return "<code>" + c + "</code>"; })
            .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
            .replace(/\*([^*]+)\*/g, "<em>$1</em>")
            .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g,
                '<a href="$2" rel="noopener">$1</a>');
    }

    function renderMarkdown(md) {
        var lines = md.replace(/\r\n/g, "\n").split("\n");
        var html = [];
        var i = 0;

        function flushPara(buf) {
            if (buf.length) html.push("<p>" + inline(buf.join(" ")) + "</p>");
            buf.length = 0;
        }

        var para = [];
        while (i < lines.length) {
            var line = lines[i];

            // fenced code block
            if (/^```/.test(line)) {
                flushPara(para);
                var code = [];
                i++;
                while (i < lines.length && !/^```/.test(lines[i])) {
                    code.push(esc(lines[i])); i++;
                }
                i++; // closing fence
                html.push("<pre><code>" + code.join("\n") + "</code></pre>");
                continue;
            }

            // heading
            var h = /^(#{1,4})\s+(.*)$/.exec(line);
            if (h) {
                flushPara(para);
                var lvl = h[1].length + 1; // shift: # -> h2 inside article
                if (lvl > 4) lvl = 4;
                html.push("<h" + lvl + ">" + inline(h[2]) + "</h" + lvl + ">");
                i++; continue;
            }

            // horizontal rule
            if (/^---+\s*$/.test(line)) {
                flushPara(para); html.push("<hr>"); i++; continue;
            }

            // blockquote
            if (/^>\s?/.test(line)) {
                flushPara(para);
                var quote = [];
                while (i < lines.length && /^>\s?/.test(lines[i])) {
                    quote.push(lines[i].replace(/^>\s?/, "")); i++;
                }
                html.push("<blockquote>" + inline(quote.join(" ")) + "</blockquote>");
                continue;
            }

            // unordered list
            if (/^[-*]\s+/.test(line)) {
                flushPara(para);
                var ul = [];
                while (i < lines.length && /^[-*]\s+/.test(lines[i])) {
                    ul.push("<li>" + inline(lines[i].replace(/^[-*]\s+/, "")) + "</li>");
                    i++;
                }
                html.push("<ul>" + ul.join("") + "</ul>");
                continue;
            }

            // ordered list
            if (/^\d+\.\s+/.test(line)) {
                flushPara(para);
                var ol = [];
                while (i < lines.length && /^\d+\.\s+/.test(lines[i])) {
                    ol.push("<li>" + inline(lines[i].replace(/^\d+\.\s+/, "")) + "</li>");
                    i++;
                }
                html.push("<ol>" + ol.join("") + "</ol>");
                continue;
            }

            // blank line ends a paragraph
            if (/^\s*$/.test(line)) { flushPara(para); i++; continue; }

            // default: paragraph text
            para.push(line.trim());
            i++;
        }
        flushPara(para);
        return html.join("\n");
    }

    /* --- Render a list of posts ---------------------------- */
    function renderList(el, limit) {
        var posts = allPosts();
        if (limit) posts = posts.slice(0, limit);
        if (!posts.length) {
            el.innerHTML = '<p style="color:var(--ink-faint)">No posts yet.</p>';
            return;
        }
        el.innerHTML = posts.map(function (p) {
            return '<li>' +
                '<div class="post-meta">' + formatDate(p.date) + '</div>' +
                '<a class="post-item-title" href="blog.html?post=' +
                encodeURIComponent(p.slug) + '">' + esc(p.title) + '</a>' +
                (p.summary ? '<p class="post-summary">' + esc(p.summary) + '</p>' : '') +
                '</li>';
        }).join("");
    }

    /* --- Render a single article --------------------------- */
    function renderArticle(el, slug) {
        var p = findPost(slug);
        if (!p) {
            el.innerHTML = '<a class="back-link" href="blog.html">Back to writing</a>' +
                '<p>Post not found.</p>';
            return;
        }
        document.title = p.title + " — Stefan Spanic";
        el.innerHTML =
            '<a class="back-link" href="blog.html">Back to writing</a>' +
            '<article class="article">' +
            '<header class="article-header">' +
            '<h1>' + esc(p.title) + '</h1>' +
            '<div class="article-date">' + formatDate(p.date) + '</div>' +
            '</header>' +
            '<div class="article-body">' + renderMarkdown(p.body) + '</div>' +
            '</article>';
    }

    /* --- Boot ---------------------------------------------- */
    function param(name) {
        return new URLSearchParams(window.location.search).get(name);
    }

    document.addEventListener("DOMContentLoaded", function () {
        var recent = document.querySelector("[data-recent-posts]");
        if (recent) renderList(recent, parseInt(recent.dataset.recentPosts, 10) || 5);

        var blog = document.querySelector("[data-blog]");
        if (blog) {
            var slug = param("post");
            if (slug) renderArticle(blog, slug);        // replaces whole container
            else renderList(blog.querySelector(".post-list"));  // fills <ul>, keeps heading
        }
    });

    // expose for debugging
    window.SITE = { renderMarkdown: renderMarkdown, allPosts: allPosts };
})();
