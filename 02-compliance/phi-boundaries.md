# PHI Boundaries

**What this is:** The list of pages and forms that touch protected health information (PHI) or other health data. **No tracking pixels, analytics, session recording or marketing tags may load on any page listed here** (CLAUDE.md rule 3), even when a visitor has consented.
**Owner:** Legal/Compliance (TBD, OQ-02). Only compliance may add or remove entries.

## Current status

Per intake (2026-11-07, Andy Milligan): **this project does not touch PHI.**
This is still being verified: the field lists of the three Go High Level forms are not yet confirmed (OQ-03).

## Pages / forms inside the PHI boundary

| URL or form | What health data | Tags allowed | Added by | Date |
|---|---|---|---|---|
| *(none)* | | | | |

## What puts a page on this list

A page or form goes here, and loses all non-necessary tags, if it collects or reveals any of:
- Health conditions, symptoms, medications, diagnoses or treatment
- Medicare Beneficiary Identifier (MBI), insurance member IDs, current plan details tied to a person
- Date of birth **combined** with health or plan information
- Appointment or enrollment requests for a specific person's health coverage
- Patient or member portal logins

## Watch items (not PHI, but sensitive)

- The Medicare guides (Part A/B, Part D, L564, Social Security account) are educational. They're **not** PHI, but session recording (Clarity) on them should mask all form inputs.
- GHL forms are cross-origin iframes. Tracking scripts on the parent page can't read inside them, but GHL's own tracking inside the iframe needs GHL-side review.
- If a GHL form ever adds a health question, update this file **before** the form goes live.
