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

## Shared site chrome

- Every route uses the same fixed `SiteHeader`: white navigation and wordmark over one restrained dark-to-transparent gradient at the top of a hero.
- After scrolling, the shared header gains one dark translucent surface so navigation stays readable above every page; do not add route-specific header color or positioning variants.
- Keep anchor targets clear of the fixed header with the shared root `scroll-padding-top` value.
- The shared footer starts directly with the dark brand and office directory. Keep page-level promotional callouts out of the footer.

## Awards page pattern

- Use `display-title` for the hero and full-bleed narrative statement.
- Use `SectionHeading` for the awards overview and every award-family heading.
- Keep certificates in the content container with intrinsic image dimensions and a hairline image outline.
- Present award projects as alternating editorial pairs on wide screens and a copy-first single column below `820px`.
- Use the accent only for hierarchy markers such as years and item numbers; long-form copy stays on neutral ink tokens.
- Keep entrance motion limited to the shared `[data-reveal]` treatment and preserve the global reduced-motion fallback.

## About page pattern

- Keep the About narrative focused on four visitor needs: the founder, the studio story, the design philosophy, and the mission/vision that guide the practice.
- Use a split true-viewport hero on wide screens so the founder portrait keeps its full composition; switch to an image-overlay hero below `720px`.
- Use `SectionHeading` for story, philosophy, and direction so their hierarchy matches the redesigned Home page.
- Pair large display headings with readable copy capped near `58ch`; use sentence case for long paragraphs rather than dense all-caps copy.
- Present studio milestones as a structural fact strip and design principles as ordered rows with tabular indices.
- Keep mission and vision in equal editorial columns on wide screens and one reading-order column on mobile.
- Use hairlines and neutral image outlines instead of decorative cards or shadows, preserving the studio's architectural character.
- Keep local WebP images, intrinsic dimensions, lazy loading below the hero, and the shared reduced-motion fallback.

## Home page pattern

- Keep the narrative focused on six visitor needs: studio positioning, selected work, services, recognition, trusted clients, and contact through the shared footer.
- Use one true-viewport architectural hero with a concise value proposition and two clear routes: projects and studio profile. Do not add a blocking intro curtain.
- Give projects the largest share of the page. Present six projects from distinct practice categories as one horizontal, scroll-snapped row with keyboard-focusable overflow and explicit previous/next controls.
- Present services as one integrated-practice section instead of repeating standalone service, manifesto, and location sections.
- Present every available client logo as section 04 in one continuous marquee, duplicate the sequence only for visual continuity, pause on hover/focus, and replace the animation with native horizontal scrolling when reduced motion is requested.
- Summarize recognition as section 05 on Home and link to the complete Awards page; do not reproduce the entire awards archive on the landing page.
- Preserve local WebP posters and MP4 sources, intrinsic image dimensions, lazy loading below the first viewport, and static poster fallbacks for reduced motion.
- Use the accent only for hierarchy markers and dates; use structural hairlines, neutral image outlines, and the shared spacing scale throughout.
