# Progress

## Current state

- The repository contains the AI Engineering monorepo structure and its folder-level guidance.
- The company context has been customized to Nexova Solutions, and `company-choice.md` records the chosen company and initial CV Screening Agent idea.
- The current recruiting flow is consultant-led, from client briefing through manual CV screening, interviews, and placement; the company uses a legacy ATS alongside disconnected HubSpot, Zendesk, Google Workspace, and spreadsheets.
- The repository is currently a documentation and structure skeleton; no runnable application, backend service, data pipeline, or agent implementation is present yet.
- A discoverable CV screening shortlist skill is documented at `.agents/skills/cv-screening-shortlist/SKILL.md`; it provides decision support and is not a runnable screening system.
- `packages/shared/` contains metadata for the `@repo/shared-types` TypeScript package, but there is no root workspace runner configured.
- This memory bank now captures the business brief, technical context, and next steps.

## Planned next steps

1. Define the CV screening workflow's inputs, outputs, user review points, and success measures with Talent Selection Operations, matching the existing briefing-to-screening-to-interview process.
2. Specify how vacancy briefings and CVs are safely provided from the legacy ATS context without assuming a live integration; begin with synthetic or appropriately de-identified data and establish access and retention rules before real records are used.
3. Design an explainable scoring approach and create a small evaluation set to test ranking relevance, evidence support, and consistency.
4. Implement the smallest documented end-to-end slice in the appropriate `agents/`, `data/`, and `services/` locations, preserving consultant approval for decisions and candidate communications.
5. Add focused tests, usage documentation, and operational monitoring before expanding to additional workflows.
