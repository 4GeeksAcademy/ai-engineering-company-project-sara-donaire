---
name: cv-screening-shortlist
description: "Use when asked to compare a batch of candidate CVs against one vacancy and produce an evidence-based, consultant-reviewed shortlist."
user-invocable: true
---

# CV Screening Shortlist

## Objective

Produce a ranked, evidence-based review shortlist for one client search by comparing each supplied CV only with the criteria in the client vacancy briefing. This supports the consultant's manual CV-screening stage before interviews; it is not an automated hiring or rejection decision.

## Inputs

Required:

- **Client vacancy briefing:** role summary and explicit must-have and nice-to-have requirements. If approved criterion weights are supplied, they must be nonnegative numeric values provided for every criterion.
- **Candidate CVs:** one or more readable CVs supplied by the consultant, such as files exported from Nexova's legacy applicant tracking system, preferably with stable candidate IDs. If IDs are absent, assign `Candidate 1`, `Candidate 2`, and so on in input order.

This repository does not establish a live connection to the ATS; do not claim to retrieve CVs or update candidate records. If the vacancy briefing or readable CVs are missing, the brief does not distinguish must-haves from nice-to-haves, or supplied weights are incomplete or invalid, ask for the missing information before ranking. Do not invent requirements or weights. If only some CVs are readable, include every input candidate in the results and mark unreadable CVs as not assessed.

## Procedure

1. Confirm there is one client search and identify its must-have and nice-to-have criteria. Preserve the briefing's wording and any approved weights; do not add criteria.
2. Review each CV independently. For every criterion, record exactly one status: `evidenced`, `not evidenced`, or `unclear`. Treat lack of evidence as lack of evidence, not proof that the candidate lacks the qualification.
3. Support each `evidenced` or `unclear` assessment with a brief CV quotation or a section/page locator. For `not evidenced`, state that no supporting evidence was found in the provided CV. Do not infer qualifications from a candidate's name, photo, age, gender, nationality, disability, or other protected or irrelevant personal characteristics.
4. Rank candidates by the supplied, approved weights when present: sum weights for `evidenced` criteria separately for must-haves and nice-to-haves, then sort by must-have total descending and nice-to-have total descending. Otherwise sort by evidenced must-have count descending, then evidenced nice-to-have count descending. In either case, break remaining ties by original input order. `unclear` and `not evidenced` criteria contribute zero. Put unreadable, not-assessed CVs after assessed candidates. Explain the rule and show the ranking totals in the result.
5. Return a concise summary table with candidate ID, rank, evidenced must-have and nice-to-have counts, weighted totals when weights were supplied, and a short evidence-based rationale. Include a criterion-by-criterion evidence ledger and flag unclear or missing evidence for consultant review.
6. State that the ranking is a review aid within Nexova's consultant-led recruitment process, which proceeds from briefing and CV screening to interviews and final placement. The consultant makes all selection and communication decisions. Do not discard candidates, update the ATS or other candidate records, change statuses, or send individual emails or other messages.

## Acceptance Criteria

The result is acceptable only if all of the following can be checked:

- It covers exactly one client search and contains exactly one result row for every input CV supplied for that search, including unreadable CVs.
- Every vacancy criterion appears in the evidence ledger for every assessed candidate, with exactly one allowed status: `evidenced`, `not evidenced`, or `unclear`.
- Each `evidenced` or `unclear` status has a traceable quote or source locator; each `not evidenced` status explicitly says no evidence was found in the supplied CV.
- If weights were supplied, they are complete and nonnegative, the displayed weighted totals equal the sum for evidenced criteria, and the order follows must-have total then nice-to-have total descending. Otherwise, the order follows evidenced must-have count then nice-to-have count descending. Ties preserve input order, and unreadable CVs follow assessed candidates.
- No criterion, weight, qualification, or personal attribute is fabricated or used outside the vacancy brief.
- The result explicitly leaves interview selection, final placement, candidate status changes, and individual email communication to the human consultant and reports no external action taken.
