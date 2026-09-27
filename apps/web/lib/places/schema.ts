import { z } from "zod";

const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Use an ISO date (YYYY-MM-DD)");
const stableId = z.string().regex(/^[a-z0-9][a-z0-9-]*$/, "Use a stable kebab-case identifier");
const currency = z.string().regex(/^[A-Z]{3}$/, "Use an ISO 4217 currency code");

export const sourceSchema = z.object({
  id: stableId,
  title: z.string().min(1),
  kind: z.enum([
    "provider-record",
    "cost-sheet",
    "accessibility-walkthrough",
    "building-log",
    "public-record",
    "representative-media",
  ]),
  publisher: z.string().min(1),
  sourceDate: isoDate,
  checkedAt: isoDate,
  status: z.enum(["synthetic", "reviewed", "verified", "stale", "conflict"]),
  note: z.string().min(1),
});

export const costItemSchema = z
  .object({
    id: stableId,
    label: z.string().min(1),
    category: z.enum([
      "housing-charge",
      "utilities",
      "connectivity",
      "insurance",
      "member-share",
      "deposit",
      "parking",
      "other",
    ]),
    amountMinMinor: z.number().int().nonnegative(),
    amountMaxMinor: z.number().int().nonnegative(),
    frequency: z.enum(["monthly", "one-time"]),
    certainty: z.enum(["known", "estimated"]),
    optional: z.boolean(),
    refundable: z.boolean(),
    recipient: z.string().min(1),
    purpose: z.string().min(1),
    changeRule: z.string().min(1),
    sourceId: stableId,
  })
  .refine((item) => item.amountMaxMinor >= item.amountMinMinor, {
    message: "The maximum amount must be greater than or equal to the minimum amount",
    path: ["amountMaxMinor"],
  });

export const totalDamageVersionSchema = z.object({
  id: stableId,
  version: z.string().min(1),
  currency,
  period: z.literal("monthly"),
  effectiveFrom: isoDate,
  reviewedAt: isoDate,
  nextReviewAt: isoDate,
  sourceIds: z.array(stableId).min(1),
  totals: z.object({
    knownMonthlyMinor: z.number().int().nonnegative(),
    estimatedMonthlyMinMinor: z.number().int().nonnegative(),
    estimatedMonthlyMaxMinor: z.number().int().nonnegative(),
    requiredMonthlyMinMinor: z.number().int().nonnegative(),
    requiredMonthlyMaxMinor: z.number().int().nonnegative(),
    optionalMonthlyMinMinor: z.number().int().nonnegative(),
    optionalMonthlyMaxMinor: z.number().int().nonnegative(),
    moveInRequiredMinor: z.number().int().nonnegative(),
    moveInRefundableMinor: z.number().int().nonnegative(),
  }),
  items: z.array(costItemSchema).min(1),
  note: z.string().min(1),
});

export const accessibilityFactSchema = z.object({
  id: stableId,
  category: z.enum([
    "arrival",
    "entrance",
    "circulation",
    "bathroom",
    "kitchen",
    "controls",
    "sensory",
    "parking",
    "evacuation",
  ]),
  feature: z.string().min(1),
  status: z.enum(["confirmed-in-fixture", "not-available", "needs-review"]),
  detail: z.string().min(1),
  sourceId: stableId,
  checkedAt: isoDate,
});

export const publicPlaceSchema = z
  .object({
    schemaVersion: z.literal("place-public.v1"),
    id: stableId,
    slug: stableId,
    publicationStatus: z.literal("synthetic-review-fixture"),
    syntheticDataNotice: z.string().min(1),
    provider: z.object({
      id: stableId,
      displayName: z.string().min(1),
      legalForm: z.string().min(1),
      ownershipModel: z.string().min(1),
      serviceCommitment: z.string().min(1),
      identityStatus: z.literal("synthetic-not-verified"),
      checkedAt: isoDate,
      sourceId: stableId,
    }),
    building: z.object({
      id: stableId,
      providerId: stableId,
      name: z.string().min(1),
      neighbourhood: z.string().min(1),
      municipality: z.string().min(1),
      province: z.string().length(2),
      countryCode: z.string().length(2),
      locationPrecision: z.literal("neighbourhood-only"),
      sourceId: stableId,
    }),
    name: z.string().min(1),
    unitLabel: z.string().min(1),
    placeType: z.string().min(1),
    householdType: z.string().min(1),
    bedrooms: z.number().int().nonnegative(),
    summary: z.string().min(1),
    image: z.object({
      src: z.string().startsWith("/"),
      alt: z.string().min(1),
      caption: z.string().min(1),
      evidenceStatus: z.literal("representative-only"),
      sourceId: stableId,
    }),
    availability: z.object({
      status: z.enum(["available-from", "available-now", "waitlist", "unavailable"]),
      availableFrom: isoDate.nullable(),
      unitsAvailable: z.number().int().nonnegative(),
      checkedAt: isoDate,
      sourceId: stableId,
    }),
    tenure: z.object({
      type: z.string().min(1),
      initialTerm: z.string().min(1),
      ongoingSecurity: z.string().min(1),
      rightsSummary: z.string().min(1),
      allocationSummary: z.string().min(1),
      checkedAt: isoDate,
      sourceId: stableId,
    }),
    accessibilityFacts: z.array(accessibilityFactSchema).min(1),
    totalDamage: totalDamageVersionSchema,
    discovery: z.object({
      matchedCount: z.number().int().nonnegative(),
      totalPriorities: z.number().int().positive(),
      criteria: z
        .array(
          z.object({
            id: stableId,
            label: z.string().min(1),
            matched: z.boolean(),
            explanation: z.string().min(1),
          }),
        )
        .min(1),
      allocationFirewall: z.string().min(1),
    }),
    headsUp: z
      .array(
        z.object({
          id: stableId,
          title: z.string().min(1),
          detail: z.string().min(1),
          sourceId: stableId,
          checkedAt: isoDate,
        }),
      )
      .min(1),
    vibe: z.array(z.string().min(1)).min(1),
    backstory: z.array(
      z.object({
        date: isoDate,
        title: z.string().min(1),
        detail: z.string().min(1),
        sourceId: stableId,
      }),
    ),
    aroundHere: z.array(
      z.object({
        kind: z.enum(["transit", "food", "health", "library", "park", "cycling"]),
        label: z.string().min(1),
        detail: z.string().min(1),
        sourceId: stableId,
      }),
    ),
    finePrint: z.object({
      title: z.string().min(1),
      jurisdiction: z.string().min(1),
      plainLanguageSummary: z.string().min(1),
      residentRights: z.array(z.string().min(1)).min(1),
      residentResponsibilities: z.array(z.string().min(1)).min(1),
      humanHelp: z.string().min(1),
      sourceId: stableId,
    }),
    corrections: z.object({
      route: z.string().min(1),
      explanation: z.string().min(1),
    }),
    sources: z.array(sourceSchema).min(1),
    freshness: z.object({
      publishedAt: isoDate,
      checkedAt: isoDate,
      nextReviewAt: isoDate,
    }),
  })
  .superRefine((place, context) => {
    const sourceIds = new Set(place.sources.map((source) => source.id));
    const referencedSourceIds = [
      place.provider.sourceId,
      place.building.sourceId,
      place.image.sourceId,
      place.availability.sourceId,
      place.tenure.sourceId,
      place.finePrint.sourceId,
      ...place.totalDamage.sourceIds,
      ...place.totalDamage.items.map((item) => item.sourceId),
      ...place.accessibilityFacts.map((fact) => fact.sourceId),
      ...place.headsUp.map((item) => item.sourceId),
      ...place.backstory.map((item) => item.sourceId),
      ...place.aroundHere.map((item) => item.sourceId),
    ];

    for (const sourceId of referencedSourceIds) {
      if (!sourceIds.has(sourceId)) {
        context.addIssue({
          code: "custom",
          message: `Unknown source reference: ${sourceId}`,
          path: ["sources"],
        });
      }
    }

    if (place.building.providerId !== place.provider.id) {
      context.addIssue({
        code: "custom",
        message: "The building provider must match the Place provider",
        path: ["building", "providerId"],
      });
    }

    const requiredMonthly = place.totalDamage.items.filter(
      (item) => item.frequency === "monthly" && !item.optional,
    );
    const optionalMonthly = place.totalDamage.items.filter(
      (item) => item.frequency === "monthly" && item.optional,
    );
    const knownMonthly = requiredMonthly.filter((item) => item.certainty === "known");
    const estimatedMonthly = requiredMonthly.filter((item) => item.certainty === "estimated");
    const requiredMoveIn = place.totalDamage.items.filter(
      (item) => item.frequency === "one-time" && !item.optional,
    );

    const sum = (items: typeof requiredMonthly, field: "amountMinMinor" | "amountMaxMinor") =>
      items.reduce((total, item) => total + item[field], 0);
    const expectedTotals = {
      knownMonthlyMinor: sum(knownMonthly, "amountMinMinor"),
      estimatedMonthlyMinMinor: sum(estimatedMonthly, "amountMinMinor"),
      estimatedMonthlyMaxMinor: sum(estimatedMonthly, "amountMaxMinor"),
      requiredMonthlyMinMinor: sum(requiredMonthly, "amountMinMinor"),
      requiredMonthlyMaxMinor: sum(requiredMonthly, "amountMaxMinor"),
      optionalMonthlyMinMinor: sum(optionalMonthly, "amountMinMinor"),
      optionalMonthlyMaxMinor: sum(optionalMonthly, "amountMaxMinor"),
      moveInRequiredMinor: sum(requiredMoveIn, "amountMaxMinor"),
      moveInRefundableMinor: sum(
        requiredMoveIn.filter((item) => item.refundable),
        "amountMaxMinor",
      ),
    };

    for (const [field, expected] of Object.entries(expectedTotals)) {
      const actual = place.totalDamage.totals[field as keyof typeof expectedTotals];
      if (actual !== expected) {
        context.addIssue({
          code: "custom",
          message: `${field} must equal the sum of its cost items (${expected})`,
          path: ["totalDamage", "totals", field],
        });
      }
    }

    const matchedCount = place.discovery.criteria.filter((criterion) => criterion.matched).length;
    if (
      matchedCount !== place.discovery.matchedCount ||
      place.discovery.totalPriorities !== place.discovery.criteria.length
    ) {
      context.addIssue({
        code: "custom",
        message: "Discovery counts must be derived from the published criteria",
        path: ["discovery"],
      });
    }
  });

export const publicPlacesEnvelopeSchema = z.object({
  schemaVersion: z.literal("place-collection.v1"),
  dataStatus: z.enum(["synthetic", "live"]),
  places: z.array(publicPlaceSchema),
});

export type PublicPlace = z.infer<typeof publicPlaceSchema>;
export type TotalDamageVersion = z.infer<typeof totalDamageVersionSchema>;
export type CostItem = z.infer<typeof costItemSchema>;
export type PublicPlacesEnvelope = z.infer<typeof publicPlacesEnvelopeSchema>;
