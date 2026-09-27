# PullUp Tasks

**Version:** 1.0  
**Status:** Execution backlog  
**Date:** August 24, 2026  
**Rule:** Every implementation task references a requirement or roadmap gate.

**Check-in note (September 26, 2026):** checked engineering items are complete for the repository's synthetic pre-T0 proof only. They do not satisfy pilot acceptance, accountable-owner review, or any partner-dependent launch gate. Unchecked work remains authoritative.

## 1. Priority

- **P0:** blocks the pilot or protects rights, safety, privacy, money, or access;
- **P1:** required for the complete pilot experience;
- **P2:** useful after the core works;
- **Parked:** explicitly not part of the pilot.

## 2. Definition of done

A task is done only when:

- acceptance criteria pass;
- accessibility is tested;
- authorization and privacy are reviewed;
- loading, empty, error, and success states exist;
- analytics use an approved event;
- documentation and contracts are updated;
- automated tests cover material rules;
- an accountable human accepts the result.

## 3. Foundation and partnership

- [ ] **GOV-001 P0:** Sign pilot memorandum with one London housing partner.  
  Owner: Partnerships  
  Exit: participating homes, staff, obligations, data access, funding, and stop rights are named.

- [ ] **GOV-002 P0:** Recruit and pay a representative resident advisory group.  
  Owner: Resident partnership  
  Exit: charter, compensation, access needs, confidentiality, and decision scope are agreed.

- [ ] **GOV-003 P0:** Map resident and provider decision rights.  
  Owner: Governance  
  Exit: decisions are marked resident, provider, shared, legally constrained, or mission-locked.

- [ ] **GOV-004 P0:** Create legal and policy register.  
  Owner: Legal  
  References: BR-01, BR-05, FR-APP-09

- [ ] **GOV-005 P0:** Inventory existing partner data, forms, vendors, and retention.  
  Owner: Data governance  
  References: NFR-PRIV-01, NFR-PRIV-05

- [ ] **GOV-006 P0:** Map current application, repair, payment, notice, transfer, and access workflows.  
  Owner: Product operations

- [ ] **GOV-007 P0:** Calculate Total Damage for five sample Places.  
  Owner: Housing finance  
  References: BR-02, FR-RUN-02, FR-RUN-03

- [ ] **GOV-008 P0:** Approve pilot measurement and baseline plan.  
  Owner: Evaluation  
  References: roadmap Phase 8

- [ ] **GOV-009 P0:** Create initial risk register and stop conditions.  
  Owner: Product and risk

- [ ] **GOV-010 P0:** Name owners for non-app routes and emergencies.  
  Owner: Partner operations  
  References: BR-07, NFR-REL-02

## 4. Repository and delivery

- [x] **PLAT-001 P0:** Create PullUp repository with agreed structure.  
  Owner: Engineering

- [x] **PLAT-002 P0:** Configure npm workspaces and uv Python environment.  
  Owner: Platform

- [ ] **PLAT-003 P0:** Add local PostgreSQL, PostGIS, Redis, object-storage emulator, MQTT, email capture, and service containers.  
  Owner: Platform

- [x] **PLAT-004 P0:** Create Next.js 16 web application using the latest security-patched Active LTS release.  
  Owner: Frontend

- [x] **PLAT-005 P0:** Create FastAPI modular monolith and health endpoints.  
  Owner: Backend

- [ ] **PLAT-006 P0:** Create worker process and transactional outbox skeleton.  
  Owner: Backend  
  References: NFR-REL-03, NFR-REL-04

- [x] **PLAT-007 P0:** Create PostgreSQL migration workflow and checks.  
  Owner: Data
  Proof exit: Alembic upgrade, downgrade, and model-parity checks pass; a fresh native PostgreSQL rehearsal is still required before pilot use.

- [ ] **PLAT-008 P0:** Generate TypeScript API client from OpenAPI.  
  Owner: Full stack  
  References: NFR-INT-01

- [ ] **PLAT-009 P0:** Configure Canadian-region development, staging, and production plans.  
  Owner: Platform  
  References: NFR-PRIV-05

- [ ] **PLAT-010 P0:** Add OpenTelemetry with privacy allowlists.  
  Owner: Platform  
  References: NFR-OBS-01, NFR-OBS-02

- [ ] **PLAT-011 P0:** Add lint, type, unit, accessibility, contract, migration, dependency, secret, and container checks.  
  Owner: Engineering

- [ ] **PLAT-012 P0:** Document rollback, backup, and point-in-time recovery.  
  Owner: Platform  
  References: NFR-REL-05

## 5. Identity, tenancy, consent, and audit

- [ ] **IAM-001 P0:** Integrate Supabase Auth in Canada Central for pilot development.  
  Owner: Identity  
  References: FR-ID-02

- [ ] **IAM-002 P0:** Implement email sign-in and safe recovery.  
  Owner: Identity  
  References: FR-ID-02, FR-ID-05

- [ ] **IAM-003 P0:** Implement staff multi-factor authentication.  
  Owner: Identity  
  References: FR-ID-03

- [ ] **IAM-004 P0:** Create network, provider, building, Place, household, and relationship scopes.  
  Owner: Backend

- [ ] **IAM-005 P0:** Implement resident, Twin, staff, contractor, support, auditor, and platform roles.  
  Owner: Backend  
  References: FR-ID-04

- [ ] **IAM-006 P0:** Implement row-level security for every exposed table.  
  Owner: Data security  
  References: NFR-SEC-03, NFR-SEC-04

- [ ] **IAM-007 P0:** Build policy-test harness with cross-provider denial cases.  
  Owner: Security

- [ ] **IAM-008 P0:** Implement consent ledger.  
  Owner: Privacy  
  References: FR-INT-04, NFR-PRIV-02

- [ ] **IAM-009 P0:** Implement append-only audit events and resident-facing receipts.  
  Owner: Backend

- [ ] **IAM-010 P0:** Implement scoped product subject mapping.  
  Owner: Architecture  
  References: FR-INT-03

- [ ] **IAM-011 P0:** Implement break-glass access with reason, expiry, review, and alert.  
  Owner: Security

- [ ] **IAM-012 P1:** Build active-session view and revocation.  
  Owner: Frontend  
  References: FR-ID-06

## 6. Design system and prototype

- [x] **DS-001 P0:** Encode colour, type, spacing, radius, elevation, and motion tokens.  
  Owner: Design

- [ ] **DS-002 P0:** Build accessible button, link, input, select, dialog, sheet, tabs, status, notice, and card primitives.  
  Owner: Frontend

- [x] **DS-003 P0:** Build Total Damage, Where It Goes, Heads Up, status, source, and accessibility patterns.  
  Owner: Design and frontend

- [x] **DS-004 P0:** Build gesture-equivalent Place card controls.  
  Owner: Frontend  
  References: FR-FLOW-03, FR-FLOW-04, NFR-ACC-03

- [x] **DS-005 P0:** Build screen-reader live-region and undo pattern.  
  Owner: Accessibility

- [ ] **DS-006 P0:** Add reduced-motion, high-contrast, print, and 200 percent zoom support.  
  Owner: Frontend  
  References: NFR-ACC-05

- [ ] **DS-007 P1:** Create resident navigation and operator navigation.  
  Owner: Design

- [ ] **DS-008 P1:** Create empty, loading, error, offline, pending, and success patterns.  
  Owner: Design

- [ ] **DS-009 P1:** Run paid accessibility review of the prototype.  
  Owner: Accessibility

- [ ] **DS-010 P1:** Record prototype decisions and rejected patterns.  
  Owner: Product

## 7. Places, costs, and Flow

- [x] **PLACE-001 P0:** Model provider, building, Place, availability, tenure, and source freshness.  
  Owner: Backend

- [x] **PLACE-002 P0:** Model detailed accessibility facts.  
  Owner: Backend and accessibility  
  References: FR-RUN-04

- [ ] **PLACE-003 P0:** Build provider Place editor with required-field checks.  
  Owner: Full stack

- [x] **PLACE-004 P0:** Model versioned Total Damage.  
  Owner: Backend  
  References: FR-RUN-02

- [x] **PLACE-005 P0:** Build Where It Goes breakdown and change rules.  
  Owner: Full stack  
  References: FR-RUN-03

- [x] **PLACE-006 P0:** Build public Place API and server-rendered Place page.  
  Owner: Full stack

- [ ] **FLOW-001 P0:** Build Flow list view.  
  Owner: Frontend  
  References: FR-FLOW-01

- [x] **FLOW-002 P0:** Build Flow card view with Keep, Not It, Pull Up, and undo.  
  Owner: Frontend  
  References: FR-FLOW-03, FR-FLOW-07

- [x] **FLOW-003 P1:** Add optional pointer gestures with equivalent controls.  
  Owner: Frontend  
  References: FR-FLOW-04

- [ ] **FLOW-004 P1:** Add MapLibre view and accessible result list.  
  Owner: Frontend  
  References: NFR-ACC-06

- [ ] **FLOW-005 P0:** Implement filters and URL state.  
  Owner: Full stack  
  References: FR-FLOW-08

- [x] **FLOW-006 P0:** Enforce private Not It and no provider analytics.  
  Owner: Privacy  
  References: FR-FLOW-05

- [ ] **FLOW-007 P1:** Build Keepers and Side by Side.  
  Owner: Full stack  
  References: FR-RUN-07

- [x] **RUN-001 P1:** Build The Vibe, Heads Up, Backstory, Around Here, and source-date sections.  
  Owner: Full stack

- [ ] **RUN-002 P1:** Design Word on the Block verification and moderation policy before implementation.  
  Owner: Trust and safety  
  References: FR-RUN-05

- [ ] **TOUR-001 P1:** Build tour request modes, accommodations, host information, and reporting.  
  Owner: Full stack  
  References: FR-TOUR-01, FR-TOUR-02

## 8. Home Passport, applications, and moving

- [ ] **APP-001 P0:** Define minimal Home Passport schema with field purposes.  
  Owner: Product, legal, and privacy

- [ ] **APP-002 P0:** Build resumable Home Passport editor.  
  Owner: Full stack

- [ ] **APP-003 P0:** Build selective packet sharing and expiry.  
  Owner: Backend  
  References: FR-APP-02, FR-APP-05

- [ ] **APP-004 P0:** Build private document quarantine and scanning.  
  Owner: Security  
  References: NFR-SEC-05

- [ ] **APP-005 P0:** Build application submission with rule-version snapshot.  
  Owner: Backend

- [ ] **APP-006 P0:** Build Where We At? timeline and next action.  
  Owner: Full stack  
  References: FR-APP-06

- [ ] **APP-007 P0:** Build material decision reason, review, and appeal pattern.  
  Owner: Legal and product  
  References: FR-APP-11

- [ ] **APP-008 P0:** Create executable allocation-firewall tests.  
  Owner: Security and data  
  References: BR-03, FR-APP-10

- [ ] **APP-009 P0:** Build assisted application workflow with equal queue treatment.  
  Owner: Operations  
  References: FR-APP-08

- [ ] **LEX-001 P1:** Connect original Fine Print documents and source-backed explanations.  
  Owner: Lexi integration

- [ ] **MOVE-001 P1:** Build Move Plan with private tasks and milestones.  
  Owner: Full stack

- [ ] **MOVE-002 P1:** Add selected tasks to Day One Our Move.  
  Owner: Day One integration  
  References: FR-MOVE-03

## 9. Resident operations

- [ ] **HOME-001 P0:** Build My Place dashboard.  
  Owner: Frontend

- [ ] **HOME-002 P0:** Build Home Crew roles and permissions.  
  Owner: Backend  
  References: FR-HOME-04

- [ ] **HOME-003 P1:** Build Ground Rules with legal boundary text.  
  Owner: Full stack

- [ ] **ASSET-001 P0:** Model The Setup asset hierarchy and manuals.  
  Owner: Facilities and backend

- [ ] **FIX-001 P0:** Build resident Fix report with text, photo, voice, phone, and assisted routes.  
  Owner: Full stack  
  References: FR-FIX-01

- [ ] **FIX-002 P0:** Build urgency, safety, accommodation, and emergency routing.  
  Owner: Operations  
  References: FR-FIX-02

- [ ] **FIX-003 P0:** Build provider triage, assignment, appointment, access window, and updates.  
  Owner: Full stack

- [ ] **FIX-004 P0:** Build completion, confirmation, reopen, and escalation.  
  Owner: Full stack  
  References: FR-FIX-05

- [ ] **FIX-005 P0:** Add recurring-issue and service-level reporting without resident scoring.  
  Owner: Data

- [ ] **COMMON-001 P1:** Model Commons resources, state, care, accessibility, and booking policy.  
  Owner: Backend

- [ ] **COMMON-002 P1:** Build Commons catalogue and safe availability.  
  Owner: Full stack

- [ ] **BOARD-001 P0:** Build The Board notices with urgency and audience.  
  Owner: Full stack

- [ ] **BOARD-002 P0:** Add redundant delivery for critical notices.  
  Owner: Operations

- [ ] **STAY-001 P1:** Build voluntary Damage Control and Stay Put referral entry.  
  Owner: Housing stability

- [ ] **SWITCH-001 P1:** Build Switch Up request and status.  
  Owner: Housing operations

## 10. Day One

- [ ] **TMX-001 P0:** Model one active Twin relationship and mutual acceptance.  
  Owner: Backend  
  References: FR-TMX-01

- [ ] **TMX-002 P0:** Model Max Pass product, resource, action, purpose, start, expiry, and revocation.  
  Owner: Security  
  References: FR-TMX-02

- [ ] **TMX-003 P0:** Build Twin Up invitation, acceptance, decline, and removal.  
  Owner: Full stack

- [ ] **TMX-004 P0:** Build Twin Mode shared workspace with permission-filtered records.  
  Owner: Full stack

- [ ] **TMX-005 P1:** Build Tag Team assignments.  
  Owner: Full stack

- [ ] **TMX-006 P1:** Build Run It By Me review requests.  
  Owner: Full stack

- [ ] **TMX-007 P1:** Build Put Me On scoped shares.  
  Owner: Full stack

- [ ] **TMX-008 P0:** Build Hold It Down with prohibited-action list and expiry.  
  Owner: Security and product

- [ ] **TMX-009 P0:** Build Double Tap confirmation state machine.  
  Owner: Backend  
  References: FR-TMX-08

- [ ] **TMX-010 P1:** Build Split It adapter to TapIn.  
  Owner: TapIn integration

- [ ] **TMX-011 P1:** Build Pull Through request with non-emergency boundary.  
  Owner: Full stack

- [ ] **TMX-012 P1:** Build privacy-preserving Check In.  
  Owner: Privacy and product

- [ ] **TMX-013 P1:** Build Our Move across selected product references.  
  Owner: Full stack

- [ ] **TMX-014 P0:** Build Receipts and resident-readable access history.  
  Owner: Full stack

- [ ] **TMX-015 P0:** Test immediate revocation across PullUp, TapIn, Lexi, Makana, and fLOKr adapters.  
  Owner: Security

- [ ] **TMX-016 P0:** Test that not using Day One changes no housing outcome.  
  Owner: Fairness  
  References: FR-TMX-15

## 11. TapIn and Sakia integrations

- [ ] **TAP-001 P0:** Define signed action-intent and receipt contracts.  
  Owner: Architecture  
  References: FR-TAP-01

- [ ] **TAP-002 P0:** Implement idempotent payment adapter without stored balances.  
  Owner: Payments  
  References: FR-TAP-02, FR-TAP-05

- [ ] **TAP-003 P1:** Implement booking and reservation adapter.  
  Owner: TapIn

- [ ] **TAP-004 P0:** Implement temporary access scope, expiry, revocation, and fallback.  
  Owner: Access safety

- [ ] **TAP-005 P0:** Test that failed payment cannot revoke housing access.  
  Owner: Security  
  References: FR-TAP-06

- [ ] **INT-001 P0:** Publish product ownership and data-boundary contracts.  
  Owner: Architecture

- [ ] **INT-002 P0:** Implement scoped subject broker.  
  Owner: Identity

- [ ] **INT-003 P1:** Connect selected fLOKr Signals, Circles, Leads, Shifts, and Moves.  
  Owner: fLOKr

- [ ] **INT-004 P1:** Connect selected Lexi documents and deadlines.  
  Owner: Lexi

- [ ] **INT-005 P1:** Connect approved Makana milestones without reflection data.  
  Owner: Makana

- [ ] **INT-006 P0:** Test optional-product failure isolation.  
  Owner: Reliability  
  References: FR-INT-05

## 12. IoT trial

- [ ] **IOT-001 P0:** Select one building use case with residents and facilities staff.  
  Owner: Building systems

- [ ] **IOT-002 P0:** Complete device data-flow and privacy assessment.  
  Owner: Privacy

- [ ] **IOT-003 P0:** Procure locally controllable equipment and document vendor data paths.  
  Owner: Facilities

- [ ] **IOT-004 P0:** Build gateway image, enrollment, certificates, and signed updates.  
  Owner: IoT engineering

- [ ] **IOT-005 P0:** Build normalized event and Fix integration.  
  Owner: Backend

- [ ] **IOT-006 P0:** Build The Setup device explanation.  
  Owner: Frontend

- [ ] **IOT-007 P0:** Test local alarm and manual fallback during internet loss.  
  Owner: Facilities  
  References: FR-IOT-03

- [ ] **IOT-008 P0:** Test prohibited data never reaches cloud or analytics.  
  Owner: Privacy and security

- [ ] **IOT-009 P1:** Measure false positives, maintenance cost, and resident benefit.  
  Owner: Evaluation

## 13. Pilot readiness

- [ ] **READY-001 P0:** Run WCAG 2.2 AA audit and disabled-user testing.
- [ ] **READY-002 P0:** Complete privacy impact assessment.
- [ ] **READY-003 P0:** Complete human-rights and fairness assessment.
- [ ] **READY-004 P0:** Complete threat model.
- [ ] **READY-005 P0:** Verify OWASP ASVS 5.0 controls.
- [ ] **READY-006 P0:** Complete independent penetration test.
- [ ] **READY-007 P0:** Test backup, restore, outage, and rollback.
- [ ] **READY-008 P0:** Rehearse data migration.
- [ ] **READY-009 P0:** Train provider workers and support partners.
- [ ] **READY-010 P0:** Orient pilot residents and Twins.
- [ ] **READY-011 P0:** Staff help, complaint, escalation, and safeguarding routes.
- [ ] **READY-012 P0:** Verify every Place has approved Total Damage.
- [ ] **READY-013 P0:** Close all critical defects.
- [ ] **READY-014 P0:** Collect accountable launch-gate signatures.

## 14. Parked

- [ ] **PARK-001:** Native mobile application.
- [ ] **PARK-002:** Universal roommate matching.
- [ ] **PARK-003:** Automated allocation.
- [ ] **PARK-004:** Stored-value wallet.
- [ ] **PARK-005:** Advanced energy trading.
- [ ] **PARK-006:** Public reputation.
- [ ] **PARK-007:** Broad sensor rollout.
- [ ] **PARK-008:** Microservices and Kubernetes.
- [ ] **PARK-009:** Blockchain or housing token.
- [ ] **PARK-010:** AI agent with housing authority.

## 15. Recommended first sprint

The first two-week sprint after T0 should contain:

1. GOV-002 resident advisory group;
2. GOV-003 decision-rights map;
3. GOV-005 data inventory;
4. GOV-006 workflow map;
5. GOV-007 sample Total Damage;
6. PLAT-001 repository;
7. PLAT-004 web shell;
8. PLAT-005 API shell;
9. IAM-004 scope model;
10. DS-001 tokens;
11. PLACE-001 Place model;
12. one end-to-end synthetic Place displayed in Flow.

The sprint demo should show one honest Place with Total Damage and prove that one resident, one Twin, and one worker receive different authorized views.

---

Built with 💖 for turning a large vision into work humans can actually finish.
