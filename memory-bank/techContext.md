# Technical Context

## Repository and architecture

This is a monorepo starter for cross-functional AI Engineering projects. Its documented boundaries are:

- `uis/` for user-facing applications.
- `services/` for backend APIs and workers; the repository recommends starting with one centralized FastAPI application and extracting workers only when needed.
- `data/` for raw inputs, pipelines, processed data, and evaluation datasets.
- `agents/`, `skills/`, and `mcps/` for AI agents, reusable capabilities, and tool integrations.
- `workflows/` for orchestration and automation.
- `packages/` and `shared/` for reusable code, types, schemas, and assets.
- `infra/`, `scripts/`, and `internal/` for deployment, helper scripts, and developer tools.

These are repository conventions and recommendations, not evidence that corresponding applications or services have already been implemented.

### Application placement

- Put the public-facing website in `uis/website/`.
- Put the internal admin/backoffice UI in `uis/backoffice/`.
- Put backend APIs and workers under `services/`; the root project guide recommends one centralized FastAPI company API rather than early microservice decomposition.
- Do not invent a parallel top-level `apps/` folder or place these applications outside the designated monorepo areas. Follow the relevant folder README before adding a project.

## Concrete technology in the repository

- TypeScript is represented by the private `@repo/shared-types` package at `packages/shared/`, currently at version `0.0.1` with `index.ts` as its entry point.
- The service-folder guidance recommends FastAPI for the centralized company backend.
- No root package manager/workspace runner, application dependencies, runnable app, or local orchestration configuration is currently present.

## Nexova's current technology estate

`CONTEXT.md` identifies HubSpot, legacy Zendesk, Google Workspace, a home-built applicant tracking system from the early 2010s, and spreadsheets. These systems are described as disconnected; the company has no centralized telemetry or logging, and deployments are manual. They are existing company tools, not dependencies, configured integrations, or services implemented in this repository. For CV screening, the company process uses client vacancy briefings and consultant review of CVs in a recruitment flow that continues through interviews and final placement. Do not assume direct ATS access or modify live candidate records.

The UI framework, database, LLM/provider, vector store, deployment platform, and specific data integrations have not yet been selected in the repository. Select these when the first implementation's requirements are defined, and record consequential decisions here.

## Technical constraints and principles

- Keep components in their designated top-level folders and give each new app, service, agent, or pipeline its own documentation.
- Prefer a centralized API over premature microservice decomposition.
- Treat candidate CVs and placement history as potentially sensitive personal data: define access, retention, and evaluation practices before using real records.
- Make candidate ranking explainable and keep a human consultant responsible for the final decision.
- Evaluate AI outputs against documented examples and metrics rather than treating generated scores as ground truth.
- Keep company workflows and current-state facts consistent with `CONTEXT.md`; do not present described legacy tools or requested capabilities as implemented repository features.
