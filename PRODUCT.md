# Alsalloum Medical

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

React with TypeScript and Vite for the local implementation. The old static site was removed from the active project after preserving a [pre-cleanup snapshot on GitHub](https://github.com/nasermaaz-20/alsalloummed/tree/5ca48e4682e3a04c69b4b20ce161551e4fc0dd83). Hosting configuration is prepared, but the final hosting environment remains undecided; no production deployment was made.

Anime.js is explicitly required by the user as the animation runtime: https://animejs.com/ . Its official React integration uses effect-scoped instances with cleanup; implementation should follow the current official API.

## Users

Doctors and hospitals learning about Alsalloum Medical, its surgical supply capabilities, clinical collaborations, and product categories.

## Product Purpose

A bilingual Arabic/English company website and product catalogue with requests for quotations through WhatsApp. The primary purpose is introducing the company and its experience to medical professionals.

The user also requested launch preparation and loading states. Builds now pre-render the 12 localized pages as static HTML, with page-specific search/share metadata, sitemap, robots rules, and a genuine 404 page. The app has a bounded initial loading screen and individual image skeleton, loaded, and error states; motion respects reduced-motion preferences. Hosting configuration is prepared, but the production site has not been deployed.

## Positioning

A Syrian company established in Aleppo in 2007, specializing in supplies for orthopedic and neurosurgical operations. Its supplied company profile describes timely provision of surgical materials, geographic coverage, clinical collaborations, and humanitarian work. These are company-provided facts, not independent certifications.

## Operating Context

Visitors read company information, inspect supply categories and clinical cases, identify collaborating manufacturers, and contact the company or its representative. Existing project images and company PDFs supply the initial content. Changes after launch will be requested from the assistant; an administration dashboard is not required at this stage.

## Capabilities and Constraints

- Arabic and English content. Honor a previously selected language or an explicit language route; on a first unpinned visit, match a supported device language and fall back to Arabic.
- Company information, category-level catalogue, collaborating manufacturers, case material, and WhatsApp enquiries.
- Existing images are the starting assets. Do not ask the user to re-upload assets already supplied.
- The user has approved a complete redesign and explicitly moved from information gathering into design planning.
- Mobile-first design is explicitly required. Design-system foundations are recorded in `DESIGN-SYSTEM.md` before interface implementation, as requested by the user.
- Clinical cases initially show an image, title, and short summary; detail and image enlargement open on request, as selected by the user.
- At data conflicts, the company profile PDF takes priority over the old website, as explicitly confirmed by the user.
- Maxx Orthopedics is explicitly confirmed as a collaborating company, with https://maxxortho.com/ as its official reference. It is the Maxx already named in the profile, not an additional duplicate manufacturer.
- No assumption of an exclusive agency, government contract, product model availability, online payment, user accounts, or an administration dashboard.
- Public deployment changes, hosting credentials, and launch timing remain outside the current design work.

## Brand Commitments

- Company names: شركة السلوم الطبية / Alsalloum Medical.
- Use the new logo in `docs/sources/DOC-20261020-WA0098.pdf`, replacing the old visual identity.
- The user rejects the existing website's visual design in full. Treat it as a content source and anti-reference, not as a visual direction to refine.
- Colors must be derived from the new logo, as explicitly requested by the user. Representative samples and interface tokens are documented in `DESIGN-SYSTEM.md`; they are not an official brand manual.
- Anime.js is the confirmed animation runtime. The user delegated motion intensity to the designer; the initial design decision is a balanced opening and task-related interactions, with reduced-motion support.
- Typography and page composition remain design proposals to review on the first interface. No external website has been selected by the user as a binding visual reference.
- Preserve existing factual content and its original files. Resolve source disagreements according to the user's stated priority.

## Evidence on Hand

- `docs/PROJECT-CONTEXT.md`: detailed Arabic inventory of approved decisions, source facts, differences, and remaining questions.
- `docs/sources/Alsalloum Medical-P.pdf`: five-page company profile, visually inspected in full; authoritative for conflicting company data.
- `docs/sources/DOC-20261020-WA0098.pdf`: new logo, visually inspected.
- The [GitHub backup](https://github.com/nasermaaz-20/alsalloummed/tree/5ca48e4682e3a04c69b4b20ce161551e4fc0dd83/docs/sources/legacy-site) retains the original static site and its 13 images. These duplicate files are no longer part of the active checkout.
- `docs/sources/manifest.json`: hashes for the two retained original PDFs. The full earlier manifest is preserved in the backup.
- The six clinical case images and current manufacturer logos remain in `public/assets/`; obsolete and unused image copies are retained only in the GitHub backup.
- Manufacturer references do not prove availability of every manufacturer product. No model inventory, verified statistics, testimonials, or certifications have been supplied.

## Product Principles

- Explain the company and its actual capabilities clearly to medical professionals.
- Preserve and trace source content across the redesign.
- Make enquiries easy without introducing unnecessary account or checkout steps.
- Respect Arabic and English equally rather than treating translation as an afterthought.
- Present claims only at the strength supported by the supplied sources and user confirmations.
