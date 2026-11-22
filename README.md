# recipes.mattke.net

Family recipes from the Mattke kitchens, copied exactly as their cooks wrote them.
Built with [Hugo](https://gohugo.io) (extended, 0.160+). No theme, no npm.

```sh
hugo server          # local preview
hugo --gc --minify   # build to public/
```

## Adding a recipe

```sh
hugo new content recipes/aunt-bettys-bars/index.md
```

Fill in the front matter (the archetype explains each field) and drop card photos into the same
folder. The rules:

- `line`, `note`, `alt`, `steps` and `author_note` are **verbatim** from the card, spelling and
  abbreviations included.
- Anything in our own words goes in `editor` (per ingredient) or `editor_notes` (per recipe).
- `title_image` / `note_image` are optional crops of the cook's handwriting: black ink on a
  transparent background. The site recolors them per design.

## People

Each cook gets `content/people/<slug>/_index.md` with `title` (as used in recipes' `people:`),
`full_name` and an optional bio in the body.

## Handwriting crops

`title_image` and `note_image` are masks: black ink on a transparent background. The site
recolors them in the cook's pen color. From a card photo, with ImageMagick:

```sh
convert card-1.jpg -crop 610x125+95+108 +repage -separate -evaluate-sequence max max.png
convert max.png -level 30%,62% -negate mask.png
convert -size 610x125 xc:black mask.png -alpha off -compose CopyOpacity -composite -trim +repage title.png
```

Taking the lightest channel drops the red and blue ruled lines and keeps the ink.
