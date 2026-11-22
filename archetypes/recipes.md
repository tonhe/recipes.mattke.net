---
title: "{{ replace .File.ContentBaseName "-" " " | title }}"
summary: ""           # one line for the contents and listings
variant: ""           # only when two recipes share a title, e.g. "three fillings"
credit: ""            # optional: replaces "From the kitchen of …" when the story is more specific, e.g.
                      # "[Dad](/people/dad/)'s recipe, written on [Grandma Vi](/people/grandma-vi/)'s card"
people: []            # who it's from, e.g. ["Grandma Vi"]. Must match a person's title.
categories: []        # e.g. ["Sides"], ["Main dishes"]
tags: []
yield: ""             # as written, e.g. "Serves about 10"
oven: ""              # e.g. "350°"
time: ""              # as written, e.g. "about 1 hr"
time_label: ""        # defaults to "Bake". Use "Cook", "Simmer", etc. for stovetop recipes.
show_photos: true     # false keeps the card photos off the site (the recipe still shows)
featured: false       # true puts it on the front page
feature_order: 0      # lower comes first; the first featured recipe gets the big spot

# Handwriting crops: black ink on a transparent background, saved in this folder.
# From a card photo:  crop it, keep the darkest channel, threshold, use as alpha. See README.
title_image: ""
note_image: ""

# Copy every line exactly as written. Put your clarifications in `editor`.
ingredients:
  - line: ""
    note: ""          # the cook's own aside, verbatim
    alt: ""           # the cook's alternate, verbatim
    editor: ""        # your clarification

# For recipes with parts, use groups instead of `ingredients`:
# ingredient_groups:
#   - name: "Topping"
#     ingredients:
#       - line: ""

steps:
  - ""

author_note: ""       # closing remark on the card, verbatim
editor_notes: []      # your notes about the recipe as a whole

sources:              # card photos in this folder, in order
  - image: ""
    caption: ""

# When there's no card and the recipe came from somewhere else:
# source:
#   where: "The Spokesman-Review · February 26, 2014"
#   label: "Where this came from, in a sentence or two."
#   url: ""

# Other published versions, compared against the card:
# versions:
#   - name: "Aunt Teddy's version"
#     by: "Who wrote it"
#     where: "Where it ran"
#     url: ""
#     notes: ["What changed"]
---

Optional story: who made it, when, what it was served with.
