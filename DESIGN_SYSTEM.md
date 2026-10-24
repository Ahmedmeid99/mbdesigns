# MB Designs design system

The website uses one shared visual system in `src/design-system.css`. Page-level CSS should compose these variables instead of creating new one-off values.

## Foundations

- **Color:** `--color-paper`, `--color-surface`, `--color-surface-muted`, `--color-ink`, `--color-ink-soft`, `--color-accent`, and structural line tokens.
- **Typography:** `--font-body`, `--font-display`, `--font-editorial`, shared label/body/lead/title sizes, and shared line-height and tracking values.
- **Spacing:** a 4px-based scale from `--space-1` through `--space-12`, plus responsive section spacing tokens.
- **Layout:** `--container-wide`, `--container-content-width`, `--container-narrow-width`, and `--gutter`.
- **Surfaces:** shared radii, borders, shadows, focus ring, and 44px control height.
- **Motion:** fast UI feedback, interruptible transitions, one shared entrance curve, and a complete reduced-motion fallback.

## Usage rules

1. Use `Container` for every page section. Use `fluid` only for intentional full-bleed hero or media sections.
2. Use `var(--gutter)` for horizontal section padding; do not add page-specific viewport offsets.
3. Use the spacing scale for gaps, margins, and padding. Avoid arbitrary values unless the artwork requires optical correction.
4. Use borders for structure and shared shadows for elevated surfaces.
5. Headings balance automatically and body copy uses pretty wrapping.
6. Interactive controls must retain a visible focus state and a 44px touch target.
7. Animate only `opacity`, `filter`, `scale`, or `transform`; never use `transition: all`.
8. Add new colors, radii, or type sizes to the shared tokens before using them in a page.

## Awards page pattern

- Use `display-title` for the hero and full-bleed narrative statement.
- Use `SectionHeading` for the awards overview and every award-family heading.
- Keep certificates in the content container with intrinsic image dimensions and a hairline image outline.
- Present award projects as alternating editorial pairs on wide screens and a copy-first single column below `820px`.
- Use the accent only for hierarchy markers such as years and item numbers; long-form copy stays on neutral ink tokens.
- Keep entrance motion limited to the shared `[data-reveal]` treatment and preserve the global reduced-motion fallback.

## About page pattern

- Keep the founder portrait and opening statement full-bleed, with the title and supporting copy treated as separate entrance steps.
- Use `SectionHeading` for story, philosophy, mission, and vision so their hierarchy matches the rest of the site.
- Pair large display headings with readable copy columns capped near `64ch`; never inherit the centered home-page collage copy style.
- Use structural hairlines instead of cards for story, mission, and vision, preserving the studio's editorial character.
- Alternate mission and vision on wide screens, then restore a consistent heading-first reading order below `760px`.
- Keep the philosophy image crisp with a contrast gradient rather than a backdrop blur.
