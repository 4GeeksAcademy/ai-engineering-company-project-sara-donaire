# Agent Instructions

## Start of Each Session

Before planning or editing, read all of these memory-bank files:

1. `memory-bank/projectbrief.md`
2. `memory-bank/techContext.md`
3. `memory-bank/progress.md`

Then read the `README.md` for each repository area you will work in, along with any more-specific `AGENTS.md` instructions that apply to the target files. Treat the memory bank as project context; verify implementation details against the code and documentation.

For Nexova-specific work, read `CONTEXT.md` and treat it as the source of truth for company facts, current processes, systems, and stated needs. The memory bank may summarize it but must not contradict it. Distinguish the legacy systems and desired capabilities described there from integrations or features actually implemented in this repository.

## Required Workflow Before Every Commit

Complete these steps in order before creating a commit:

1. **Re-read current instructions and context.** Read the applicable instructions and memory-bank files, and confirm the change still matches the requested scope.
2. **Inspect the worktree.** Review `git status` and the diff, including existing user changes. Do not discard or include unrelated changes.
3. **Validate the change.** Run the narrowest relevant tests, checks, or build. If no suitable check exists, inspect the affected files and record that validation was unavailable.
4. **Review the final diff.** Check for accidental edits, generated artifacts, secrets, and changes to protected paths. Stage only the intended files and inspect the staged diff.
5. **Update project tracking.** Update `memory-bank/progress.md` when the current state or planned next steps have changed; do not add speculative status.
6. **Commit only after the checks pass.** If a check cannot be run or fails, resolve it or report the blocker before committing. Do not create a commit unless the user explicitly requests one.

## Protected Paths

Do not create, edit, move, or delete the following without explicit confirmation from the project developer. A task request by itself is not that confirmation; pause and ask the developer before changing one of these paths.

- `.git/`
- `.devcontainer/`
- `infra/`
- Root runtime/orchestration configuration: `docker-compose.yml`, `Dockerfile`, and `.github/workflows/`
- Environment and secret files at any depth: `.env`, `.env.*`, `*.pem`, `*.key`, and files containing credentials or tokens
- Company source-of-truth files: `CONTEXT.md`, `CONTEXT.es.md`, and `company-choice.md`

This restriction applies to indirect changes too, including formatters, generators, dependency tools, and scripts. Do not stage protected-path changes without the developer's explicit confirmation. If a requested task appears to require one, explain the need and wait for confirmation; continue with independent, unprotected work where possible.
