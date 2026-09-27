# PullUp AI Opportunity Map

**Version:** 1.0  
**Status:** Planning baseline; no production model approval  
**Date:** September 26, 2026  
**First proof:** Provider Document Intake Assistant, synthetic data only

## 1. Decision summary

PullUp should use AI and data science only where they remove administrative burden, improve clarity, or expose service problems without transferring authority away from residents and qualified workers.

The first and only AI proof to start now is the **Provider Document Intake Assistant**. It will process synthetic provider documents, begin with digital-text parsing and OCR, produce candidate Place and Total Damage facts in a strict schema, preserve field-level source references, flag missing or conflicting facts, and require a qualified provider worker to review every material field. It will never publish automatically.

No production AI feature is approved by this document. Production work still depends on the roadmap's T0 conditions, a real partner, a lawful data inventory, privacy and human-rights review, named human owners, supported-language decisions, and the applicable launch gates.

The portfolio order is:

| Order | Capability | Earliest posture | Why |
|---:|---|---|---|
| 1 | Provider Document Intake Assistant | Build a synthetic proof now | High provider friction, bounded output, strong deterministic baseline, and mandatory review |
| 2 | Source-grounded housing explanations | Plan and evaluate with approved synthetic/public sources | High value, but legal and rights information makes mistakes consequential |
| 3 | Multilingual and accessible communication | Plan with professional review | Improves access, but consequential notices require human fidelity review |
| 4 | Fix intake and routing | Prototype only after the repair taxonomy and emergency rules exist | Useful operational support; emergency and urgency rules must remain deterministic |
| 5 | Listing integrity and structured-data quality | Add rules first; evaluate statistical methods later | Many errors are better caught by constraints, source dates, and duplicate checks |
| 6 | Media and repair-photo assistance | Research after consent, retention, and redaction controls exist | Useful for quality and privacy; images create surveillance and inference risks |
| 7 | Operational forecasting | Defer until enough lawful, representative history exists | Forecasts are not credible without stable workflows and sufficient data |
| 8 | Building anomaly detection and shared-energy scheduling | Defer to the privacy-reviewed building-intelligence phase | Must stay local-first and cannot infer private behaviour |
| 9 | Fairness and service monitoring | Define metrics early; analyze real outcomes only under approved governance | Necessary for audit, never for resident scoring |
| 10 | Place-fit ranking and Side-by-Side summaries | Keep deterministic during the pilot; consider models only after disparity evidence | Discovery must remain separate from allocation and provider-paid influence |

## 2. Non-negotiable boundary

AI is a supporting capability, not a user role, legal authority, housing policy, or PullUp's personality.

Models and statistical systems may draft, extract, translate, summarize, recommend, route, forecast, or detect. They may not:

- allocate housing, approve or reject an application, or rank applicant worth;
- set or dynamically change a housing charge or Total Damage;
- recommend, trigger, or optimize eviction or displacement;
- independently determine habitability, repair urgency, liability, eligibility, rights, tenure, or resident credibility;
- control locks, payments, legal notices, or life-safety systems;
- infer protected traits, vulnerability, emotion, voice identity, gait, attractiveness, or private-room occupancy;
- use fLOKr activity, Day One use, purchases, popularity, app engagement, complaints, or staff sentiment in housing or repair decisions;
- create tenant, behaviour, vulnerability, social, desirability, or universal compatibility scores;
- generate listing photos or invent Place facts, prices, availability, accessibility, policies, rights, or sources;
- train on resident data by default.

Allocation, emergency routing, publication, payment, access, and other consequential actions remain deterministic, authorized, reasoned, auditable, and reviewable. A model output is evidence for a person to inspect, never authority to act.

This map implements BR-03; FR-APP-09 through FR-APP-11; FR-FIX-02 and FR-FIX-07; FR-IOT-04; NFR-PRIV-01 through NFR-PRIV-05; and NFR-AI-01 through NFR-AI-05.

## 3. Shared delivery contract

### 3.1 Risk tiers

| Tier | Meaning | Required posture |
|---|---|---|
| **R1 — assistive** | Draft or quality signal that cannot change access, cost, rights, service priority, or tenure | Clear label, reversible output, provenance, user correction, deterministic fallback |
| **R2 — operational recommendation** | Suggestion may influence worker attention, discovery order, or operational planning | All R1 controls plus calibrated abstention, qualified review, disparity tests, audit, and a kill switch |
| **R3 — consequential information** | Output concerns rights, legal meaning, deadlines, safety, accessibility, or a material housing fact | All R2 controls plus authoritative sources, stricter accuracy gates, qualified human escalation, and no autonomous action |
| **Prohibited** | Model makes or executes a housing, price, eviction, lock, payment, life-safety, or resident-worth decision | Do not build |

A feature is assigned its highest plausible tier. Calling an output a “suggestion” does not lower its tier if people or workers are likely to rely on it.

### 3.2 Lifecycle gates

Every capability must pass these gates independently:

1. **Problem gate:** a named workflow, affected role, human owner, and deterministic baseline exist.
2. **Data gate:** allowed fields, prohibited fields, authority, retention, residency, subprocessors, and deletion are approved.
3. **Evaluation gate:** a versioned, representative offline set and success thresholds exist before model selection.
4. **Shadow gate:** suggestions are hidden from operational decision-makers while quality, leakage, disparity, latency, and cost are measured.
5. **Assisted gate:** authorized users may review a clearly labelled output; nothing acts or publishes automatically.
6. **Production gate:** accountable legal, privacy, accessibility, security, product, and domain owners approve the feature and its fallback.
7. **Ongoing gate:** drift, corrections, incidents, costs, disparities, and source freshness stay within limits.

Failure at any gate returns the workflow to the deterministic or human baseline. Features are independently disableable.

### 3.3 Provider-neutral gateway and adapter contract

All model-assisted work goes through a provider-neutral gateway behind the FastAPI boundary. Deterministic implementations use the same versioned result contract so the UI and evaluation harness do not depend on a vendor.

Every request records:

- actor, active role, provider/building/Place scope, and approved purpose;
- consent or lawful-authority reference where required;
- allowed data classes and explicit field allowlist;
- input document or source identifiers and immutable versions;
- adapter, model, prompt, schema, source-set, and evaluation versions;
- timeout, cost ceiling, residency, retention, and logging policy;
- required review role and whether the output may be shown, saved, or compared.

Every result records:

- structured output validated against the requested schema;
- adapter and model identity, version, and configuration;
- field- or claim-level source references;
- status: `draft`, `extracted`, `estimated`, `source_backed`, `verified`, or `abstained`;
- calibrated confidence only when calibration has been demonstrated;
- warnings, missing evidence, conflicts, and abstention reason;
- latency, cost, correlation identifier, and evaluation tag;
- review, correction, approval, and rollback history.

The minimum adapter semantics are:

```text
CapabilityAdapter
  describe() -> capabilities, version, data handling, supported schemas
  execute(request) -> structured result or typed abstention
  health() -> availability without exposing private inputs

request
  capability, actor_scope, purpose, input_refs, source_allowlist,
  output_schema_version, retention_policy, evaluation_tag

result
  status, values, provenance, warnings, abstention_reason,
  adapter_version, model_or_rules_version, metrics
```

The first proof supplies a deterministic adapter and a fixture-backed mock adapter. A live model adapter is optional and must not be simulated when credentials or approvals are unavailable.

### 3.4 Security, privacy, and provenance defaults

- Authorize before retrieval and again before returning or saving output.
- Treat uploaded files, OCR text, retrieved passages, image metadata, and community content as untrusted data, never as instructions.
- Do not let model output invoke tools or change domain state. A separate deterministic command must re-authorize any downstream action.
- Use strict schemas, size limits, malware quarantine, content-derived file types, and metadata stripping where appropriate.
- Keep confidential document text, resident free text, Lexi questions, images, prompts containing private data, and raw sensor history out of logs and analytics.
- Use short-lived object references rather than copying files into prompts or events when possible.
- Preserve source version, page or region, effective date, authority, and content hash. Never fabricate a source reference.
- Apply provider, building, household, case, task, purpose, and expiry scopes at the database, retrieval, cache, and UI layers.
- Do not send an entire resident, application, repair, or document object to a model when a minimal field subset is enough.
- Do not use inputs or corrections for provider training unless a separate explicit contract and governance process permits it.
- Real resident data cannot become training data without a separate lawful, explicit, revocable, representative, and independently reviewed program.
- Prefer appropriately licensed pretrained models; keep all training code and data pipelines outside request-handling paths.
- Do not carry both PyTorch and TensorFlow in the main product without an ADR demonstrating why the maintenance and security cost is necessary.

### 3.5 Human and accessible defaults

- Show the original material beside the draft or extracted result.
- Let an authorized person approve, edit, reject, or mark “unable to verify” at field or claim level.
- Record the correction without silently converting it into training data.
- Use plain labels and never represent model confidence as legal or factual certainty.
- Preserve keyboard access, screen-reader semantics, 200 percent zoom, text reflow, high contrast, reduced motion, and non-visual equivalents for highlighted pages or image regions.
- Keep phone, paper, in-person, and professional-service routes available. A person who declines automation receives the same queue and rights.
- Do not require an AI feature for an emergency, application, repair, legal deadline, accessibility request, or housing service.

### 3.6 Common adversarial suite

Every capability receives a scoped version of these tests:

- prompt injection in body text, headers, footers, annotations, metadata, OCR-only layers, images, and retrieved passages;
- hallucinated or ungrounded values, claims, citations, source spans, and tool/action requests;
- malformed files, decompression bombs, unsupported languages, extreme length, duplicate pages, and contradictory versions;
- canary records across two households, providers, buildings, cases, and roles to detect permission leakage through retrieval, prompts, caches, traces, and outputs;
- attempts to request prohibited traits, resident scores, unauthorized sources, hidden provider-paid ranking, or an action outside the capability contract;
- source removal, stale authority, conflicting effective dates, low-quality scans, model outage, timeout, and partial worker failure;
- differential quality by supported language, dialect where relevant, disability-related access need, input channel, provider size, building type, and other lawfully reviewed groups;
- screen-reader, keyboard-only, zoom, reflow, low-bandwidth, print, and human-assisted workflows;
- safe rollback to the non-AI baseline without loss of rights, queue position, source material, or prior human corrections.

Across every capability, the minimum monitored outcome set is corrections, false positives, false negatives, abstentions, source/provenance failures, disparities, latency, cost, permission leakage, and prompt-injection success. A capability may add stricter measures but may not omit these.

## 4. Capability 1 — Provider Document Intake Assistant

**Priority:** 1; first proof  
**Risk:** R2 overall; R3 for Total Damage, tenure, accessibility, availability, or other material Place facts  
**Authority:** extraction only; no publication or verification authority

### User and workflow problem

Provider workers currently re-key facts from inconsistent digital PDFs, scans, schedules, accessibility inventories, fee sheets, and building records. Manual entry is slow and makes missing, stale, conflicting, or mistyped Place and Total Damage facts hard to see.

### Affected roles

- Primary: provider workers assigned to Place publishing, housing finance, accessibility inventory, or provider administration.
- Review: qualified housing-finance, accessibility, legal/policy, or publishing owner according to field type.
- Oversight: auditor, privacy lead, accessibility lead, and platform operator with no standing document-content access.
- Indirectly affected: visitors and applicants who later see approved Place facts.

### Current non-AI process and baseline

1. An authorized worker opens an approved source document.
2. They transcribe facts into the Place editor.
3. Required-field, type, arithmetic, date, range, currency, and cross-field rules validate the entry.
4. A qualified person compares each material field to the source and publishes through a separate authorized command.

The first automated baseline is digital-text extraction plus OCR, deterministic labels and table parsers, regular expressions, dictionaries, arithmetic checks, and strict schema validation. Manual entry time, error rate, missing-field recall, and review time are measured before any model-assisted extractor is considered.

### Expected benefit and measurable success criterion

- Reduce median time to prepare a Place draft by at least 30 percent against manual entry on the held-out synthetic evaluation set.
- Preserve or improve critical-field exact-match precision; the release target is at least 99 percent for money amount/currency, tenure, availability, and accessibility values, with abstention preferred over a wrong value.
- Produce schema-valid output and a resolvable source reference for 100 percent of non-abstained candidate fields.
- Detect at least 95 percent of seeded missing required fields and cross-document conflicts.
- Create zero automatic publications, zero false `verified` labels, and zero cross-provider disclosures.

A model-assisted adapter is justified only if it improves difficult-field macro F1 by at least 10 percentage points or reduces median human review time by at least 25 percent without reducing critical-field precision, provenance accuracy, abstention safety, privacy, accessibility, or cost limits.

### Allowed and prohibited data

**First proof allowed:** synthetic digital PDFs and synthetic scanned PDF, PNG, or JPEG files; synthetic provider identity; synthetic building, Place, availability, tenure, accessibility, Heads Up, source-freshness, and Total Damage facts.

**Future production allowed only after approval:** provider-owned or lawfully supplied source documents needed to publish a Place, processed within the authorized provider/building/Place scope and approved retention policy.

**Prohibited:** Home Passport or identity evidence; applications; agreements containing resident data; payment details; support records; private messages; Home Crew, Day One, fLOKr, or Makana data; raw private sensor history; unrelated provider records; resident images or free text; any material used for training by default.

### Decision impact and risk tier

The assistant proposes candidate facts. Incorrect facts could affect a person's understanding of cost, availability, tenure, accessibility, or suitability, so material fields are R3 even though the workflow is operational. Only a qualified human can change a field to `verified`; only the existing Place publishing policy can publish it.

### Deterministic or rules-based alternative

- PDF text-layer extraction, page segmentation, OCR, deterministic table reading, label dictionaries, regular expressions, and currency/date parsers.
- Required-field, enum, range, unit, arithmetic, effective-date, freshness, and Total Damage reconciliation rules.
- Exact and fuzzy comparison across versions to flag conflicts without choosing a winner.
- A manual entry form that shows the original document and preserves source references.

This remains the production fallback even if a model adapter is later approved.

### Model or technique candidates

1. Digital text and layout parsing.
2. OCR for image-only pages.
3. Rules and schema-constrained extraction.
4. A pretrained document-layout or language model producing schema-constrained candidates, but only after baseline evaluation.
5. No custom training until a lawful representative dataset and independent governance program exist.

### Framework and deployment requirements

- Run conversion, OCR, extraction, and evaluation in the worker path, never in a browser or a housing-action transaction.
- Use the provider-neutral `CapabilityAdapter` contract with `deterministic`, `mock`, and optional `model` implementations.
- Require object-store quarantine, content verification, malware scan, page and pixel limits, timeout, and idempotent jobs.
- No PyTorch, TensorFlow, vector database, or model-serving infrastructure is needed for the first proof.
- If validated custom research is later necessary, PyTorch is the default candidate outside request-handling paths. TensorFlow requires an ADR showing a concrete asset, pipeline, or edge advantage. Do not carry both in the main product.
- A portable inference format is considered only when it simplifies deployment and passes output-parity tests.
- Production processing requires approved Canadian-region residency, retention, subprocessors, and vendor terms.

### Source grounding and provenance

The strict candidate schema requires each extraction result to contain:

```text
document
  id, version, sha256, media_type, page_count, source_date,
  effective_date, jurisdiction, provider_scope

run
  job_id, schema_version, adapter_version, model_or_rules_version,
  ocr_version, prompt_version, evaluation_tag, started_at, completed_at

candidate_fields[]
  field_path, candidate_value, normalized_value, unit, currency,
  status, confidence_if_calibrated, source_refs[], validation_errors[],
  conflict_refs[], reviewer_state

source_refs[]
  document_id, document_version, page, text_span_or_bounding_box,
  source_fragment_hash

missing_required_fields[]
conflicts[]
warnings[]
abstention_reason
```

The initial field allowlist covers provider identity, provider legal/ownership type, building address, unit or room reference, tenure, availability, dated accessibility features, Heads Up facts, and versioned Total Damage components. Total Damage components must retain category (`known_monthly`, `estimated_variable`, `move_in`, `refundable`, or `optional`), integer minor units, currency, recipient, purpose, effective period, change rule, and source.

Source references must open the exact page and highlight the relevant span or image region. OCR or a model can produce `extracted`; only a qualified reviewer can produce `verified`.

### Confidence and abstention behaviour

- Abstain for unsupported media, illegible pages, missing provider scope, ambiguous unit or currency, contradictory values without an applicable rule, unseen schema fields, or missing source references.
- Never fill a required field from general world knowledge or a different provider's record.
- Do not display numeric confidence unless it is calibrated by field type. Prefer labels such as “clear source,” “needs review,” “conflict,” and “unable to extract.”
- Low-confidence candidates remain blank in the editable schema while the source region is shown for manual entry.

### Human review and correction path

The review screen must:

- show one candidate beside its exact source page/span and the current saved value;
- group missing, stale, conflicting, and arithmetic-invalid facts separately;
- support approve, edit, reject, mark unable to verify, and request another source;
- require a reason when a reviewer resolves a conflict or overrides a deterministic validation;
- require the appropriate permission and active provider/Place context;
- preserve actor, role, purpose, before/after values, source, and time in the audit trail;
- keep the final publish action separate and re-authorized;
- remain fully usable by keyboard and screen reader at 200 percent zoom.

Corrections become evaluation labels only in the synthetic proof. Future production corrections are not training data without separate approval.

### Offline, privacy-preserving, and human-service fallback

- Workers can enter every field manually from the original document.
- OCR and deterministic parsing may run in an approved local or private worker environment; a remote model outage never blocks Place editing.
- The source document stays available through its normal authorized route.
- No raw document text appears in analytics, traces, queue names, or error messages.
- If processing fails, the job reports a reason and routes to the normal provider-review queue without changing publication status.

### Evaluation dataset and metrics

Build a versioned, fully synthetic gold set with template-disjoint train/development/test partitions. Include digital text, image-only scans, skew, rotation, compression, handwriting-like annotations, multi-column layouts, tables split across pages, duplicate pages, conflicting versions, stale dates, missing values, currencies, decimal formats, supported languages, and accessibility inventories.

The held-out set must include adversarial documents containing instruction-like text in body copy, headers, footers, annotations, metadata, and images.

Measure:

- OCR character and word error rate by document condition and supported language;
- per-field exact match, normalized match, precision, recall, F1, and abstention rate;
- critical-field false-positive and false-negative rates;
- source-page accuracy and source-span or region overlap;
- missing-field, stale-field, duplicate, and conflict-detection precision/recall;
- schema-validation rate and Total Damage arithmetic correctness;
- calibration error or Brier score only if confidence is surfaced;
- median and p95 review time, edit rate, rejection rate, and reviewer agreement;
- job latency, timeout rate, queue age, compute cost, and storage volume;
- permission-leakage and prompt-injection attack success rate, which must be zero.

### Fairness, language, accessibility, privacy, and permission-leakage tests

- Compare extraction and abstention quality across every declared supported language, document template, scan quality, provider size, building age, and accessibility-field category.
- Verify that unfamiliar language or disability terminology causes abstention or review, not silent omission or normalization into a generic “accessible” label.
- Test the review flow with screen readers, keyboard only, high contrast, 200 percent zoom, reflow, and text alternatives for visual highlights.
- Use provider A/provider B canaries, swapped object references, expired worker assignments, revoked roles, cache reuse, retry jobs, and concurrent reviews to prove zero cross-provider leakage.
- Verify that hidden text, annotations, metadata, QR content, and OCR text saying “ignore rules,” “publish,” or “use another file” are treated as document content and cannot alter instructions, source scope, tools, or state.
- Verify logs and telemetry contain identifiers and operational metrics only, never document text or extracted private values.

### Monitoring, rollback, and retirement criteria

Monitor extraction volume, field metrics, abstention, correction and conflict rates, review time, reviewer overrides, latency, cost, timeouts, unsupported formats, source-reference failures, permission denials, injection detections, and disparities by approved evaluation slice.

Rollback immediately to manual plus deterministic intake on any unauthorized disclosure, automatic publication, fabricated provenance, false `verified` status, critical-field regression, material accessibility failure, or unresolved injection path. Disable only the affected adapter through a feature flag and preserve pending documents and human edits.

Retire a model adapter if it fails to beat the deterministic baseline for two evaluation cycles, no longer has approved residency or licensing, exceeds cost/latency limits without commensurate benefit, produces persistent correction disparities, or cannot be independently reproduced. Retire the whole assistant if it does not reduce total reviewed workflow time or increases publication error.

## 5. Capability 2 — Source-grounded housing explanations

**Priority:** 2  
**Risk:** R3  
**Authority:** explanation only; not legal advice or a final rights decision

### User and workflow problem

Applicants, residents, Twins with a valid Max Pass, provider workers, resident leaders, and support partners need plain-language help with approved agreements, notices, rights, policies, duties, and deadlines. Manual explanation is slow and source discovery is inconsistent, while an unsupported answer can cause material harm.

### Affected roles

Visitors, applicants, residents, Twins acting under an exact Max Pass, resident leaders, provider workers, support partners, and auditors may consume or review explanations. Qualified legal/housing-policy owners govern sources and reusable content; platform operators have no standing access to questions or source documents.

### Current non-AI process and baseline

Original documents, a curated source index, deterministic jurisdiction/effective-date filters, approved plain-language templates, deadline calculators, and referral to a qualified housing worker or legal clinic. Full-text PostgreSQL search is the retrieval baseline.

### Expected benefit and measurable success criterion

Reduce time to find the controlling passage and prepare an explanation by at least 25 percent while achieving 100 percent valid citations for surfaced claims, zero out-of-scope source use, and safe abstention whenever controlling authority is absent or conflicting. User comprehension must improve against original-only presentation without increasing incorrect action on deadlines or rights.

### Allowed and prohibited data

**Allowed:** permission-filtered, approved and versioned agreements, notices, policies, legislation or official guidance; jurisdiction, authority, effective date, language, document type, and the minimum user question needed for the task.

**Prohibited:** unauthorized legal files, another household/provider's documents, unrelated application/payment/support data, Makana reflections, fLOKr activity, Day One data outside a valid share, confidential questions in logs, or general web sources presented as controlling authority.

### Decision impact and risk tier

R3 because people may rely on explanations for rights, duties, deadlines, or appeals. The original source controls. The capability must never impersonate counsel, a tribunal, a provider decision-maker, or an elected board.

### Deterministic or rules-based alternative

Jurisdiction/date/authority filters, full-text search, curated FAQs, extractive passage display, deterministic deadline calculators with named calendar rules, document comparison, and a human legal or housing support route.

### Model or technique candidates

Permission-filtered retrieval, extractive summarization, constrained plain-language rewriting, claim-to-source alignment, and contradiction detection. Start with PostgreSQL full text and trigram search; consider pgvector only if semantic retrieval beats the lexical baseline without weakening permissions or source precision.

### Framework and deployment requirements

Use the provider-neutral gateway and approved-source collections. Retrieval filters execute before model input. Output is schema-constrained to claims, citations, uncertainty, jurisdiction, effective date, and next step. No custom training or deep-learning framework is required. A model outage falls back to source search and human help.

### Source grounding and provenance

Every claim links to an exact approved source passage, immutable version, authority, jurisdiction, publication/effective date, and retrieval timestamp. A response with an unsupported material claim is invalid. Source precedence and conflicts are shown rather than resolved by the model.

### Confidence and abstention behaviour

Abstain when no authoritative source is available, permission is missing, sources conflict, jurisdiction or date is unknown, a deadline cannot be deterministically calculated, or the question requires individualized legal judgment. Say what is missing and offer the original sources and qualified next step.

### Human review and correction path

Users can open sources, report a misleading claim, and request a qualified human. Consequential notices and reusable published explanations require legal or policy-owner review. Corrections version the explanation and invalidate affected cached answers.

### Offline, privacy-preserving, and human-service fallback

Keep original documents, approved summaries, printable rights information, phone/in-person support, and legal-clinic referral available. Cache only approved public or user-authorized material under an explicit encrypted design; never require Lexi to access a deadline or original notice.

### Evaluation dataset and metrics

Use synthetic scenarios and an expert-authored gold set of approved public sources spanning jurisdiction, authority, date, conflicts, superseded rules, missing evidence, deadlines, and unsupported questions. Measure citation precision/recall, claim faithfulness, jurisdiction/date accuracy, deadline accuracy, reading level, task comprehension, abstention precision/recall, human escalation appropriateness, latency, and cost.

### Fairness, language, accessibility, privacy, and permission-leakage tests

Measure quality across every supported language, plain-language level, screen-reader presentation, cognitive-accessibility format, and source type. Test household/provider canaries, expired Max Pass, redacted agreements, source revocation, malicious instructions in retrieved text, and citations that point outside the authorized corpus. Attack success and cross-scope leakage must be zero.

### Monitoring, rollback, and retirement criteria

Monitor citation failures, stale sources, abstention, correction reports, escalation, comprehension, language disparity, latency, and cost. Disable generation and return to extractive search on any fabricated source, wrong jurisdiction/effective date, leakage, or unsafe deadline error. Retire if it does not improve comprehension or find-source time over curated search and human support.

## 6. Capability 3 — Multilingual and accessible communication

**Priority:** 3  
**Risk:** R1 for convenience content; R3 for consequential notices, agreements, rights, safety, money, or deadlines  
**Authority:** draft translation or reformatting only

### User and workflow problem

Residents and applicants need information in a language and format they can use. Provider workers need help preparing translations, plain-language versions, captions, transcripts, structured headings, and accessible alternatives without losing the original meaning.

### Affected roles

Visitors, applicants, residents, household members, Twins within scope, resident leaders, provider/repair workers, support partners, and auditors may need translated or reformatted content. Qualified translators, interpreters, content owners, and accessibility specialists own consequential review.

### Current non-AI process and baseline

Human translation, approved terminology glossaries, plain-language templates, accessible document templates, deterministic format conversion, captions/transcripts from supplied scripts, and professional interpretation. The original text is always preserved.

### Expected benefit and measurable success criterion

Reduce preparation time for draft non-consequential communications by at least 30 percent, while professional review finds no material meaning change in consequential content. Supported-language task comprehension and completion should be no worse than the approved source-language version, with no systematic quality gap above the threshold set by the accessibility and language owners.

### Allowed and prohibited data

**Allowed:** the minimum original content, approved glossary, target language, user-selected format/accessibility preference, source version, and jurisdiction when needed.

**Prohibited:** inferred immigration status, ethnicity, disability, literacy, diagnosis, or protected traits; unrelated profiles; private source material outside the recipient's permission; resident content reused for training; voice identity or emotion analysis.

### Decision impact and risk tier

Consequential content is R3 because a mistranslated amount, date, right, safety instruction, or obligation can cause harm. Machine assistance cannot satisfy a legal or policy requirement for qualified translation by itself.

### Deterministic or rules-based alternative

Approved human translations, terminology memory, content templates, plain-language checklists, deterministic heading/list/table conversions, manual captions, large print, HTML, tagged PDF, audio by a human reader, phone interpretation, and in-person support.

### Model or technique candidates

Pretrained machine translation, constrained terminology injection, automatic speech recognition for draft transcripts, text simplification, and structured reformatting. Use translation memory and glossary checks before custom models.

### Framework and deployment requirements

Use adapters that preserve source/target segments and prohibit provider training. Consequential documents remain in the document worker and review workflow. No custom training framework is needed initially. Any later custom NLP research defaults to PyTorch and stays outside request handling; TensorFlow needs an ADR.

### Source grounding and provenance

Store original text, source version, target language/locale, glossary version, segment alignment, adapter/model version, machine-assisted label, reviewer, and review date. Never overwrite the original or present a machine draft as an official translation.

### Confidence and abstention behaviour

Abstain or require human translation for unsupported languages, low-quality audio, ambiguous terminology, damaged source text, legal nuance without an approved glossary, or content where segment alignment cannot be preserved. Do not use a single generic confidence score to imply fidelity.

### Human review and correction path

Recipients can switch to the original, report a problem, or request an interpreter/accessible format. A qualified translator and the content owner review every consequential notice. Accessibility specialists review structural transformations. Corrections update the terminology memory only through an approved process.

### Offline, privacy-preserving, and human-service fallback

Provide print, phone, interpreter, in-person, large-text, accessible HTML, captioned, transcript, and human-read routes. Pre-approved static translations can be available offline. Declining machine assistance must not delay or lower service priority.

### Evaluation dataset and metrics

Use expert-translated synthetic and approved public content covering housing costs, dates, rights, safety, accessibility, tone, idioms, low-quality audio, tables, and forms. Measure expert adequacy, terminology accuracy, number/date/currency preservation, omission/addition rate, segment alignment, reading level, caption/transcript word error rate, task comprehension, correction time, and escalation rate.

### Fairness, language, accessibility, privacy, and permission-leakage tests

Test every claimed language rather than extrapolating from major languages; include dialect and literacy variation chosen with paid community reviewers. Test screen readers, reflow, headings, tables, captions, transcripts, large text, cognitive clarity, and language-switch persistence. Use cross-household documents, malicious source text, hidden instructions, and expired permissions to prove isolation and prompt-injection resistance.

### Monitoring, rollback, and retirement criteria

Monitor corrections by language/content type, material-error incidents, unsupported-language abstentions, human review time, comprehension, accessibility defects, leakage, latency, and cost. Disable a language/content pairing if material accuracy or access parity falls below its gate. Retire an adapter when qualified review shows persistent regression or no time benefit over human-first work.

## 7. Capability 4 — Fix intake and routing

**Priority:** 4  
**Risk:** R2 for category and routing; R3 for health, safety, access, accommodation, or emergency content  
**Authority:** suggest category, questions, destination, and parts only; never lower urgency or close a Fix

### User and workflow problem

Residents report problems through text, photo, voice, phone, or assisted support. Provider workers must understand the issue, ask the right follow-up questions, route it to a qualified team, and prepare likely parts without forcing residents to know a maintenance taxonomy.

### Affected roles

Residents and authorized household members submit or correct reports; provider workers perform triage; repair workers receive only assigned work-order details; support partners may assist under a purpose-limited grant; facilities, accessibility, and emergency owners govern taxonomies and rules.

### Current non-AI process and baseline

Resident-selected emergency/health/safety/access flags, a visible deterministic emergency decision tree, provider repair taxonomy, required-question rules, asset lookup, keyword matching, and human triage. Phone and assisted reports enter the same queue.

### Expected benefit and measurable success criterion

Reduce median administrative triage time by 25 percent and unnecessary handoffs by 20 percent without increasing emergency false negatives, access/accommodation omissions, or service disparities. Resident-declared urgency can only be preserved or escalated by automation, never reduced.

### Allowed and prohibited data

**Allowed:** the selected Fix report, transcribed speech, purpose-limited photos, Place/Setup asset, resident-declared urgency and accommodation, chosen entry window, approved manuals, repair taxonomy, inventory, and current team capability.

**Prohibited:** payment history, complaint count, staff sentiment, “difficult resident” labels, social/Day One/fLOKr/Makana data, protected traits or proxies, unrelated household records, inferred credibility, emotion/voice identity, or historical data used to punish a resident.

### Decision impact and risk tier

Routing can affect response time, making it R2/R3. Emergency detection and statutory/service deadlines remain deterministic and visible. A model cannot downgrade, defer, reject, close, or decide liability or habitability.

### Deterministic or rules-based alternative

Emergency rules, keyword and phrase lists, resident-chosen category, asset-specific form branching, required questions, skills/coverage routing, parts lists from manuals, and human dispatcher review. This path stays available for every report.

### Model or technique candidates

Automatic speech recognition, TF-IDF plus logistic regression or another interpretable scikit-learn classifier, multilabel taxonomy classification, extractive report summary, retrieval over approved repair manuals, and image assistance only under Capability 6. Consider a pretrained transformer only after the simpler baseline fails a measured need.

### Framework and deployment requirements

Run suggestions asynchronously or within a strict timeout; failure cannot block submission. Keep the emergency rules outside the model. Use versioned taxonomies and routing adapters. Start with rules and scikit-learn; PyTorch is only a later custom NLP research candidate. Do not add TensorFlow without an ADR.

### Source grounding and provenance

Every suggested category/question/part cites the resident-report span, resident-selected flag, asset/manual passage, taxonomy rule, and version that supports it. The saved Fix retains the resident's original words or approved transcript and distinguishes resident statements from worker/model summaries.

### Confidence and abstention behaviour

Abstain on unclear, mixed, unsupported-language, contradictory, or potentially emergency reports and route them to human triage without loss of priority. If any deterministic emergency phrase or resident emergency flag is present, show the emergency route and do not rely on model confidence.

### Human review and correction path

Residents confirm/edit transcripts and can correct the category. A provider coordinator accepts or changes routing with a reason. Repair workers can report an incorrect suggestion but cannot relabel a resident as less credible. Residents retain reopen and escalation rights.

### Offline, privacy-preserving, and human-service fallback

Text draft, phone, paper, front-desk, and assisted reporting remain equal paths. Reports can be saved safely offline where approved and submitted to deterministic triage. Model failure or refusal never prevents an emergency route, acknowledgement, or human dispatch.

### Evaluation dataset and metrics

Use synthetic reports and expert-authored paraphrases spanning channels, languages, building systems, ambiguous cases, multiple simultaneous issues, emergency edge cases, accommodation needs, and adversarial language. Measure multilabel precision/recall/F1, emergency false-negative rate, unsafe downgrade count, routing top-k accuracy, question relevance, parts precision, transcript WER, triage time, handoffs, reopen rate, latency, and cost.

### Fairness, language, accessibility, privacy, and permission-leakage tests

Hold issue facts constant while varying dialect, grammar, verbosity, accent in consented synthetic audio, assistive-communication style, emotional tone, and channel; routing and urgency must remain equivalent. Test screen-reader/keyboard correction, transcript alternatives, cross-household work orders, contractor scopes, malicious instructions in report text/photos, and cached/manual retrieval leakage.

### Monitoring, rollback, and retirement criteria

Monitor unsafe misses, overrides, handoffs, reopen/escalation, outcome time by channel/language/access need, correction burden, latency, and leakage. Disable model routing immediately on any urgency downgrade path, material disparity, or permission incident. Retire if it does not improve total resolution workflow over rules plus human triage.

## 8. Capability 5 — Listing integrity and structured-data quality

**Priority:** 5  
**Risk:** R1 for warnings; R2 if a warning can delay or suppress publication  
**Authority:** flag and explain; never invent, silently repair, rank, or auto-unpublish

### User and workflow problem

Provider workers and auditors need to find missing fields, impossible values, duplicates, stale claims, contradictory versions, suspect arithmetic, weak source provenance, and evidence that merits a separate scam review before a Place reaches Flow.

### Affected roles

Provider workers assigned to Place publication or cost/accessibility review act on warnings. Auditors review evidence and controls. Visitors and applicants are indirectly affected by the quality of approved public facts. Platform operators may monitor job health but not browse listing-source content without scoped authority.

### Current non-AI process and baseline

Database constraints, required fields, enums, ranges, units, date/effective-period checks, version comparison, address normalization, exact/fuzzy hashes, Total Damage arithmetic, source-freshness policies, and a human pre-publication checklist.

### Expected benefit and measurable success criterion

Catch at least 95 percent of seeded critical integrity defects with no silent correction, keep false blocking warnings below 2 percent, and reduce pre-publication review time by 20 percent. Every public Place must still receive qualified human approval.

### Allowed and prohibited data

**Allowed:** provider-approved public Place fields, source dates/versions/hashes, accessibility facts, Total Damage components, published listing history, and public provider/building identifiers.

**Prohibited:** applicant/resident data, browsing or Not It history, engagement/popularity, protected traits, provider payments or commercial priority, private support or social data, and unverified external claims.

### Decision impact and risk tier

Warnings are R1, but suppression or publication delay is R2 and must follow a deterministic policy with a human override/reason. Integrity scores are record-level diagnostics, never provider or resident worth scores.

### Deterministic or rules-based alternative

SQL constraints, JSON Schema, comparison rules, freshness windows, hash and trigram duplicate checks, address/unit normalization, arithmetic reconciliation, and mandatory review checklists.

### Model or technique candidates

Robust statistics, clustering for duplicate candidates, isolation forests only after sufficient representative data, record linkage, contradiction classification, and source-date extraction from Capability 1. Rules remain preferred for known invalid states.

### Framework and deployment requirements

Run deterministic checks in domain validation and heavier comparisons in workers. PostgreSQL and scikit-learn are sufficient candidates; no deep-learning framework or vector database is justified. Keep a versioned rule/model contract and explain each flag.

### Source grounding and provenance

Each warning identifies the field, record versions, rule or model version, source documents, dates, compared values, and why the value is missing, impossible, stale, duplicate, or contradictory.

### Confidence and abstention behaviour

Unknown or rare values produce review warnings, not automatic invalidation. Statistical outliers are labelled “unusual; check source,” never “fraud.” The system abstains when it lacks a comparable cohort or reliable source date.

### Human review and correction path

An assigned provider worker can correct the record, attach a better source, confirm an unusual valid value with a reason, or escalate. A trust/safety owner handles suspected scams through a separate evidence and due-process workflow; no model labels a provider or person as fraudulent.

### Offline, privacy-preserving, and human-service fallback

The manual Place checklist and editor remain complete without statistical services. Checks use public/provider record data within scope and can run in the private worker. Publication does not depend on an external model.

### Evaluation dataset and metrics

Use synthetic Place versions with seeded omissions, unit errors, impossible dates, duplicate addresses/units, stale sources, arithmetic errors, contradictory accessibility facts, and legitimate unusual values. Measure defect precision/recall by type, false block/warning rate, duplicate pair precision/recall, review time, override rate, and downstream correction rate.

### Fairness, language, accessibility, privacy, and permission-leakage tests

Compare false-warning rates across provider size, housing/tenure type, building age, supported-language source, accessibility-field type, and neighbourhood without using those characteristics to rank. Ensure warnings and comparisons are screen-reader/keyboard accessible. Test cross-provider candidate generation, cache isolation, adversarial text, and hidden instructions; no source outside the authorized provider scope may influence a flag.

### Monitoring, rollback, and retirement criteria

Monitor defect yield, false warnings/blocks, overrides, repeated defects, source age, review time, disparities, and leakage. Roll back statistical detectors independently to rules-only. Retire any detector that cannot explain flags, creates persistent cohort disparities, or does not add net defect recall after review cost.

## 9. Capability 6 — Media and repair-photo assistance

**Priority:** 6  
**Risk:** R1 for quality/alt-text drafts; R2 for redaction, issue categorization, or condition comparison  
**Authority:** suggest only; images never independently decide habitability, urgency, liability, eligibility, or credibility

### User and workflow problem

Provider workers and residents need help checking whether a listing or repair photo is usable, detecting duplicates, documenting source/freshness, drafting alternative text, identifying accidental private content, and comparing visible condition over time.

### Affected roles

Residents and authorized household members submit and correct repair media; provider workers publish listing media; repair workers see only task-scoped media; accessibility reviewers approve meaningful alternative text; privacy/trust-and-safety owners govern redaction and incident response; auditors inspect approved evidence.

### Current non-AI process and baseline

Upload guidance, manual preview, metadata inspection/stripping, exact and perceptual hashes, blur/exposure/resolution thresholds, human-written alt text, manual redaction, dated source attestations, and side-by-side human comparison.

### Expected benefit and measurable success criterion

Reduce unusable-media rework and alt-text drafting time by at least 25 percent, detect at least 95 percent of seeded private regions before approved publication, and produce zero unreviewed redactions or factual condition decisions. A missed privacy region is treated as a security/privacy incident.

### Allowed and prohibited data

**Allowed:** a purpose-specific listing image or resident-submitted repair photo; its authorized Place/Fix reference; capture/source date; stripped technical metadata; approved issue taxonomy; and prior condition image only when the same purpose and scope permit comparison.

**Prohibited:** face embeddings or identity matching; emotion, gait, voice, attractiveness, ethnicity, disability, or protected-trait inference; private-room occupancy inference; unrelated household photos; hidden location metadata after processing; surveillance reuse; generated replacement photos; resident credibility scoring.

### Decision impact and risk tier

Quality and alt-text drafting are R1. Redaction and repair categorization are R2 because misses or misclassification can expose people or change worker attention. The original remains available only to authorized reviewers; the person can remove or replace it.

### Deterministic or rules-based alternative

Resolution/blur/exposure thresholds, EXIF stripping, exact/perceptual hashing, OCR to locate document-like text, manual crop/redaction, human alt text, and side-by-side timestamped review.

### Model or technique candidates

Pretrained object/region detection for faces, documents, and licence plates solely for redaction suggestions; visible-issue multilabel categorization; image embeddings for duplicate candidates; grounded alt-text drafting; and registered-image change highlighting. Do not identify people or infer unseen conditions.

### Framework and deployment requirements

Process quarantined images in a private worker with strict pixel/page limits and no provider training. Start with image libraries, hashes, OCR, and thresholds. If a validated use case needs a custom vision model, PyTorch is the default research framework; TensorFlow requires a documented edge/pipeline reason. Portable edge inference requires parity, privacy, and rollback tests.

### Source grounding and provenance

Store original image hash, derivative hash, source/capture date, user/provider attestation, operation, model/rules version, suggested regions or labels, reviewer decision, and redaction manifest. Alt text and condition observations point to visible regions and state uncertainty.

### Confidence and abstention behaviour

Abstain on low-quality, unsupported, heavily occluded, or context-dependent images. “Not detected” never means absent. Suspected private regions default to review; condition comparison says only what visibly changed and never assigns cause or liability.

### Human review and correction path

The uploader previews and may replace an image. An authorized worker accepts/edits alt text, confirms redactions, and reviews category/change suggestions. Residents can challenge an inaccurate repair-photo description without losing the original report or queue position.

### Offline, privacy-preserving, and human-service fallback

Manual upload, description, redaction, phone reporting, and no-photo repair routes remain available. Local/private processing is preferred for redaction. If the service fails, the image stays quarantined or the report proceeds without image analysis according to human policy.

### Evaluation dataset and metrics

Use licensed or fully synthetic scenes containing varied lighting, devices, surfaces, damage types, faces, documents, licence plates, reflections, assistive equipment, and no-issue controls. Measure quality-check precision/recall, duplicate retrieval precision, redaction-region recall/precision, false reassurance rate, issue-label F1, alt-text factuality/coverage, change-localization accuracy, review time, and privacy incidents.

### Fairness, language, accessibility, privacy, and permission-leakage tests

Test across lighting, skin tones only for equal redaction recall without identity inference, home styles, assistive equipment, camera quality, image orientation, and supported alt-text languages. Disabled reviewers test alt-text editing and non-visual region descriptions. Cross-household image IDs, thumbnails, caches, signed URLs, EXIF, malicious overlaid text, QR codes, and steganographic/instruction-like content must not leak or alter capability scope.

### Monitoring, rollback, and retirement criteria

Monitor redaction misses, false redactions, user removals, alt-text corrections, category overrides, duplicates, latency, cost, and slice disparities. Immediately disable automated derivatives on a privacy leak or surveillance-like inference. Revert to manual review if redaction recall or factual alt-text falls below its gate. Retire models that cannot be safely constrained to visible, purpose-specific assistance.

## 10. Capability 7 — Operational demand, parts, queue, and maintenance forecasting

**Priority:** 7; only after enough lawful data exists  
**Risk:** R2  
**Authority:** building/service planning only; no resident-level priority, worth, or enforcement prediction

### User and workflow problem

Provider workers and facilities teams need to plan staffing, parts, preventive maintenance, and realistic queue estimates without relying entirely on intuition or reacting after failure.

### Affected roles

Provider operations, facilities planners, repair coordinators, procurement workers, and auditors use aggregate forecasts. Residents receive only reviewed service estimates and remain entitled to deterministic urgency, status, escalation, and repair rights.

### Current non-AI process and baseline

SQL counts, backlog aging, service-level timers, asset age/maintenance schedules, reorder points, moving averages, seasonal profiles, staff calendars, and human facilities planning.

### Expected benefit and measurable success criterion

Improve forecast error by at least 15 percent over the seasonal-naive baseline, reduce stockouts and avoidable emergency work without increasing overstock or service disparities, and keep published wait estimates within an approved calibration band. Benefit is measured at building or service level.

### Allowed and prohibited data

**Allowed:** aggregated/de-identified work-order categories and timestamps, assets, parts usage, planned maintenance, building characteristics, provider staffing/capacity, approved public weather/calendar data, and service outcomes.

**Prohibited:** resident identity, complaint sentiment, payment/social/Day One/Makana data, protected traits in prediction features, individual “likely to complain/default/cause damage” scores, raw unit behaviour, or forecasts used to deny or delay service.

### Decision impact and risk tier

R2 because forecasts may influence resource allocation and wait messages. Deterministic urgency and legal/service rules override forecasts. Forecasts cannot remove a work order, lower its priority, or justify understaffing.

### Deterministic or rules-based alternative

Seasonal naive, moving average, exponential smoothing, asset schedules, reorder thresholds, queue arithmetic, and scenario ranges reviewed by facilities staff.

### Model or technique candidates

Interpretable time-series regression, count models, survival/time-to-completion analysis, quantile forecasts, and scikit-learn gradient boosting after sufficient history. Deep learning is not justified for pilot-scale data.

### Framework and deployment requirements

Train offline on versioned snapshots outside request handling. SQL, standard statistics, and scikit-learn come first. Publish prediction intervals, not false precision. Store model cards, data windows, feature lists, and backtests. No resident-level online features.

### Source grounding and provenance

Each forecast identifies aggregation level, data window, included buildings/categories, excluded periods, feature/rule versions, model version, prediction interval, and generation time. Queue estimates cite current backlog/capacity and deterministic priority rules.

### Confidence and abstention behaviour

Abstain when sample size, workflow stability, data completeness, distribution shift, or interval width fails the approved threshold. Use the human schedule or conservative range instead. Never collapse uncertainty into an exact resident promise.

### Human review and correction path

Facilities and operations owners approve procurement or schedule changes. Workers can annotate disruptions and data errors. Residents receive clear estimates and updated reasons, not model internals or blame.

### Offline, privacy-preserving, and human-service fallback

Run aggregate forecasting in the private analytics environment with small-cell suppression. Manual schedules, reorder rules, and provider-staffed updates continue during model or network failure.

### Evaluation dataset and metrics

Begin with synthetic histories and later use only approved, documented, representative operational snapshots. Use rolling time-based backtests, never random leakage across time. Measure MAE/WAPE or appropriate count error, interval coverage, calibration, stockout/overstock, queue-estimate error, emergency-work rate, service-level outcomes, stability, latency, and planning time saved.

### Fairness, language, accessibility, privacy, and permission-leakage tests

Compare service outcomes and forecast error by building, service channel, supported language, and accessibility/accommodation pathway using lawfully governed audit attributes, not prediction features. Wait estimates must be accessible and translated consistently. Test small-cell suppression, analyst scopes, provider isolation, snapshot exports, and poisoned/malicious notes that must never become model instructions.

### Monitoring, rollback, and retirement criteria

Monitor forecast drift/error, interval coverage, stockouts, overtime, backlog, service disparities, and override frequency. Roll back to seasonal/rule baselines when error or disparity exceeds limits. Retire if operations cannot demonstrate net service benefit after accounting for maintenance and data-governance cost.

## 11. Capability 8 — Building anomaly detection and shared-energy or maintenance scheduling

**Priority:** 8; roadmap Phase 6 or later  
**Risk:** R2; R3 when a signal relates to health or safety  
**Authority:** alert and schedule suggestion only; local safety controls and qualified workers remain authoritative

### User and workflow problem

Facilities teams and residents may benefit from earlier leak, equipment, indoor-air, or energy anomaly alerts and from better shared-energy and maintenance schedules. Raw telemetry can also reveal intimate household patterns.

### Affected roles

Residents see device purpose and approved alerts; provider facilities workers and repair workers inspect assigned equipment; building-systems, privacy, accessibility, security, and evaluation leads govern the program; auditors review approved controls and outcomes. Devices are technical identities, not user roles.

### Current non-AI process and baseline

Local device alarms, manufacturer limits, deterministic thresholds/hysteresis, equipment schedules, rate/comfort constraints, preventive maintenance, aggregate dashboards, and human inspection. The recommended first use remains leak detection in approved locations.

### Expected benefit and measurable success criterion

Reduce missed actionable faults and avoidable equipment downtime or energy cost while keeping false alerts and maintenance load within the Phase 6 gate. Internet loss must not stop a local alarm; no model output may affect housing decisions.

### Allowed and prohibited data

**Allowed:** normalized leak/fault/air-threshold events, equipment state, asset history, aggregate building energy, approved common-area or resident-consented sensor values, weather/tariff data, comfort and safety constraints.

**Prohibited:** indoor cameras/microphones, audio/video, face/voice/gait/emotion, private-room occupancy, raw motion history, high-resolution unit energy by default, identity-linked behaviour, eligibility/pricing/discipline/eviction use, or remote punishment lockout.

### Decision impact and risk tier

Operational anomalies are R2; health/safety alerts are R3 and must use deterministic local thresholds and human response procedures. Optimization cannot override comfort, accessibility, consent, equipment safety, or manual control.

### Deterministic or rules-based alternative

Local thresholds, rate-of-change rules, control charts, hysteresis, manufacturer alarms, schedule optimization under explicit constraints, manual inspection, and resident reporting.

### Model or technique candidates

Seasonal residual detection, robust z-scores, change-point detection, isolation forests, equipment-specific predictive maintenance, and constrained optimization. Prefer edge or aggregate processing. No computer vision or occupancy inference.

### Framework and deployment requirements

Start with local gateway rules and normalized events. PostgreSQL/statistics/scikit-learn are sufficient for research. Training stays offline; safe commands require deterministic policy, actor, purpose, scope, expiry, acknowledgement, audit, and manual fallback. Custom edge models need a separate privacy/security/ADR review and parity-tested portable format.

### Source grounding and provenance

Each alert records gateway/device/asset identity, sensor purpose, time window, baseline/rule/model version, contributing normalized signals, threshold/interval, consent profile, and acknowledgement. Do not centralize prohibited raw telemetry merely for explainability.

### Confidence and abstention behaviour

Abstain when sensors are uncalibrated, offline, missing, newly installed, out of distribution, or disagree. Label alerts as “inspect” rather than diagnosing cause. Local deterministic alarms continue regardless of model state.

### Human review and correction path

Facilities staff inspect and confirm faults before consequential action. Residents can report incorrect alerts, see what a device senses, and use manual controls/fallbacks. Any access to a unit follows the normal scoped consent and work-order process.

### Offline, privacy-preserving, and human-service fallback

Local alarms and controls operate without internet. The gateway minimizes and buffers only approved events. Manual inspection, phone reporting, physical controls, and staffed emergency routes remain available.

### Evaluation dataset and metrics

Use a simulator and synthetic faults first, followed only by a privacy-approved shadow trial. Measure event-level precision/recall, time-to-detect, false alarms per asset-day, missed safety event count, downtime, maintenance workload, energy/cost/emissions change, comfort-constraint violations, edge availability, and bytes/data granularity sent to cloud.

### Fairness, language, accessibility, privacy, and permission-leakage tests

Test old/new equipment, accessible controls, different building types, sensor failure, outages, and resident consent states. Explanations/alerts must work in supported languages and accessible channels. Verify that unit/provider events, device certificates, caches, and analytics cannot cross scopes; attempts to infer occupancy or behaviour from event timing must be blocked and audited.

### Monitoring, rollback, and retirement criteria

Monitor false/missed alerts, sensor health, edge backlog, manual overrides, maintenance burden, comfort/accessibility impact, energy outcomes, cloud data volume, and incidents. Roll back to local deterministic rules on drift, privacy expansion, unsafe scheduling, or excessive alerts. Retire if measurable building/resident benefit does not exceed operating and privacy cost.

## 12. Capability 9 — Fairness and service monitoring

**Priority:** 9; metric design starts early, real analysis only under approved governance  
**Risk:** R2/R3 because sensitive audit data and findings can affect policy  
**Authority:** audit systems and improve service; never score or target residents

### User and workflow problem

Resident advisors, auditors, providers, and platform owners need to know whether service time, access, recommendation quality, translation quality, application burden, or outcomes differ unfairly across groups or channels. Aggregate averages can hide harms.

### Affected roles

Auditors and an independent or arms-length evaluation lead run analyses; paid resident advisors interpret impact; privacy, human-rights, legal, accessibility, product, and provider owners approve data and remediation. Frontline workers do not receive individual fairness scores, and residents are never scored.

### Current non-AI process and baseline

Predefined KPI definitions, SQL cohort comparisons, service-level reports, complaint/review records, qualitative resident research, small-cell suppression, confidence intervals, and independent human audit.

### Expected benefit and measurable success criterion

Detect known seeded disparities in synthetic validation data, produce reproducible metrics from versioned definitions, and shorten investigation time without exposing individuals. Success is remediation and improved parity, not the number of alerts. No fairness output may enter an individual workflow.

### Allowed and prohibited data

**Allowed:** minimum pseudonymized service events/outcomes, channel, supported language, accessibility pathway, building/provider scope, and lawfully collected audit attributes approved by privacy, human-rights, resident, and legal owners.

**Prohibited:** resident-facing or worker-facing risk scores, individual predictions, eligibility/pricing/repair priority/tenure inputs, re-identification, small-cell disclosure, inferred protected traits, unrelated social/payment/wellbeing data, or automated punitive provider/resident actions.

### Decision impact and risk tier

R2/R3 because poor methodology can hide harm or create stigma. Findings trigger investigation and governance review, not automatic decisions. Audit attributes remain segregated from operational decision paths.

### Deterministic or rules-based alternative

Metric definitions, stratified SQL, confidence intervals, control charts, qualitative review, case sampling, and independent audit. These are preferred before machine learning.

### Model or technique candidates

Statistical disparity analysis, regression with uncertainty for confounding investigation, calibration/error comparison, drift/change detection, and privacy-preserving aggregation. Unsupervised pattern discovery is exploratory only and cannot label residents or groups.

### Framework and deployment requirements

Use an access-controlled analytics environment, versioned metric code, reproducible snapshots, small-cell suppression, and export review. SQL/statistics are the default; scikit-learn may support documented analyses. No LLM is required and no fairness data enters online recommendation or allocation features.

### Source grounding and provenance

Every finding records metric definition, question, lawful basis, cohort and exclusion rules, time window, source tables, data-quality limits, suppression, statistical method, uncertainty, analyst, and review outcome.

### Confidence and abstention behaviour

Do not issue a disparity conclusion when sample size, data quality, missingness, selection bias, or uncertainty fails the approved threshold. Report uncertainty and request qualitative review. Absence of evidence is never evidence of fairness.

### Human review and correction path

An approved auditor/evaluation lead reviews findings with paid resident advisors, affected service owners, privacy, accessibility, and human-rights leads. People can challenge data and definitions. Remediation receives an owner, deadline, and repeat measurement; it cannot remove individual appeal rights.

### Offline, privacy-preserving, and human-service fallback

Use pseudonymized batch snapshots, aggregation, access logging, small-cell suppression, and controlled exports. Manual audit, resident interviews, complaints, and case review remain essential; the dashboard is not the truth by itself.

### Evaluation dataset and metrics

Start with synthetic datasets containing known disparities, missingness, Simpson's paradox, sparse groups, channel effects, and measurement error. Later validate on approved pilot data. Measure seeded-disparity detection, false discovery/omission, confidence-interval coverage, reproducibility, data freshness, suppression correctness, remediation closure, and subgroup service outcomes.

### Fairness, language, accessibility, privacy, and permission-leakage tests

Fairness is the purpose but still requires tests: definitions must cover supported languages, assisted/non-app channels, accessibility pathways, and intersecting groups where sample size permits. Dashboards need table/text alternatives, keyboard/screen-reader access, and clear uncertainty. Test analyst scopes, row/download limits, small-cell differencing attacks, provider joins, cached exports, and attempts to move audit attributes into operational APIs.

### Monitoring, rollback, and retirement criteria

Monitor data quality, suppression, access, reproducibility, alert burden, unresolved findings, and whether remediation improves outcomes. Disable a report on leakage, invalid methodology, or stigmatizing use. Retire metrics that are not actionable, are routinely misinterpreted, cannot be collected lawfully, or incentivize gaming rather than resident benefit.

## 13. Capability 10 — Place-fit ranking and Side-by-Side summaries

**Priority:** 10; deterministic pilot baseline  
**Risk:** R2 because discovery visibility can create disparate access even though it is not allocation  
**Authority:** organize Places for one user's stated needs; never allocate housing or rank people

### User and workflow problem

Visitors and applicants need to find Places that fit their explicitly chosen cost, location, availability, tenure, accessibility, transport, household, and living-practice needs and understand meaningful differences without an endless feed.

### Affected roles

Visitors and applicants control preferences and ordering; Twins may help only through a scoped share; provider workers maintain source facts but cannot influence rank; product, accessibility, privacy, and fairness owners audit the discovery system. Allocation workers and allocation data remain outside this capability.

### Current non-AI process and baseline

Explicit filters, user-controlled sort, transparent weighted rules, chronological/list/map views, Side-by-Side tables, and deterministic text templates. Filters override recommendations and every reason is visible.

### Expected benefit and measurable success criterion

Reduce time to a user-identified suitable shortlist without reducing exposure parity for equally eligible Places, hiding material facts, or increasing pressure. Users must be able to reproduce/understand the ordering, reset it, and reach every matching Place through a non-personalized view.

### Allowed and prohibited data

**Allowed:** current user-selected needs, coarse chosen location, public source-dated Place facts, and private Keepers only when the user explicitly invokes them for comparison.

**Prohibited:** protected traits or proxies, inferred vulnerability/income/desirability, application/allocation data, Not It disclosure to providers, engagement/popularity, purchases, fLOKr/Day One/Makana data, provider payments, hidden commercial objectives, or a profile built from anonymous browsing.

### Decision impact and risk tier

R2 because ranking changes visibility. Discovery remains technically and organizationally separate from allocation. A Place's rank cannot influence application selection, and an applicant is never scored.

### Deterministic or rules-based alternative

Filters, user-selected sort, documented weighted matching, hard accessibility/price constraints chosen by the user, chronological ordering, map/list views, and template-based comparison summaries.

### Model or technique candidates

Interpretable learning-to-rank using only explicit preferences and approved Place attributes, constrained diversity/exposure analysis, and source-grounded difference summarization. Do not optimize clicks, applications, provider revenue, or screen time. No LLM is needed for ranking.

### Framework and deployment requirements

Keep the deterministic ranking contract and allocation firewall. PostgreSQL and an interpretable scikit-learn baseline are sufficient if a model is ever justified. Summaries use strict Place fields and source versions. No deep-learning or vector infrastructure during the pilot.

### Source grounding and provenance

Each ranking reason identifies the user's selected need, matched Place field, source/freshness date, rule/model version, and any missing fact. Summaries distinguish known, estimated, optional, missing, and conflicting information and never declare a universal winner.

### Confidence and abstention behaviour

Do not rank on a criterion with missing/stale evidence; show “information missing” and allow neutral sorting. Abstain from a personalized order when preferences conflict or the candidate set is too small. Never infer unstated preferences.

### Human review and correction path

The user can inspect reasons, change/remove preferences, switch to list/chronological/map views, report a fact, and compare directly. Provider workers can correct source facts but cannot buy or override rank. Fairness owners review exposure patterns.

### Offline, privacy-preserving, and human-service fallback

Public browsing, filters, print, phone, kiosk, and assisted search remain available without an account. Preferences can stay local until the user chooses to sync. A recommendation outage returns the deterministic public result set.

### Evaluation dataset and metrics

Use synthetic Place catalogues and user-authored need scenarios, including sparse accessibility facts, tied results, conflicts, and no-good-fit cases. Measure constraint satisfaction, reason correctness, source freshness, shortlist utility from user studies, coverage, exposure parity, missing-data behaviour, summary factuality, task time, and override/reset use—not clicks or screen time.

### Fairness, language, accessibility, privacy, and permission-leakage tests

Use counterfactual scenarios where only a prohibited trait/proxy, language, input method, or account status changes; order and access must remain equivalent. Test accessible filter/reason/compare flows, translated explanations, provider-paid injection attempts, malicious listing text, cross-user preference caches, Not It privacy, and strict separation from application/allocation tables.

### Monitoring, rollback, and retirement criteria

Monitor reason/source errors, missing-data effects, exposure distribution, overrides, resets, complaint/correction rates, disparities, latency, and cost. Roll back to filters and user-controlled sort on unexplained ranking, paid influence, allocation coupling, or disparity. Retire a learned ranker if it does not improve user-identified fit over transparent rules.

## 14. Coverage of proposed capabilities

| Proposed capability | Covered by |
|---|---|
| OCR scanned or digital provider documents | Capability 1 |
| Extract Place and Total Damage candidates with page/span provenance | Capability 1 |
| Flag missing, stale, and conflicting provider facts | Capabilities 1 and 5 |
| Source-grounded agreements, notices, rights, policies, and deadlines | Capability 2 |
| Translation and accessible reformatting | Capability 3 |
| Repair text or speech classification, routing, questions, and parts | Capability 4 |
| Missing/impossible/duplicate/stale/contradictory listing detection | Capability 5 |
| Duplicate and possible-scam evidence for human trust-and-safety review | Capability 5 |
| Image quality, date/source/provenance, and duplicate images | Capability 6 |
| Alternative-text drafts and accidental-private-content redaction | Capability 6 |
| Repair-photo quality and visible issue categorization | Capability 6 |
| Condition comparison with human review | Capability 6 |
| Repair demand, parts, queue-time, and maintenance forecasting | Capability 7 |
| Equipment, leak, indoor-air, and energy anomaly detection | Capability 8 |
| Shared-energy and maintenance-schedule optimization | Capability 8 |
| Service-time, access, recommendation, translation, and outcome disparity monitoring | Capability 9 |
| User-selected Place recommendations and difference summaries | Capability 10 |

Explicitly prohibited computer-vision uses—facial recognition or matching, emotion or gait analysis, protected-trait inference, private-room occupancy inference, attractiveness or roommate ranking, and surveillance-based discipline—are not opportunities and have no research path in PullUp.

## 15. First-proof delivery plan

The Provider Document Intake Assistant proof can proceed without a partner or model credential because it uses synthetic data and does not publish.

### Slice A — deterministic reference

- Finalize the versioned candidate schema and the material-field allowlist.
- Create synthetic provider PDFs/images and gold field/source annotations.
- Implement quarantine-compatible fixture loading, digital text extraction, OCR, deterministic parsing, validation, conflicts, and abstention.
- Implement the deterministic and mock adapters plus contract tests.
- Produce the baseline evaluation report.

### Slice B — human review

- Build the accessible candidate/source comparison workflow.
- Support approve, edit, reject, unable-to-verify, conflict resolution, and reason capture.
- Keep publication outside the proof; export only a reviewed synthetic candidate record.
- Measure manual-only versus assisted review time and correction rate.

### Slice C — safety evaluation

- Run prompt-injection, malformed-file, permission-leakage, logging, cache-isolation, and outage tests.
- Run language, scan-quality, provider-template, accessibility-field, keyboard, screen-reader, zoom, and reflow slices.
- Confirm zero automatic publication, zero fabricated provenance, zero false verification, and zero cross-scope output.

### Slice D — optional model comparison

Only after A through C pass, connect one approved adapter in an isolated evaluation environment. Compare it against the frozen deterministic baseline on the same held-out set. If credentials or approvals are absent, stop with the contract, deterministic baseline, mock adapter, fixtures, and evaluation harness; do not fake a live-model result.

Promotion beyond a synthetic proof requires all roadmap T0 conditions plus approved source documents, a data-protection assessment, named review owners, vendor/residency approval, retention policy, threat model, supported-language scope, evaluation thresholds, incident response, and a staffed manual fallback.

## 16. Required evidence for any capability review

A proposal is incomplete unless it supplies:

- named problem, roles, owner, scope, risk tier, and prohibited use;
- deterministic baseline and measured baseline performance;
- allowed/prohibited field inventory, lawful authority, retention, residency, and training policy;
- versioned adapter, input/output schema, source/provenance rules, and failure contract;
- synthetic or lawfully approved evaluation set with known limitations;
- quality, abstention, correction, fairness, language, accessibility, leakage, injection, latency, and cost results;
- human review, correction, appeal where consequential, and non-AI/human-service fallback;
- feature flag, monitoring dashboard, incident owner, rollback rehearsal, and retirement rule;
- proof that allocation, charges, locks, payments, legal actions, repair urgency, rights, and tenure stay under deterministic policy and authorized human control.

If the evidence is missing, the capability remains a proposal. If the deterministic baseline solves the workflow well enough, PullUp should keep the baseline.
