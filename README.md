# Apex Collection

A complete React/Vite frontend demonstration of a fictional premium car showroom.

## Run

Requires Node.js 22+ and npm.

```sh
npm install
npm run dev
npm run build
npm run preview
npm run lint
npm test
npm run test:browser
```

Development: http://localhost:5173. Production output: `dist/`.
Browser tests use an installed Microsoft Edge browser on Windows; change `executablePath` in playwright.config.js for your machine, or remove that option and run `npx playwright install chromium`.

## Pages and features

- `/`: cinematic home, featured selection, brand/category browsing, story, highlights.
- `/collection`: 18 vehicles, eight brands, five categories; combined search, brand, category, maximum INR price, fuel and transmission filters, four sorts, active chips and empty state. Controls persist in URL parameters and browser back navigation.
- `/cars/:id`: overview, INR price, structured specifications, three image perspectives, native modal lightbox with focus management, Escape and arrow keys, wishlist, compare, enquiry and prefilled booking. Unknown IDs have a useful fallback.
- `/brands`, `/categories`: routed filtering links.
- `/wishlist`: persistent favorites with synchronized counts.
- `/compare`: up to three distinct cars, responsive aligned table, remove/clear controls, empty/single-car states and persistent tray.
- `/test-drive`, `/enquiry`, `/contact`: validated demo forms, local-calendar past date rejection, field errors, focus on first invalid field, duplicate submission protection, local storage feedback.
- `/about`, `/faq`, and a wildcard 404.

## Structure and state

`src/data` holds the single vehicle source and photography references. Context stores only stable IDs; all rendered vehicles derive from source data. Storage decoding rejects corrupted, stale or duplicate IDs. Storage failures retain session state and show feedback. `src/utils/logic.js` holds independently tested filtering, persistence parsing, comparison rules and form validation. Components and pages are reusable modules. Tailwind CSS, Lucide icons, React Router and Framer Motion are integrated. Motion honors reduced-motion preferences; native dialogs handle background inertness and focus restoration.

## Demo limitations and photography

This is not a real dealership. Inventory, INR prices and specifications are sample content, not verified offers. All contact details are fictional. Forms store their last 50 submissions only on the current browser/device; nothing is sent, emailed, booked or processed by a backend. Do not submit sensitive data. Clear this site's browser data to remove all submissions and selections.

Photos include bundled and externally hosted illustrative model-family images; model year, generation and trim may differ. Model-family Wikimedia images link to their source page from the detail page; follow the image on that page for creator and licensing information. The Mercedes-Benz photograph is served by Unsplash. Unavailable images show explicit labeled placeholders. Three gallery perspectives crop the same photograph and are labeled accordingly. External image availability depends on network access. No manufacturer affiliation is implied.

## Deployment

Run `npm run build`. For Netlify manual deployment, upload the **built `dist` folder**, not the source folder. `public/_redirects` is copied into dist and rewrites nested routes to index.html. `netlify.toml` also configures the build and SPA fallback for repository-based Netlify deployment. Vite dev/preview also support nested-route fallback. No external publication has been performed.

## Verification

- `npm run build`: production bundle produced.
- `npm run lint`: clean.
- `npm test`: four core tests for combined filters/sorts/no results, safe storage decoding, comparison limits/duplicates, local-date and form validation.
- `npm run test:browser`: five Edge browser tests covering filters and browser back, favorites/comparison persistence and removal/limits, lightbox keyboard/focus and unknown routes, booking validation/local demo feedback, mobile navigation/FAQ, nested-route refresh and overflow at 360/768/1024/1440px.
- Browser screenshots: desktop-preview.png and mobile-preview.png.

Browser tests are not an exhaustive accessibility audit. Actual Netlify infrastructure behavior requires deployment; local SPA refresh was verified. Forms have no real availability check.

