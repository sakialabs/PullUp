import assert from "node:assert/strict";
import test from "node:test";

import { syntheticPlace } from "../lib/places/fixture";
import { formatMoney, formatTotalDamage } from "../lib/places/format";
import { publicPlaceSchema, publicPlacesEnvelopeSchema } from "../lib/places/schema";

test("synthetic Place satisfies the complete public contract", () => {
  const parsed = publicPlaceSchema.parse(syntheticPlace);

  assert.equal(parsed.publicationStatus, "synthetic-review-fixture");
  assert.equal(parsed.provider.identityStatus, "synthetic-not-verified");
  assert.equal(parsed.totalDamage.currency, "CAD");
  assert.equal(parsed.totalDamage.totals.requiredMonthlyMinMinor, 117_900);
  assert.equal(parsed.totalDamage.totals.requiredMonthlyMaxMinor, 120_700);
  assert.equal(parsed.totalDamage.totals.moveInRefundableMinor, 55_000);
  assert.ok(parsed.accessibilityFacts.some((fact) => fact.status === "not-available"));
  assert.ok(parsed.accessibilityFacts.some((fact) => fact.status === "needs-review"));
  assert.ok(parsed.sources.every((source) => source.status === "synthetic"));
});

test("calculated Total Damage cannot drift away from line items", () => {
  const invalid = structuredClone(syntheticPlace);
  invalid.totalDamage.totals.requiredMonthlyMinMinor += 1;

  const result = publicPlaceSchema.safeParse(invalid);
  assert.equal(result.success, false);
  assert.match(JSON.stringify(result.error?.issues), /must equal the sum of its cost items/i);
});

test("unknown provenance references are rejected", () => {
  const invalid = structuredClone(syntheticPlace);
  invalid.accessibilityFacts[0].sourceId = "source-that-does-not-exist";

  const result = publicPlaceSchema.safeParse(invalid);
  assert.equal(result.success, false);
  assert.match(JSON.stringify(result.error?.issues), /unknown source reference/i);
});

test("discovery reasons are explicit and contain no allocation decision", () => {
  assert.equal(
    syntheticPlace.discovery.matchedCount,
    syntheticPlace.discovery.criteria.filter((criterion) => criterion.matched).length,
  );
  assert.match(syntheticPlace.discovery.allocationFirewall, /never affect eligibility/i);

  const discoveryJson = JSON.stringify(syntheticPlace.discovery).toLowerCase();
  assert.doesNotMatch(discoveryJson, /applicant_score|tenant_score|offer_rank|allocation_decision/);
});

test("collection and money formatting remain stable", () => {
  const envelope = publicPlacesEnvelopeSchema.parse({
    schemaVersion: "place-collection.v1",
    dataStatus: "synthetic",
    places: [syntheticPlace],
  });

  assert.equal(envelope.places.length, 1);
  assert.equal(formatTotalDamage(syntheticPlace.totalDamage), "$1,179–$1,207");
  assert.equal(formatMoney(55_000, "CAD"), "$550");
});
