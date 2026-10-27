# MB Designs design system

The website uses one shared visual system in `src/design-system.css`. Page-level CSS should compose these variables instead of creating new one-off values.

## Foundations

- **Color:** `--color-paper`, `--color-surface`, `--color-surface-muted`, `--color-ink`, `--color-ink-soft`, `--color-accent`, and structural line tokens.
- **Typography:** locally hosted Cal Sans for display titles and locally hosted League Spartan for navigation, labels, subtitles, paragraphs, and controls. Display all site copy in uppercase.
- **Mobile heading scale:** use `--font-size-mobile-hero` for every page `h1`, `--font-size-mobile-section` for primary section `h2` headings, and `--font-size-mobile-feature` for compact editorial features. Do not introduce route-specific viewport scales for the same hierarchy level.
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

- Every route uses the same fixed-height `SiteHeader`: navigation and the official local MB Designs logo over a fully transparent surface, including project gallery pages.
- Use the tightly cropped, lossless `/assets/branding/mb-designs-logo-white-hq.png` on dark heroes, dark narrative panels, open mobile navigation, and the footer. Use `/assets/branding/mb-designs-logo-black-hq.png` on light content. The fixed header detects the surface beneath it and swaps variants without filters or recoloring.
- After scrolling, keep the header colorless and add only background blur plus a restrained hairline; do not add route-specific header color, height, or positioning variants.
- Keep anchor targets clear of the fixed header with the shared root `scroll-padding-top` value.
- The shared footer starts directly with the dark brand and office directory. Keep page-level promotional callouts out of the footer.
- Keep social media controls as accessible 44px icon links directly beneath “LET’S TALK”; do not detach them into a separate footer strip. The Cairo address links to the canonical map coordinates without advertising or tracking parameters.
- Use one global scroll-to-top control from `SiteFooter`: reveal it only after meaningful scroll progress, switch to the light treatment over the dark footer, preserve a 44px-or-larger hit area, and honor reduced-motion preferences.
- Open project gallery images inside the in-page viewer below the shared header; never navigate visitors directly to a raw image asset.
- Start every individual project route with the same full-viewport hero pattern: local project cover, category eyebrow, oversized project name, location, and clear routes back to the category and down to the gallery.

## Interior page hero pattern

- Every page except Home uses the shared `site-page-hero` composition and `--page-hero-height` token.
- Render every non-home hero’s eyebrow, title and lead through the reusable `PageHeroCopy` component so their position, scale, spacing and entrance behavior cannot drift between routes.
- Keep the content hierarchy consistent: compact uppercase eyebrow, balanced display title, then a concise sentence-case lead.
- Align hero copy to the shared gutter near the lower-left of the viewport. Page-specific images and copy may change, but hero height, title scale, spacing, and mobile behavior must not.
- Use the shared `site-page-hero__inner`, `site-page-hero__copy`, `site-page-hero__eyebrow`, `site-page-hero__title`, and `site-page-hero__lead` classes instead of recreating route-specific positioning.
- Home intentionally keeps its own narrative hero and is not part of this pattern.
- Team and Awards use the About page's editorial copy treatment: left-aligned eyebrow, display title and concise lead over a restrained directional image gradient, with the shared full-viewport height and gutter.

## Events and press pattern

- Keep publication marks sourced from the source site's Press section as local optimized WebP assets; never load Wix media at runtime.
- Remove inconsistent source whitespace before display, then place every mark on the same `440 × 160` neutral canvas so logos share one optical footprint without stretching or changing their proportions.
- Preserve descriptive alternative text for every publication mark and use the same grid cell dimensions at each breakpoint.
- Introduce the Events / Press browser with the shared left-aligned `SectionHeading` hierarchy before the view tabs; avoid one-off oversized heading compositions.

## Awards page pattern

- Use `display-title` for the hero and full-bleed narrative statement.
- Use `SectionHeading` for the awards overview and every award-family heading.
- Keep certificates in the content container with intrinsic image dimensions and a hairline image outline.
- Present award projects as alternating editorial pairs on wide screens and a copy-first single column below `820px`.
- Use the accent only for hierarchy markers such as years and item numbers; long-form copy stays on neutral ink tokens.
- Keep entrance motion limited to the shared `[data-reveal]` treatment and preserve the global reduced-motion fallback.

## Projects page pattern

- Use a true-viewport image hero with a category eyebrow, concise lead, and a bottom utility row that links directly to the work below.
- Present project categories as numbered editorial links with project counts; the full image and caption are one keyboard-focusable target.
- Category pages reuse the same hero hierarchy and expose both an all-projects route and an anchored selected-project count.
- Project cards use neutral image outlines, structural caption dividers, tabular indices, and a text action that appears on hover/focus while remaining visible on touch.
- Keep image motion restrained to a small interruptible scale and never animate card layout, dimensions, or spacing.

## About page pattern

- Keep the About narrative focused on four visitor needs: the founder, the studio story, the design philosophy, and the mission/vision that guide the practice.
- Use the locally outpainted full-width founder portrait in the hero. Keep the founder and chair on the right, preserve the complete seated figure and headroom with uncropped desktop framing, and place the copy directly over the empty burgundy negative space on the left; do not add a separate color panel. Use the original portrait above a dedicated copy panel on narrow screens.
- Use `SectionHeading` for story, philosophy, and direction so their hierarchy matches the redesigned Home page.
- Pair large display headings with readable copy capped near `58ch`; use sentence case for long paragraphs rather than dense all-caps copy.
- Present studio milestones as a structural fact strip and design principles as ordered rows with tabular indices.
- Keep mission and vision in equal editorial columns on wide screens and one reading-order column on mobile.
- Use hairlines and neutral image outlines instead of decorative cards or shadows, preserving the studio's architectural character.
- Keep local WebP images, intrinsic dimensions, lazy loading below the hero, and the shared reduced-motion fallback.

## Career page pattern

- Use the shared full-height interior hero, page-title hierarchy, container gutters and restrained image entrance used by the other primary routes.
- Follow the hero with one editorial introduction and one opportunities section; avoid oversized empty gaps, redundant logos and detached campaign-style typography.
- Use `SectionHeading` for both post-hero sections. Present opportunities as structural rows with tabular indices, readable descriptions and a single email action.
- Keep every opportunity action on one line and open the visitor's email client with the opportunity title prefilled in the subject. Do not insert a form between the visitor and the email action.
- On narrow screens, stack each opportunity in reading order and preserve a minimum 44px action target.

## Home page pattern

- Keep the narrative focused on six visitor needs: studio positioning, selected work, services, recognition, trusted clients, and contact through the shared footer.
- Use one true-viewport architectural hero with a concise value proposition and two clear routes: projects and studio profile. Do not add a blocking intro curtain.
- Give projects the largest share of the page. Present six projects from distinct practice categories as one horizontal, scroll-snapped row with keyboard-focusable overflow and explicit previous/next controls.
- Present services as one integrated-practice section instead of repeating standalone service, manifesto, and location sections.
- Present all 49 unique logo crops from the source site's “Our Valued Partners” section as section 04 in two balanced, counter-moving marquee rows. Give every logo the same cell, image frame, and optical height so small source artwork remains legible. Preserve the downloaded originals in `/assets/partners/our-valued-partners/`, but render whitespace-trimmed local copies from `/assets/partners/our-valued-partners-normalized/`; never depend on Wix image URLs at runtime. Duplicate each sequence only for visual continuity, pause both rows on hover/focus, and replace animation with native horizontal scrolling when reduced motion is requested.
- Summarize recognition as section 05 on Home and link to the complete Awards page; do not reproduce the entire awards archive on the landing page.
- Preserve local WebP posters and MP4 sources, intrinsic image dimensions, lazy loading below the first viewport, and static poster fallbacks for reduced motion.
- Use the accent only for hierarchy markers and dates; use structural hairlines, neutral image outlines, and the shared spacing scale throughout.
