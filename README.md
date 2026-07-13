# Robin Hur — Portfolio

Jekyll-based personal portfolio. Live at robinkhur.github.io.

## Run locally

```
bundle install
bundle exec jekyll serve
```

## Add a project

Create `_projects/<name>/index.md` with frontmatter:

```yaml
---
layout: post
title: My Project
description: One-line summary.
skills:
  - Skill 1
  - Skill 2
main-image: /cover.jpg
---
```

Drop the cover image in the same folder.

## Edit content

`_config.yml` — name, headline, contact, social links, skills. Lives at site root.

## Layout

```
_config.yml                # site title, url, skills, collections, plugins, exclude
index.html                 # home (one-pager)
projects.html              # /projects/ expanded grid
404.html                   # permalink /404.html
_layouts/
  wrapper.html             # base shell with meta tags, navbar, footer
  post.html                # project-detail layout (wraps wrapper)
_includes/                 # about, contact, footer, home, navbar, projects, services
_projects/                 # one folder per project
assets/
  img/                     # favicon.png, curved-arrow.svg, random-lines.svg
  images/profile-image/    # profile.jpg
  resume/                  # resume.pdf
  js/script.js
css/
  styles.css
```

## Deploy

Push to the `main` branch of `robinkhur.github.io` — GitHub Pages will build with the `github-pages` gem from `Gemfile`.

