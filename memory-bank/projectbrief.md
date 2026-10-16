# Project Brief

## Business description

Nexova Solutions is a human resources consulting and talent acquisition firm founded in 2011, headquartered in Valencia, Spain, with an expansion office in Miami, Florida. It has 120 employees and serves mid-sized companies in technology, retail, and financial services through executive and mid-management recruitment, outsourced customer support, and corporate training.

This repository is the AI Engineering project workspace for designing and building systems that help Nexova scale its services and reduce manual operational work.

## Problem to solve

Nexova's teams rely on disconnected legacy tools, spreadsheets, email, and manual processes. Recruiters read 30 to 80 CVs per search and match candidates to roles largely by intuition. Candidate status is not visible in real time, and client support resolution averages 48 hours against a 24-hour SLA. Sales follow-up is inconsistent, while department leaders spend 4 to 8 hours each week preparing reports from stale data. These workflows limit service quality, visibility, and the company's ability to scale.

## Current operating context

Talent Selection Operations has 40 consultants and runs recruitment from the client briefing through CV screening, interviews, and final placement. Screening is manual, candidate communication is by individual email, and there is no real-time candidate status visibility. Nexova's current estate includes HubSpot, a legacy Zendesk helpdesk, a home-built applicant tracking system from the early 2010s, Google Workspace, and spreadsheets; these tools are disconnected. The company briefing also reports no centralized telemetry or logging and manual deployments. These are current-state facts, not integrations or capabilities already implemented in this repository.

## Project objectives

- Apply AI and automation to high-impact company workflows while keeping people responsible for consequential decisions.
- Build systems that improve operational speed, service quality, visibility, and consistency.
- Organize the work as a monorepo with clear boundaries for user interfaces, APIs, data, agents, workflows, shared code, and infrastructure.
- Measure data and AI quality with documented evaluation sets and metrics as implementations are added.

## Initial focus

The selected first use case is an AI-assisted CV screening pipeline for Talent Selection Operations. It should compare candidate CVs with a client vacancy briefing, score and rank candidates, and provide concise, evidence-based explanations. The broader proposed pipeline may prepare a shortlist and draft status communications for human review, but this skill covers shortlist review only and must not change candidate status or contact candidates. Consultants retain final selection and communication decisions.

For the first workflow, the agent's role is limited to evidence-based review support before interviews. It must not make hiring decisions, change candidate records, or communicate with candidates autonomously. Treat CVs and placement data as sensitive; use synthetic or appropriately de-identified data until access, retention, and evaluation rules are established.
