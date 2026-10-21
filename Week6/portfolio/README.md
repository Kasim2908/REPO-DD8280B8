# Mohammad Kasim — DevOps Portfolio

A responsive React + TypeScript portfolio for Mohammad Kasim, focused on hands-on DevOps learning, cloud automation and honest project evidence.

## Stack

- React 19 + TypeScript
- Vite
- Tailwind CSS v4
- Framer Motion
- Lucide React
- CSS-first responsive layout with an optional light theme

## Run locally

From this directory:

```bash
npm install
npm run dev
```

Vite will print the local development URL. The site is a single-page application, so all navigation uses accessible anchor links and does not require a router.

## Production build

```bash
npm run build
npm run preview
```

The build output is written to `dist/`.

## Contact form setup

The form is intentionally validation-only by default. It does **not** pretend to send email. To connect a backend or form service:

1. Copy `.env.example` to `.env.local`.
2. Set `VITE_CONTACT_FORM_ENDPOINT` to the endpoint you control.
3. Make sure the endpoint accepts a JSON `POST` body with `name`, `email`, `subject`, and `message`.
4. Run the build again before deploying.

Only the public endpoint URL belongs in a Vite `VITE_*` variable. Never put a private API key in frontend code or a committed `.env` file.

## Resume setup

No resume file was supplied with the repository, so the Download Resume controls show a clear placeholder notice instead of linking to a broken PDF. When a real resume is ready:

1. Add it as `public/resume.pdf`.
2. Replace `showResumeNotice` in `src/App.tsx` with a link or handler for `./resume.pdf`.
3. Re-run `npm run build` and verify the download from the deployed site.

## GitHub Pages deployment

The Vite configuration uses `base: "./"`, which keeps relative asset paths portable for a project repository such as `Kasim-explore`.

For a manual deployment:

```bash
npm install
npm run build
# Publish the contents of dist/ to the GitHub Pages branch or static host.
```

For an automated GitHub Pages workflow, add a workflow that installs Node, runs `npm ci` and `npm run build` from `Week6/portfolio`, then publishes `Week6/portfolio/dist`. If the repository is deployed from a different subpath, update the Vite `base` value to match that path and rebuild.

## Evidence links used in the page

- CI/CD source repository: `https://github.com/Kasim2908/REPO-DD8280B8`
- Week 2 documentation: `Week2/week2-documentation.md`
- Week 2 runbook: `Week2/RUNBOOK.md`
- Week 4 Kubernetes manifests: `Week4/kubernetes-project/`
- Week 4 documentation: `Week4/Readme.md`

The portfolio deliberately avoids unsupported claims. The Week 3 security investigation is labelled ongoing, Week 5 is described as documented Helm practice because the referenced chart is not present in this repository, and no awards or certifications are listed without source links.

## Information still needed

- [ ] Supply the preferred public email address.
- [ ] Supply a phone number only if it should be public.
- [ ] Add `public/resume.pdf` and connect the Resume buttons.
- [ ] Add source links for any verified awards or certifications before listing them.
- [ ] Decide whether to configure a contact form endpoint through `VITE_CONTACT_FORM_ENDPOINT`.
- [ ] Confirm the final GitHub Pages URL if it differs from the existing portfolio link.

## Folder location

This app lives at `Week6/portfolio` inside the internship repository.
