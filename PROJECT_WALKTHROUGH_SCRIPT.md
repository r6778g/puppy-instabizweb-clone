# TeddyPups project walkthrough script

**Format:** spoken project presentation with screen-share cues  
**Estimated length:** 6–8 minutes

> **Accuracy note:** This script is grounded in the current repository. The repository
> does not contain a development diary, AI conversation history, test report, or
> deployment record. The development sequence below is therefore a walkthrough of
> the implementation, not a claim about the exact historical order. The prompts in
> the AI section are complete example prompts, not recovered verbatim prompts from
> the original development process. Replace them with the original prompts if those
> are available.

## Opening

**[Show the home page.]**

“Hi, I’m going to walk through TeddyPups U.A.E., a puppy discovery and enquiry
website for families in Dubai. The goal is to make it easy to browse available
puppies, understand the adoption journey, see stories from other families, and
contact the team.

The experience is designed to feel warm and personal rather than like a generic
product catalogue. The visual language uses a storybook style, playful illustrations,
family photography, and clear next steps.”

## What the site does

**[Scroll through the home page, then open the puppies and puppy-profile pages.]**

“The home page brings together the main visitor journey: an introduction, puppy
listings, information about the ways to meet or enquire, adoption-journey steps,
trust information, family stories, FAQs, and a final contact prompt.

The puppies page supports filtering by origin and breed. Each puppy can also have
its own profile page, with its own title and social-sharing metadata. Other routes
cover how the process works, frequently asked questions, happy families, and
contact. The family gallery includes an interactive photo viewer.”

**[Open the contact page.]**

“The contact form collects a name and phone number, with optional email, area,
puppy of interest, and message. The server validates and limits the submitted
values, saves the enquiry in Supabase, and sends an email notification through
Resend. After a successful response, the site opens WhatsApp as a convenient
follow-up. If the email service is unavailable, the interface can show an error
instead of reporting a false success.”

## Technologies and project structure

**[Show the repository tree.]**

“The application is built with Next.js 16 and React 19, using TypeScript. It uses
the Next.js App Router for pages and route handlers, and Tailwind CSS 4 alongside
custom CSS for the visual system. Lucide React supplies interface icons.

The project is organized around a few clear areas:

- `app/` contains route pages, the shared layout, global styles, and API handlers.
- `src/components/` contains reusable page sections and interactions, including
  the navigation, puppy cards, storybook profile, contact form, and photo lightbox.
- `src/lib/content.ts` is the shared server-side content access layer.
- `src/lib/supabase/` and `src/utils/supabase/` contain Supabase client helpers.
- `src/data/` contains the content used to generate the database seed.
- `supabase/migrations/` contains the database schema changes.
- `scripts/generate-supabase-seed.mjs` converts the local TypeScript content into
  SQL upserts for Supabase.
- `public/` contains the brand assets, icons, and image media.”

## Development approach and implementation decisions

**[Show `src/lib/content.ts`, followed by the Supabase migrations.]**

“The implementation separates presentation from content access. Page components
receive typed data, while shared functions in the content layer query Supabase for
puppies, FAQs, journey steps, gallery images, and testimonials. The same functions
are reused by server-rendered pages and the content API route.

Content is also represented in local TypeScript data files. Rather than manually
copying every record into the database, the seed-generation script turns that
content into repeatable SQL upserts. That makes it easier to initialize or update
the content tables consistently.

The database schema stores public catalogue and marketing content separately from
private enquiries. Row-level security is enabled, with public read policies for
the content visitors need. Enquiries are written by the server using a
server-only Supabase credential. That boundary keeps the write credential out of
the browser.

For the interface, the design uses reusable sections but keeps page-specific
content and interactions close to their route. Server components load the
initial page data, while client components handle interactions such as filters,
form state, and the photo lightbox. Puppy profile pages also generate
puppy-specific metadata and show a not-found page for an unknown profile.”

## AI tools and exact prompt examples

“The source repository does not record which AI tools or prompts were used during
development. For transparency, I’m not presenting the examples here as historical
transcripts. They are exact, reusable prompts that describe the kind of bounded
assistance that fits this codebase. The AI tool should be named according to the
tool actually used; for example, if applicable, GitHub Copilot in VS Code.”

**[Show this section on screen or read a selection.]**

> **Prompt example 1 — repository orientation**
>
> “Inspect this Next.js App Router project without changing files. Summarize the
> route structure, reusable UI components, data sources, API routes, database
> migrations, environment variables by name only, and available lint/build/test
> commands. Do not read or print `.env.local` or any secrets. Distinguish facts
> visible in the repository from assumptions.”

> **Prompt example 2 — feature implementation**
>
> “Implement the requested puppy enquiry flow using the existing Next.js,
> TypeScript, React, and Supabase patterns in this repository. Keep Supabase
> write credentials server-only. Validate and bound request fields, return
> explicit errors for invalid input and service failures, and preserve the
> existing WhatsApp follow-up. First inspect the related form, route, and schema;
> then make the smallest complete change and report the files changed and checks
> run.”

> **Prompt example 3 — design consistency**
>
> “Review the puppy listing and puppy profile experience against the existing
> TeddyPups storybook visual style. Reuse the current components, design tokens,
> typography, and responsive patterns. Preserve accessible labels and keyboard
> interaction. Do not introduce a new dependency or change unrelated pages.”

> **Prompt example 4 — verification**
>
> “Review the changes for functional regressions. Check the contact form success
> and error states, server-side validation, Supabase persistence, email failure
> handling, and responsive layout. Run the repository’s existing lint and
> production-build commands. Do not claim tests passed unless you ran them; report
> missing test coverage separately.”

“The important practice is to use AI as a coding assistant, not as a substitute
for checking the code. I’d ask it to inspect existing conventions first, keep
changes scoped, protect credentials, and report exactly what it verified.”

## Challenges and trade-offs

“A few engineering challenges are visible in the implementation.

First, content needs to remain consistent across the home page, catalogue,
individual profiles, and API responses. A shared content layer and typed
interfaces help avoid page-specific data transformations becoming inconsistent.

Second, the site combines public content with private contact information.
Separating public reads from server-side enquiry writes, enabling row-level
security, and keeping service credentials server-only helps maintain that
boundary.

Third, submitting an enquiry involves two external systems: the database and the
email provider. The order matters. The enquiry is saved before the email is sent,
so a notification failure is reported as a notification failure—not as though
the visitor’s enquiry never reached the database.

Finally, the visual design relies on rich photography and custom motion, but
still needs to work across screen sizes and support meaningful labels and
controls. The project uses Next Image and component-level interaction state to
address those needs.”

## Testing and verification

**[Show `package.json` and the relevant terminal commands.]**

“The package scripts currently provide `npm run lint` and `npm run build`.
There is no dedicated unit-test or end-to-end-test command declared in
`package.json`, so I would not describe an automated test suite as present
without adding one.

For a release check, I would run:

```bash
npm run lint
npm run build
```

I would also manually check the key journeys: navigation across every route,
breed and origin filtering, an existing and unknown puppy profile, photo
lightbox controls, valid and invalid contact submissions, database persistence,
and the success and failure paths for email delivery. Those manual checks need
to be performed against a configured Supabase and Resend environment; this
script does not claim they have already been run.”

## Deployment

**[Show the README deployment notes and the `.env.example` variable names—never
show `.env.local` or credential values.]**

“The README identifies Vercel as the intended deployment platform. A
production deployment needs the Supabase schema migrations applied and the
project’s content seeded. The seed generator emits SQL that can be applied to
the database.

The deployment environment then needs the public Supabase URL and publishable
key, plus server-only Supabase credentials for private writes. To enable
contact notifications, it also needs a Resend API key and a verified sender
address; the recipient address can be configured separately. These values
belong in the hosting provider’s encrypted environment-variable settings, not
in source control or client-side variables.

The final release process is to deploy the application, confirm the production
build and route responses, submit a controlled enquiry, verify it appears in
Supabase and that the notification arrives, then check the public pages on
desktop and mobile. The repository documents the intended Vercel path, but
does not by itself prove that a live deployment has been completed.”

## Closing

**[Return to the home page.]**

“To summarize, TeddyPups combines a story-driven responsive website with a
Supabase-backed content and enquiry flow. Next.js and React provide the
application structure, TypeScript keeps the data contracts explicit, and the
separate server-side integrations handle private writes and email notifications.

The next steps for a production handoff are to confirm the real prompt history
if it needs to be quoted, run lint and a production build, complete the
configured end-to-end checks, and verify the deployment and third-party
integrations in the target environment. Thanks for watching.”
