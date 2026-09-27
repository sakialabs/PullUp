# PullUp Roadmap

**Version:** 1.0  
**Status:** Proposed delivery sequence  
**Date:** August 24, 2026  
**Pilot:** One London, Ontario partner, roughly 50 to 150 homes

## 1. Roadmap rule

The roadmap starts at **T0**, not at a hopeful date.

T0 occurs when PullUp has:

- one committed housing partner;
- a paid resident advisory group;
- a named product owner;
- legal, privacy, accessibility, and security support;
- pilot funding;
- authority to inspect real workflows and data;
- agreement on the launch gates in requirements.md.

Without those conditions, engineering would produce an attractive demo and a very expensive pile of assumptions.

## 2. Delivery strategy

Build the smallest complete housing loop:

1. publish trustworthy Places;
2. show Total Damage;
3. help people discover and compare;
4. let people request tours and submit a lightweight Home Passport;
5. give residents My Place and Fixes;
6. add Commons and The Board;
7. add Day One with narrow Max Pass permissions;
8. connect selected fLOKr and TapIn actions;
9. test one consent-based building sensor use case;
10. measure whether service and power actually improve.

## 3. Phase map

| Phase | Duration | Outcome |
|---|---:|---|
| 0. Foundation lock | 2 weeks | Partner, residents, rights, scope, and measures are real |
| 1. Technical spine | 4 weeks | Secure delivery platform and domain skeleton |
| 2. Find a Place | 6 weeks | Flow, Rundown, Total Damage, comparison, and tours |
| 3. Apply and move | 6 weeks | Home Passport, Where We At?, Fine Print, and Move Plan |
| 4. Live well | 8 weeks | My Place, The Setup, Fixes, Commons, and The Board |
| 5. Move together | 5 weeks | Day One, TapIn actions, and selected fLOKr connection |
| 6. Building intelligence | 4 weeks | One privacy-reviewed local-first IoT use case |
| 7. Pilot readiness | 5 weeks | Accessibility, security, migration, training, and support |
| 8. Closed pilot | 12 weeks | Real resident use with measured outcomes |
| 9. Decision | 4 weeks | Fix, expand, redesign, or stop based on evidence |

Some work overlaps. The sequence is controlled by exit gates, not deadline theatre.

## 4. Phase 0: Foundation lock

### Objectives

- confirm the institutional model;
- choose the partner and participating homes;
- pay resident advisors;
- map rights, policies, and workflows;
- define baseline outcomes;
- complete initial privacy and human-rights screening;
- approve the product language and prototype.

### Deliverables

- partner memorandum of understanding;
- resident advisory charter;
- decision-rights map;
- current-state service blueprint;
- data inventory;
- legal and policy register;
- pilot measurement plan;
- risk register;
- approved requirements baseline.

### Exit gate

- Residents and partner approve the pilot problem.
- No essential workflow lacks a human owner.
- Total Damage can be calculated from available data.
- Repair and emergency routes are documented.
- Funding covers build, support, resident participation, and evaluation.

## 5. Phase 1: Technical spine

### Objectives

- create the repository and delivery pipeline;
- establish identity, authorization, tenant scope, consent, audit, and observability;
- create the core Place, provider, resident, and asset data model;
- prove Canadian-region deployment and recovery.

### Deliverables

- Next.js web shell;
- FastAPI modular monolith;
- PostgreSQL and PostGIS;
- Supabase Auth integration;
- row-level security;
- object-storage quarantine;
- transactional outbox and worker;
- OpenAPI client generation;
- design tokens and core components;
- synthetic fixtures;
- security and accessibility test harness;
- initial ADRs.

### Exit gate

- one resident, Twin, worker, and administrator can authenticate with correct scope;
- no cross-provider record access;
- audit and consent receipts are visible;
- backup and restore test passes;
- critical telemetry contains no prohibited data.

## 6. Phase 2: Find a Place

### Objectives

- publish clear Place information;
- make discovery attractive without manipulating people;
- verify accessible alternatives to gestures.

### Deliverables

- provider Place editor;
- Flow card, list, and map;
- Keep, Not It, and undo;
- The Rundown;
- Total Damage and Where It Goes;
- The Vibe;
- Heads Up;
- The Backstory;
- Around Here;
- Keepers;
- Side by Side;
- Pull Up tour request.

### Exit gate

- every pilot Place has complete required facts;
- Total Damage calculations are reviewed;
- buttons, keyboard, screen reader, list, map, phone, and assisted routes produce equivalent outcomes;
- providers cannot see Not It;
- no paid ranking or fake urgency exists.

## 7. Phase 3: Apply and move

### Objectives

- reduce repeated paperwork;
- expose application status and reasons;
- make move-in understandable.

### Deliverables

- Home Passport;
- selective sharing;
- document upload and verification;
- lightweight application;
- published allocation rules;
- Where We At?;
- reason and review pattern;
- Fine Print with original sources;
- agreement versioning;
- Move Plan;
- non-app application route.

### Exit gate

- application data is minimal and purpose-labeled;
- access history and expiry work;
- no tenant score exists;
- a screen-reader user can complete the journey;
- staff can process paper or assisted applications without creating a second-class queue;
- legal review approves reasons and appeal language.

## 8. Phase 4: Live well

### Objectives

- make PullUp valuable after move-in;
- prove service accountability;
- begin the library economy.

### Deliverables

- My Place;
- Home Crew;
- Ground Rules;
- The Setup;
- Fixes resident flow;
- provider work orders;
- appointments and approved access;
- reopen and escalation;
- starter Commons catalogue and booking;
- The Board;
- critical multi-channel notices;
- Damage Control and Stay Put referral entry;
- Switch Up request.

### Exit gate

- residents can report a Fix through app and non-app channels;
- access windows are scoped and auditable;
- recurring issues are visible;
- Commons resources cannot be booked while unsafe;
- critical notices reach residents through redundant channels;
- housing-stability help is voluntary and human-led.

## 9. Phase 5: Move together

### Objectives

- launch Day One as the human-support layer;
- connect TapIn as the action rail;
- connect selected community actions through fLOKr.

### Deliverables

- Twin Up;
- Twin Mode;
- Tag Team;
- Run It By Me;
- Put Me On;
- Hold It Down;
- Double Tap;
- Split It;
- Pull Through;
- Check In;
- Our Move;
- Max Pass;
- Receipts;
- TapIn action-intent API;
- selected fLOKr shares and Moves.

### Exit gate

- no Twin sees anything outside Max Pass;
- expiry and revocation work immediately;
- Receipts show access and action history;
- Double Tap cannot create hidden legal authority;
- Split It exposes no unrelated financial data;
- Day One remains optional and free from housing penalties;
- optional integration failure does not block core PullUp tasks.

## 10. Phase 6: Building intelligence

### Objective

Prove one device use case with clear resident and building value.

### Recommended first use

Leak detection in approved mechanical and common areas, or resident-consented unit locations.

### Deliverables

- building gateway;
- enrolled sensor;
- local alarm;
- normalized PullUp event;
- Fix creation or staff alert;
- The Setup device explanation;
- retention and access controls;
- manual fallback;
- resident evaluation.

### Exit gate

- data-flow diagram and privacy review pass;
- internet loss does not stop the local alert;
- no occupancy or behaviour inference is possible;
- no device event affects housing decisions;
- false positives and maintenance load are acceptable.

## 11. Phase 7: Pilot readiness

### Objectives

- make the product safe enough for real housing;
- train everyone responsible for it;
- prove recovery.

### Deliverables

- WCAG 2.2 AA audit;
- resident usability sessions;
- threat model;
- OWASP ASVS 5.0 verification;
- privacy impact assessment;
- human-rights and fairness review;
- penetration test;
- migration rehearsal;
- backup and restore rehearsal;
- outage and incident exercises;
- provider training;
- resident orientation;
- help desk and escalation rota;
- launch communications;
- rollback plan.

### Exit gate

Every pilot launch gate in requirements.md is signed by an accountable owner. Open critical defects are zero.

## 12. Phase 8: Closed pilot

### Shape

- opt-in cohort;
- 12 weeks;
- weekly operational review;
- biweekly resident advisory session;
- monthly governance review;
- no silent expansion of data or purpose;
- fast rollback for harmful features.

### Measure

- Total Damage clarity;
- time and burden to apply;
- repair acknowledgement, resolution, and reopen rate;
- service differences across resident groups and channels;
- Commons use and savings;
- Day One permission comprehension;
- privacy and access complaints;
- application and repair status understanding;
- resident control and trust;
- staff workload;
- accessibility;
- energy or leak outcome for the device trial.

### Stop conditions

Pause a feature when:

- it creates a safety risk;
- permissions leak;
- a material disparate outcome appears;
- residents cannot understand a consequential action;
- an integration begins affecting housing decisions;
- the non-app route fails;
- operating burden exceeds benefit;
- the provider cannot staff the process.

## 13. Phase 9: Decision

At the end of the closed pilot, choose one:

### Expand

The core outcomes improve, safeguards hold, operating work is sustainable, and another partner has the institutional fit.

### Fix and repeat

The model is promising but material usability, policy, data, support, or service issues remain.

### Redesign

The product solves the wrong part of the workflow or creates too much institutional friction.

### Stop

PullUp does not improve resident outcomes enough to justify continued cost or risk.

Stopping a weak approach is discipline, not failure.

## 14. Workstreams

| Workstream | Accountable lead |
|---|---|
| Resident research and co-design | Resident partnership lead |
| Product and content | Product lead |
| Housing operations | Partner operations lead |
| Legal and human rights | Qualified legal lead |
| Privacy and data governance | Privacy lead |
| Accessibility | Accessibility lead plus paid disabled testers |
| Web and design system | Frontend lead |
| API and data | Backend lead |
| Infrastructure and security | Platform lead |
| IoT and facilities | Building systems lead |
| Evaluation | Independent or arms-length evaluation lead |

One person may hold more than one role in the pilot. Accountability still needs a name.

## 15. First 30 days after T0

### Week 1

- sign partner and resident-advisor agreements;
- map decision rights;
- confirm pilot homes;
- start data and workflow inventory;
- approve issue and risk tracking.

### Week 2

- run resident and staff journey workshops;
- calculate sample Total Damage;
- map repairs, notices, applications, and access;
- begin privacy and human-rights screening.

### Week 3

- approve domain language;
- approve pilot measurement;
- create repository and environments;
- create design tokens and accessible component baseline;
- create identity and tenancy skeleton.

### Week 4

- publish synthetic Place fixtures;
- demonstrate Flow, Rundown, and Total Damage;
- demonstrate resident, Day One, and staff authorization;
- review Phase 0 exit gate.

## 16. What not to accelerate

Do not rush:

- resident consent;
- legal review;
- allocation policy;
- repair and emergency process;
- accessibility;
- data migration;
- staff training;
- physical-access safety;
- Day One delegation boundaries;
- public claims about affordability.

Velocity matters. Housing is simply a rude place to “move fast and break things.”

---

Built with 💖 for steady progress that residents can actually feel.
