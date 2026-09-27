# PullUp Requirements

**Version:** 1.0  
**Status:** Pilot requirements baseline  
**Date:** August 24, 2026  
**Scope:** One London, Ontario partner serving roughly 50 to 150 existing homes

## 1. Purpose

This document translates the PullUp foundation and product vision into testable requirements.

Requirements use these levels:

- **Must:** required for pilot launch;
- **Should:** required before wider rollout unless evidence changes the decision;
- **Could:** useful after the pilot core works;
- **Will not yet:** intentionally excluded from the first release.

## 2. Pilot outcome

The pilot must prove that PullUp can improve housing clarity, resident service, privacy, accessibility, and democratic operations without increasing extraction or administrative burden.

It is not required to prove a global marketplace, automated allocation, advanced energy trading, or full native mobile product.

## 3. Actors

| Actor | Description |
|---|---|
| Visitor | Browses public Places without an account |
| Applicant | Uses Home Passport and applies for a Place |
| Resident | Lives in a participating Place |
| Household member | Has a defined Home Crew role |
| Twin | One trusted human connected through Day One |
| Provider worker | Performs assigned housing operations |
| Repair worker | Handles selected Fixes and approved access |
| Resident leader | Holds an elected or delegated governance role |
| Community Lead | Supports approved fLOKr activity |
| Support partner | Provides legal, settlement, accessibility, financial, or stability support |
| Auditor | Reviews approved records and controls |
| Platform operator | Runs PullUp under logged, purpose-limited access |

The [user roles](../product/user-roles.md) document defines the human purpose, experience, boundaries, transitions, and tone for these actors. This requirements document remains the testable authority for pilot behaviour.

## 4. Business requirements

### BR-01 Permanent public benefit

PullUp must support providers whose legal and financial model protects affordability and prevents speculative conversion.

### BR-02 Cost transparency

Every published Place must disclose Total Damage and Where It Goes using a consistent data model.

### BR-03 Housing firewall

Housing eligibility, pricing, repair priority, rights, and tenure must not use fLOKr activity, Day One use, purchases, popularity, engagement, or unrelated personal data.

### BR-04 Sustainable revenue

Platform revenue must not depend on rent increases, application fees, eviction volume, paid ranking, ads, resident data sales, or speculative appreciation.

### BR-05 Local governance

Local providers and residents must retain defined authority over local housing, policies, services, budgets, and shared spaces.

### BR-06 Portability

Residents and providers must be able to export relevant records in documented formats.

### BR-07 Human access

Every essential resident journey must have a non-app route.

## 5. Functional requirements

## 5.1 Identity and access

### FR-ID-01 Account choice

Visitors must browse public Places without creating an account.

### FR-ID-02 Resident sign-in

Residents must be able to use email-based sign-in. Password and passkey methods should be supported according to rollout readiness.

### FR-ID-03 Staff assurance

Staff and privileged roles must use phishing-resistant multi-factor authentication where supported.

### FR-ID-04 Role separation

The system must distinguish resident, household, Twin, staff, contractor, support partner, auditor, and platform roles.

### FR-ID-05 Recovery

Account recovery must include a staffed route and must not depend solely on the lost device or email account.

### FR-ID-06 Session control

Users must see active sessions and revoke them.

## 5.2 Flow and discovery

### FR-FLOW-01 Views

Flow must offer card, list, and map views with equivalent Place results.

### FR-FLOW-02 Material facts first

Each Place result must show:

- Total Damage;
- tenure;
- availability;
- accessibility facts;
- household type;
- provider identity;
- major Heads Up items;
- freshness date.

### FR-FLOW-03 Actions

Users must be able to Keep, choose Not It, and Pull Up for a tour through visible buttons.

### FR-FLOW-04 Optional gestures

The card view may support right, left, and upward gestures, but every result must be available through non-gesture controls.

### FR-FLOW-05 Private pass

Not It must remain private from providers and other residents.

### FR-FLOW-06 No paid ranking

Providers must not purchase position, exposure, or urgency.

### FR-FLOW-07 Undo

Keep and Not It must offer an understandable undo.

### FR-FLOW-08 Filters

Users must filter by Total Damage, location, availability, tenure, household fit, accessibility, pets, transport, and selected living practices.

### FR-FLOW-09 No people ranking

PullUp must not provide swipe ranking or attractiveness ranking of applicants, residents, Twins, or possible roommates.

## 5.3 The Rundown

### FR-RUN-01 Complete Place profile

The Rundown must include Total Damage, Where It Goes, The Vibe, Heads Up, The Backstory, Around Here, Fine Print, provider information, and source dates.

### FR-RUN-02 Total Damage

Total Damage must separate:

- known monthly charges;
- estimated variable charges;
- move-in charges;
- refundable amounts;
- optional services.

### FR-RUN-03 Where It Goes

Where It Goes must identify the recipient and purpose of each charge and how it may change.

### FR-RUN-04 Accessibility facts

Accessibility information must describe features rather than using one generic accessible label.

### FR-RUN-05 Resident insight

Word on the Block must verify resident relationship, protect identity, support moderation, prevent retaliation, and allow a provider response.

### FR-RUN-06 History

The Backstory must show material repair, inspection, accessibility, retrofit, and planned-work history without exposing resident data.

### FR-RUN-07 Comparison

Side by Side must compare selected Places without assigning a universal winner.

## 5.4 Tours

### FR-TOUR-01 Tour modes

Users must request in-person, remote, accessible, open-house, or trusted-person tours where the provider supports them.

### FR-TOUR-02 Safety

Tour records must show the host, role, time, access method, accommodation, and reporting route.

### FR-TOUR-03 TapIn

TapIn may issue time-limited tour access after explicit authorization.

### FR-TOUR-04 Day One

A user may grant a Twin access to one selected tour through Max Pass.

## 5.5 Home Passport and applications

### FR-APP-01 Reusable application

An applicant must create one Home Passport and reuse selected verified fields.

### FR-APP-02 Selective disclosure

Applicants must choose which fields and documents are shared for each application.

### FR-APP-03 Purpose

Every sensitive field must state why it is requested and whether it is required.

### FR-APP-04 Access history

Applicants must see who accessed shared application data and when.

### FR-APP-05 Expiry

Home Passport shares must have an expiry or clear end condition.

### FR-APP-06 Status

Where We At? must show status, timestamp, next step, responsible party, expected timing where possible, and reason for material decisions.

### FR-APP-07 Drafts

Applications must save drafts and resume across sessions.

### FR-APP-08 Assisted route

Staff must be able to support phone, paper, kiosk, and assisted applications without creating a lower-priority queue.

### FR-APP-09 Allocation rules

Every participating provider must publish the applicable allocation rules.

### FR-APP-10 No tenant score

PullUp must not calculate or expose a universal tenant, behaviour, vulnerability, social, or desirability score.

### FR-APP-11 Review and appeal

Consequential application decisions must provide a reason, human review route, and appeal information where available.

## 5.6 Move Plan

### FR-MOVE-01 Plan

Accepted applicants must receive an editable Move Plan covering agreements, payments, access, utilities, accessibility, household, inspection, and first-week tasks.

### FR-MOVE-02 Privacy

Move Plan is private unless the user shares selected tasks.

### FR-MOVE-03 Day One

Users may place selected Move Plan tasks into Our Move and Tag Team them with a Twin.

### FR-MOVE-04 Makana

Makana may receive only user-approved task or milestone signals. Private reflections must not return to PullUp.

## 5.7 My Place and The Setup

### FR-HOME-01 Dashboard

My Place must show housing charges, open Fixes, notices, bookings, documents, household, access, upcoming decisions, and support.

### FR-HOME-02 Asset model

The Setup must describe rooms, fixtures, appliances, controls, manuals, warranties, maintenance, and emergency information.

### FR-HOME-03 Physical fallback

Critical home, emergency, and equipment information must be available without the app.

### FR-HOME-04 Household roles

Home Crew must support role-specific permissions and must not expose every household record to every member.

### FR-HOME-05 Ground Rules

Households may record shared expectations. Ground Rules must not override law, provider duties, or individual rights.

## 5.8 Fixes

### FR-FIX-01 Multi-channel report

Residents must report a Fix through text, photo, voice, phone, or assisted support.

### FR-FIX-02 Urgency

Residents must be able to identify health, safety, access, and accommodation concerns.

### FR-FIX-03 Tracking

Residents must see acknowledgement, assignment, appointment, updates, expected timing, and completion.

### FR-FIX-04 Entry consent

Repair access must use a defined window, authorized worker, purpose, expiry, and resident-visible record.

### FR-FIX-05 Reopen and escalate

Residents must reopen an unresolved Fix and access an escalation route.

### FR-FIX-06 Provider operations

Provider workers must manage work orders, assignments, assets, parts, contractors, recurring issues, schedules, and service levels.

### FR-FIX-07 No retaliation

Repair priority must not be reduced because of complaints, social activity, payment history unrelated to the repair, or staff sentiment.

## 5.9 Commons

### FR-COM-01 Catalogue

Residents must browse available shared resources with status, rules, cost, accessibility, care, and repair information.

### FR-COM-02 Reservation

TapIn must support authorized reservation, payment where required, and time-limited access.

### FR-COM-03 Fair access

Commons rules must not create premium access to essential housing services.

### FR-COM-04 Proposals

Residents should propose new Commons resources and view the decision.

### FR-COM-05 Maintenance

Unavailable or unsafe resources must be removed from booking until restored.

## 5.10 The Board and governance

### FR-GOV-01 Notices

The Board must publish maintenance, outage, emergency, meeting, proposal, budget, decision, event, and service information.

### FR-GOV-02 Channels

Critical notices must use redundant digital and non-digital channels.

### FR-GOV-03 Proposals

Authorized residents must submit proposals and receive status and reasons.

### FR-GOV-04 Participation

Participation must support online, phone, paper, translated, accessible, and in-person routes.

### FR-GOV-05 Voting

Where digital voting is lawful and approved, the system must preserve eligibility, ballot secrecy where required, auditability, and a non-digital route.

### FR-GOV-06 No housing penalty

Participation or non-participation must not affect housing.

## 5.11 Damage Control, Stay Put, and Switch Up

### FR-STAY-01 Voluntary help

Damage Control and Stay Put must begin with consent except where law requires another process.

### FR-STAY-02 Support

The system must connect eligible residents to human-approved payment plans, benefits, utilities, legal help, accessibility support, and housing-stability services.

### FR-STAY-03 Minimal disclosure

Support partners receive only the information required for the selected support.

### FR-STAY-04 No eviction automation

The system must not recommend, rank, or trigger eviction.

### FR-SWITCH-01 Transfer

Switch Up must support transfer requests, reasons, accommodation, status, and portable approved records.

### FR-SWITCH-02 No restart

A resident moving within the network should not repeat verified information without a lawful reason.

## 5.12 Day One

### FR-TMX-01 One chosen Twin

A user must be able to Twin Up with one chosen human. The pilot does not assign or recommend a Twin.

### FR-TMX-02 Max Pass

Every Twin permission must specify:

- product;
- record or task;
- allowed action;
- purpose;
- start;
- expiry;
- revocation.

### FR-TMX-03 Twin Mode

Twin Mode must show only shared records and tasks.

### FR-TMX-04 Tag Team

Users must assign selected tasks, dates, notes, and responsibilities.

### FR-TMX-05 Run It By Me

Users must request a second opinion without granting broader access.

### FR-TMX-06 Put Me On

Users may share selected Places, fLOKr items, Leads, Shifts, and Moves.

### FR-TMX-07 Hold It Down

Users may delegate one defined action for a limited time. Legal signing, permanent access, identity changes, and withdrawal of housing rights cannot be delegated through the general feature.

### FR-TMX-08 Double Tap

Users may require both people to confirm a sensitive supported action. Double Tap supplements, but does not replace, the user’s own legal consent.

### FR-TMX-09 Split It

TapIn may split an approved cost without revealing full accounts or unrelated transactions.

### FR-TMX-10 Pull Through

Users may send an urgent practical request. The feature must clearly state that it is not an emergency service.

### FR-TMX-11 Check In

Users may share one chosen status or progress signal. Continuous location, private reflection, and background monitoring are excluded.

### FR-TMX-12 Our Move

Users must build a shared plan from selected tasks across authorized Sakia Labs products.

### FR-TMX-13 Receipts

Users must see what a Twin viewed, changed, confirmed, or completed.

### FR-TMX-14 Revocation

Revocation must apply immediately to new access and invalidate active Max Pass credentials.

### FR-TMX-15 Core access

Day One must not be a premium housing tier. Not using it must never weaken housing rights or service.

## 5.13 TapIn

### FR-TAP-01 Action intent

Calling products must send TapIn a scoped action intent with actor, resource, purpose, expiry, and idempotency key.

### FR-TAP-02 Payments

TapIn must show amount, recipient, reason, refund terms, and Total Damage context before payment.

### FR-TAP-03 Booking and joining

TapIn must support authorized booking, joining, reservation, and confirmation without duplicating product ownership data.

### FR-TAP-04 Access

Temporary access must include identity, scope, start, expiry, purpose, revocation, and fallback.

### FR-TAP-05 No stored-value launch

The pilot will not hold resident wallet balances or act as a bank.

### FR-TAP-06 No punishment lockout

Housing access must not be automatically revoked by a failed payment or general billing state.

## 5.14 Ecosystem integrations

### FR-INT-01 Ownership

PullUp owns housing truth. fLOKr owns community activity. TapIn owns action execution. Lexi owns sourced explanations. Makana owns private wellbeing. Day One owns the trusted relationship and permission layer.

### FR-INT-02 No shared tables

Products must integrate through versioned APIs and events rather than direct shared-table access.

### FR-INT-03 Scoped identity

Each product must receive only the identity scope it needs.

### FR-INT-04 Consent

Cross-product sharing must record purpose, data class, recipient, authority, expiry, and withdrawal.

### FR-INT-05 Failure isolation

A failure in fLOKr, Lexi, Makana, Day One, or a nonessential TapIn service must not block emergency housing information or repair reporting.

## 5.15 IoT and building systems

### FR-IOT-01 Approved purpose

Every device must have a documented resident or building benefit.

### FR-IOT-02 Device transparency

The Setup must show what a device senses, who receives data, retention, controls, and offline behaviour.

### FR-IOT-03 Local operation

Life-safety and essential home controls must retain local or manual operation during internet loss.

### FR-IOT-04 Prohibited sensing

The system must not use cameras or microphones inside homes, face, voice, gait, or emotion recognition, private-room occupancy inference, or sensor data for housing decisions.

### FR-IOT-05 Edge minimization

The building gateway should send normalized events instead of continuous private telemetry.

### FR-IOT-06 Command safety

Remote commands must require actor, purpose, scope, expiry, policy check, acknowledgement, audit, and manual fallback.

## 6. Non-functional requirements

## 6.1 Accessibility

### NFR-ACC-01

All resident and public interfaces must meet WCAG 2.2 AA.

### NFR-ACC-02

Primary interactive targets should be at least 44 by 44 CSS pixels.

### NFR-ACC-03

Every gesture must have a simple pointer and keyboard equivalent.

### NFR-ACC-04

Critical journeys must pass screen-reader testing on representative mobile and desktop combinations.

### NFR-ACC-05

The system must support 200 percent zoom, text spacing, reduced motion, high contrast, and reflow.

### NFR-ACC-06

Maps, charts, and visual status must have text or table equivalents.

## 6.2 Performance

### NFR-PERF-01

Public Place pages should meet a 2.5-second p75 Largest Contentful Paint target on representative Canadian mobile connections.

### NFR-PERF-02

Primary interaction response should appear within 100 milliseconds and confirmed server state within two seconds under normal pilot load.

### NFR-PERF-03

Critical resident pages should remain usable on low-bandwidth connections and older supported devices.

## 6.3 Reliability

### NFR-REL-01

The pilot target is 99.9 percent monthly availability for core resident web and API functions, excluding announced maintenance.

### NFR-REL-02

Repair reporting, emergency information, and physical access must have non-app fallbacks.

### NFR-REL-03

Payment, application, booking, agreement, and device commands must be idempotent.

### NFR-REL-04

Core workflow truth must persist in PostgreSQL rather than only in cache or queues.

### NFR-REL-05

Backups must support tested point-in-time database recovery and versioned document recovery.

## 6.4 Security

### NFR-SEC-01

The platform must target OWASP ASVS 5.0 Level 2 for the pilot, with higher controls for identity, payments, documents, and access.

### NFR-SEC-02

All traffic must use current TLS. Sensitive data must be encrypted at rest.

### NFR-SEC-03

Authorization must combine role, relationship, tenant, purpose, time, and consent checks.

### NFR-SEC-04

Service credentials must never reach the browser.

### NFR-SEC-05

Uploads must receive content-type verification, malware scanning, size limits, metadata stripping where appropriate, and quarantine before use.

### NFR-SEC-06

Privileged actions must require strong authentication, reason, and audit.

### NFR-SEC-07

Secrets, dependencies, containers, and infrastructure must be scanned during delivery.

## 6.5 Privacy

### NFR-PRIV-01

Data collection must be necessary, purpose-bound, and documented.

### NFR-PRIV-02

My Business must show data, purpose, access, sharing, expiry, correction, export, and withdrawal where applicable.

### NFR-PRIV-03

Resident data must not be sold or used for behavioural advertising.

### NFR-PRIV-04

Logs and analytics must exclude identity documents, agreement text, payment details, private free text, access credentials, Makana reflections, and raw private sensor history.

### NFR-PRIV-05

Production residency, contracts, retention, backups, and subprocessors must pass Canadian privacy and legal review before launch.

## 6.6 AI and data science

### NFR-AI-01

Models must not allocate housing, set housing charges, recommend eviction, control locks, or calculate resident worth.

### NFR-AI-02

Every AI use must declare purpose, allowed data, model, prompt, source set, output schema, retention, review, and evaluation.

### NFR-AI-03

Source-grounded explanations must show authority, date, jurisdiction, uncertainty, and next step.

### NFR-AI-04

The system must test hallucination, abstention, prompt injection, permission leakage, translation quality, and disparate quality.

### NFR-AI-05

Material decisions require deterministic policy, a reason, human review, appeal, and disparity monitoring.

## 6.7 Interoperability

### NFR-INT-01

Public product contracts must use versioned OpenAPI, JSON Schema, or AsyncAPI.

### NFR-INT-02

Residents and providers must receive common, documented export formats.

### NFR-INT-03

Core domain code must remain portable across standard PostgreSQL and S3-compatible services.

## 6.8 Observability

### NFR-OBS-01

Web, API, workers, integrations, and edge gateways must use common correlation identifiers.

### NFR-OBS-02

OpenTelemetry must capture privacy-filtered traces, metrics, and logs.

### NFR-OBS-03

Alerts must cover core availability, queue age, database health, integration failure, repair and application timers, and edge backlog.

## 7. Data classifications

| Class | Examples | Default |
|---|---|---|
| Public | Place facts, public policies, public events | Public, source-dated |
| Member | Building notices, Commons catalogue | Authenticated community scope |
| Household | Home Crew, Ground Rules, household bookings | Household relationship scope |
| Confidential | Home Passport, agreements, payments, private messages | Named purpose and least privilege |
| Highly sensitive | Identity evidence, access credentials, support records | Strong assurance, narrow scope, short retention |
| Building telemetry | Leaks, faults, aggregate energy | Purpose-limited, minimized at edge |
| Governance | Proposals, decisions, budgets, ballots | Transparency balanced with legal privacy |
| Derived | Recommendations, forecasts, fairness metrics | Documented inputs, review, retention, and appeal where consequential |

## 8. Pilot launch gates

The pilot cannot launch until:

- resident advisors approve the core journeys;
- legal and human-rights review is complete;
- privacy impact assessment is complete;
- threat model and security verification are complete;
- WCAG 2.2 AA testing is complete;
- allocation firewall tests pass;
- Day One permission and revocation tests pass;
- payment and access separation tests pass;
- repair reporting works through app and non-app routes;
- backup and recovery are tested;
- incident, breach, outage, and safeguarding playbooks exist;
- every public Place has verified Total Damage;
- provider workers are trained;
- resident support and complaint routes are staffed.

## 9. Pilot non-goals

The first release will not include:

- global public marketplace;
- automated resident selection;
- AI housing decisions;
- dynamic housing charges;
- universal roommate matching;
- public reputation scores;
- stored-value wallet;
- cryptocurrency or housing token;
- native mobile application;
- large device rollout;
- camera or microphone sensing inside homes;
- advanced energy trading;
- replacement of tribunals, legal clinics, public housing, or human organizing.

## 10. Traceability

Every roadmap item and implementation task must reference one or more requirement IDs. A feature without a requirement is a proposal. A requirement without a test or accountable owner is a wish.

---

Built with 💖 for housing software that can explain what it does and prove it.
