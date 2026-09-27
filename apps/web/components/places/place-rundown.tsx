import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  CalendarDays,
  Check,
  CircleAlert,
  Clock3,
  FileCheck2,
  HandCoins,
  KeyRound,
  MapPin,
  ReceiptText,
  Scale,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { formatCostItem, formatDate, formatMoney, formatTotalDamage } from "@/lib/places/format";
import type { PublicPlace } from "@/lib/places/schema";

function SourceStamp({ place, sourceId }: { place: PublicPlace; sourceId: string }) {
  const source = place.sources.find((item) => item.id === sourceId);
  if (!source) return null;

  return (
    <p className="mt-3 text-sm leading-5 text-[var(--muted-foreground)]">
      Source: {source.title} · {source.status} · checked {formatDate(source.checkedAt)}
    </p>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="max-w-3xl">
      <p className="mb-2 text-sm font-extrabold tracking-[0.12em] text-[var(--primary)] uppercase">
        {eyebrow}
      </p>
      <h2 className="font-[family-name:var(--font-display)] text-3xl leading-tight font-bold tracking-[-0.045em] md:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-3 text-base leading-7 text-[var(--muted-foreground)] md:text-lg">{description}</p>
      ) : null}
    </div>
  );
}

function AccessStatus({ status }: { status: PublicPlace["accessibilityFacts"][number]["status"] }) {
  const labels = {
    "confirmed-in-fixture": "Recorded in fixture",
    "not-available": "Not available",
    "needs-review": "Needs review",
  } as const;

  const tones = {
    "confirmed-in-fixture": "bg-[var(--garden-soft)] text-[var(--foreground)]",
    "not-available": "bg-[var(--sun-soft)] text-[var(--foreground)]",
    "needs-review": "bg-[var(--raised)] text-[var(--foreground)]",
  } as const;

  return (
    <span className={`inline-flex min-h-7 items-center rounded-full px-3 text-sm font-bold ${tones[status]}`}>
      {labels[status]}
    </span>
  );
}

export function PlaceRundown({ place }: { place: PublicPlace }) {
  const totalDamage = place.totalDamage;
  const requiredMonthly = totalDamage.items.filter(
    (item) => item.frequency === "monthly" && !item.optional,
  );
  const moveIn = totalDamage.items.filter((item) => item.frequency === "one-time");
  const optional = totalDamage.items.filter((item) => item.optional);

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <a
        href="#rundown-main"
        className="fixed top-3 left-3 z-50 -translate-y-24 rounded-xl bg-[var(--foreground)] px-4 py-3 font-bold text-[var(--background)] focus:translate-y-0"
      >
        Skip to the Rundown
      </a>

      <header className="border-b border-[var(--border)] bg-[var(--background)] print:hidden">
        <div className="mx-auto flex min-h-20 max-w-[1240px] items-center justify-between gap-4 px-4 md:px-8">
          <Link href="/" className="inline-flex min-h-11 items-center gap-3 rounded-xl font-bold">
            <Image src="/brand/hut-static.png" alt="" width={42} height={42} unoptimized />
            <span className="font-[family-name:var(--font-display)] text-xl tracking-[-0.04em]">PullUp</span>
          </Link>
          <Link
            href="/#flow-actions"
            className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-[var(--border-strong)] bg-[var(--card)] px-4 font-bold hover:bg-[var(--muted)]"
          >
            <ArrowLeft aria-hidden="true" size={18} /> Back to Flow
          </Link>
        </div>
      </header>

      <main id="rundown-main">
        <div className="bg-[var(--sun-soft)] text-[var(--foreground)]">
          <div className="mx-auto flex max-w-[1240px] gap-3 px-4 py-4 text-base leading-6 md:px-8">
            <CircleAlert aria-hidden="true" className="mt-0.5 shrink-0" size={20} />
            <p>
              <strong>Synthetic review fixture.</strong> {place.syntheticDataNotice}
            </p>
          </div>
        </div>

        <article className="mx-auto max-w-[1240px] px-4 py-8 md:px-8 md:py-12">
          <section aria-labelledby="place-title" className="grid gap-8 lg:grid-cols-[1.04fr_.96fr] lg:items-stretch">
            <figure className="overflow-hidden rounded-[28px_28px_28px_10px] bg-[var(--raised)]">
              <div className="relative aspect-[4/3] min-h-[280px]">
                <Image
                  src={place.image.src}
                  alt={place.image.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 52vw"
                  priority
                  unoptimized
                />
              </div>
              <figcaption className="px-5 py-4 text-base text-[var(--muted-foreground)]">
                {place.image.caption}
              </figcaption>
            </figure>

            <div className="flex flex-col justify-center">
              <p className="text-sm font-extrabold tracking-[0.12em] text-[var(--primary)] uppercase">
                The Rundown · complete Place profile
              </p>
              <h1
                id="place-title"
                className="mt-3 font-[family-name:var(--font-display)] text-5xl leading-[0.96] font-bold tracking-[-0.065em] md:text-6xl"
              >
                {place.name}
              </h1>
              <p className="mt-4 text-lg leading-7 text-[var(--muted-foreground)]">{place.summary}</p>

              <dl className="mt-7 grid gap-4 sm:grid-cols-2">
                <div className="border-t border-[var(--border)] pt-4">
                  <dt className="flex items-center gap-2 text-sm font-bold text-[var(--muted-foreground)]">
                    <MapPin aria-hidden="true" size={18} /> Area
                  </dt>
                  <dd className="mt-1 text-base font-bold">
                    {place.building.neighbourhood}, {place.building.municipality}, {place.building.province}
                  </dd>
                </div>
                <div className="border-t border-[var(--border)] pt-4">
                  <dt className="flex items-center gap-2 text-sm font-bold text-[var(--muted-foreground)]">
                    <CalendarDays aria-hidden="true" size={18} /> Availability
                  </dt>
                  <dd className="mt-1 text-base font-bold">
                    {place.availability.availableFrom
                      ? `From ${formatDate(place.availability.availableFrom)}`
                      : place.availability.status}
                  </dd>
                </div>
                <div className="border-t border-[var(--border)] pt-4">
                  <dt className="flex items-center gap-2 text-sm font-bold text-[var(--muted-foreground)]">
                    <KeyRound aria-hidden="true" size={18} /> Tenure
                  </dt>
                  <dd className="mt-1 text-base font-bold">{place.tenure.type}</dd>
                </div>
                <div className="border-t border-[var(--border)] pt-4">
                  <dt className="flex items-center gap-2 text-sm font-bold text-[var(--muted-foreground)]">
                    <Clock3 aria-hidden="true" size={18} /> Facts checked
                  </dt>
                  <dd className="mt-1 text-base font-bold">{formatDate(place.freshness.checkedAt)}</dd>
                </div>
              </dl>

              <div className="mt-7 rounded-[20px_20px_20px_7px] bg-[var(--raised)] p-5">
                <div className="flex items-start gap-3">
                  <Building2 aria-hidden="true" className="mt-1 shrink-0 text-[var(--primary)]" size={22} />
                  <div>
                    <p className="font-bold">{place.provider.displayName}</p>
                    <p className="mt-1 text-base leading-6 text-[var(--muted-foreground)]">
                      {place.provider.legalForm}. {place.provider.ownershipModel}.
                    </p>
                    <p className="mt-2 text-sm font-bold">Identity status: synthetic, not verified</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section aria-labelledby="damage-title" className="mt-16 scroll-mt-6">
            <SectionHeading
              eyebrow="Total Damage"
              title="Full expected housing cost"
              description="Required monthly costs are separated from estimates, refundable move-in amounts, and optional services."
            />

            <div className="mt-7 grid gap-6 lg:grid-cols-[.8fr_1.2fr]">
              <div className="rounded-[26px_26px_26px_9px] bg-[var(--sun-soft)] p-6 md:p-8">
                <p className="text-base font-bold">Required each month</p>
                <p
                  id="damage-title"
                  className="mt-2 font-[family-name:var(--font-display)] text-5xl leading-none font-bold tracking-[-0.06em]"
                >
                  {formatTotalDamage(totalDamage)}
                </p>
                <p className="mt-2 text-base">per month · {totalDamage.currency}</p>

                <dl className="mt-7 grid gap-4">
                  <div className="flex items-baseline justify-between gap-4 border-t border-[color-mix(in_srgb,var(--foreground)_18%,transparent)] pt-4">
                    <dt>Known monthly charges</dt>
                    <dd className="font-bold">
                      {formatMoney(totalDamage.totals.knownMonthlyMinor, totalDamage.currency)}
                    </dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-4 border-t border-[color-mix(in_srgb,var(--foreground)_18%,transparent)] pt-4">
                    <dt>Estimated monthly costs</dt>
                    <dd className="font-bold">
                      {formatMoney(totalDamage.totals.estimatedMonthlyMinMinor, totalDamage.currency)}–
                      {formatMoney(totalDamage.totals.estimatedMonthlyMaxMinor, totalDamage.currency)}
                    </dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-4 border-t border-[color-mix(in_srgb,var(--foreground)_18%,transparent)] pt-4">
                    <dt>Refundable move-in amount</dt>
                    <dd className="font-bold">
                      {formatMoney(totalDamage.totals.moveInRefundableMinor, totalDamage.currency)}
                    </dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-4 border-t border-[color-mix(in_srgb,var(--foreground)_18%,transparent)] pt-4">
                    <dt>Optional parking</dt>
                    <dd className="font-bold">
                      {formatMoney(totalDamage.totals.optionalMonthlyMinMinor, totalDamage.currency)}/mo
                    </dd>
                  </div>
                </dl>
                <p className="mt-6 text-base leading-6">{totalDamage.note}</p>
                <p className="mt-4 text-sm font-bold">
                  Version {totalDamage.version} · effective {formatDate(totalDamage.effectiveFrom)} · reviewed {formatDate(totalDamage.reviewedAt)}
                </p>
              </div>

              <div aria-labelledby="where-it-goes-title">
                <div className="flex items-center gap-3">
                  <ReceiptText aria-hidden="true" className="text-[var(--primary)]" size={24} />
                  <h3
                    id="where-it-goes-title"
                    className="font-[family-name:var(--font-display)] text-2xl font-bold tracking-[-0.035em]"
                  >
                    Where It Goes · cost breakdown
                  </h3>
                </div>

                <div className="mt-4 divide-y divide-[var(--border)] border-y border-[var(--border)]">
                  {requiredMonthly.map((item) => {
                    const source = place.sources.find((candidate) => candidate.id === item.sourceId);
                    return (
                      <article key={item.id} className="break-inside-avoid py-5">
                        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
                          <h4 className="text-lg font-bold">{item.label}</h4>
                          <p className="text-lg font-bold">{formatCostItem(item, totalDamage.currency)}</p>
                        </div>
                        <dl className="mt-3 grid gap-3 text-base leading-6 sm:grid-cols-3">
                          <div>
                            <dt className="font-bold">Recipient</dt>
                            <dd className="text-[var(--muted-foreground)]">{item.recipient}</dd>
                          </div>
                          <div>
                            <dt className="font-bold">Purpose</dt>
                            <dd className="text-[var(--muted-foreground)]">{item.purpose}</dd>
                          </div>
                          <div>
                            <dt className="font-bold">How it may change</dt>
                            <dd className="text-[var(--muted-foreground)]">{item.changeRule}</dd>
                          </div>
                        </dl>
                        <p className="mt-3 text-sm text-[var(--muted-foreground)]">
                          {item.certainty === "estimated" ? "Estimated variable cost" : "Known charge"}
                          {source ? ` · ${source.title}` : ""}
                        </p>
                      </article>
                    );
                  })}
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="bg-[var(--raised)] p-5">
                    <p className="flex items-center gap-2 font-bold">
                      <HandCoins aria-hidden="true" size={20} /> Move-in amounts
                    </p>
                    {moveIn.map((item) => (
                      <p key={item.id} className="mt-3 text-base">
                        {item.label}: <strong>{formatCostItem(item, totalDamage.currency)}</strong>
                        {item.refundable ? " · refundable" : ""}
                      </p>
                    ))}
                  </div>
                  <div className="bg-[var(--raised)] p-5">
                    <p className="flex items-center gap-2 font-bold">
                      <Sparkles aria-hidden="true" size={20} /> Optional services
                    </p>
                    {optional.map((item) => (
                      <p key={item.id} className="mt-3 text-base">
                        {item.label}: <strong>{formatCostItem(item, totalDamage.currency)}</strong>
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section aria-labelledby="tenure-title" className="mt-16 grid gap-8 lg:grid-cols-[.9fr_1.1fr]">
            <div>
              <SectionHeading
                eyebrow="Tenure and provider"
                title="Know the relationship, not just the room"
                description="Warm language never replaces the agreement, the provider identity, or the rules used for an offer."
              />
              <div className="mt-6 bg-[var(--feature-surface)] p-6 text-[var(--night-text)] md:p-8">
                <h3 id="tenure-title" className="text-xl font-bold">{place.tenure.type}</h3>
                <p className="mt-4 text-base leading-7">{place.tenure.initialTerm}. {place.tenure.ongoingSecurity}</p>
                <p className="mt-4 text-base leading-7">{place.tenure.rightsSummary}</p>
                <SourceStamp place={place} sourceId={place.tenure.sourceId} />
              </div>
            </div>

            <div className="bg-[var(--sky-soft)] p-6 md:p-8">
              <p className="flex items-center gap-2 text-sm font-extrabold tracking-[0.1em] uppercase">
                <ShieldCheck aria-hidden="true" size={20} /> Allocation firewall
              </p>
              <h3 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-bold tracking-[-0.045em]">
                Flow helps discovery. It never selects residents.
              </h3>
              <p className="mt-4 text-base leading-7">{place.discovery.allocationFirewall}</p>
              <p className="mt-4 text-base leading-7">{place.tenure.allocationSummary}</p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {place.discovery.criteria.map((criterion) => (
                  <div key={criterion.id} className="bg-[var(--card)] p-4">
                    <p className="flex items-start gap-2 font-bold">
                      {criterion.matched ? <Check aria-hidden="true" className="mt-0.5 shrink-0" size={18} /> : <CircleAlert aria-hidden="true" className="mt-0.5 shrink-0" size={18} />}
                      {criterion.label}
                    </p>
                    <p className="mt-2 text-base leading-6 text-[var(--muted-foreground)]">{criterion.explanation}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section aria-labelledby="access-title" className="mt-16">
            <SectionHeading
              eyebrow="Accessibility"
              title="Specific facts, including what does not work"
              description="A single ‘accessible’ label is not enough. Check the route, measurements, equipment, sensory information, and what still needs review."
            />
            <div id="access-title" className="mt-7 grid gap-4 md:grid-cols-2">
              {place.accessibilityFacts.map((fact) => (
                <article key={fact.id} className="border-t border-[var(--border)] py-5">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <h3 className="max-w-md text-xl font-bold">{fact.feature}</h3>
                    <AccessStatus status={fact.status} />
                  </div>
                  <p className="mt-3 text-base leading-7 text-[var(--muted-foreground)]">{fact.detail}</p>
                  <SourceStamp place={place} sourceId={fact.sourceId} />
                </article>
              ))}
            </div>
          </section>

          <section aria-labelledby="heads-up-title" className="mt-16 bg-[var(--sun-soft)] p-6 md:p-9">
            <SectionHeading
              eyebrow="Heads Up"
              title="Honest tradeoffs before a tour"
              description="These are useful decision facts, not emergency alerts or manufactured urgency."
            />
            <div id="heads-up-title" className="mt-7 grid gap-5 md:grid-cols-3">
              {place.headsUp.map((item) => (
                <article key={item.id} className="border-t border-[color-mix(in_srgb,var(--foreground)_22%,transparent)] pt-5">
                  <h3 className="text-xl font-bold">{item.title}</h3>
                  <p className="mt-3 text-base leading-7">{item.detail}</p>
                  <SourceStamp place={place} sourceId={item.sourceId} />
                </article>
              ))}
            </div>
          </section>

          <div className="mt-16 grid gap-10 lg:grid-cols-2">
            <section aria-labelledby="vibe-title">
              <SectionHeading eyebrow="The Vibe" title="Living and community character" />
              <ul id="vibe-title" className="mt-6 space-y-4">
                {place.vibe.map((item) => (
                  <li key={item} className="flex gap-3 border-t border-[var(--border)] pt-4 text-base leading-7">
                    <Check aria-hidden="true" className="mt-1 shrink-0 text-[var(--primary)]" size={20} /> {item}
                  </li>
                ))}
              </ul>
            </section>

            <section aria-labelledby="backstory-title">
              <SectionHeading eyebrow="The Backstory" title="Repair and upgrade history" />
              <ol id="backstory-title" className="mt-6 space-y-4">
                {place.backstory.map((item) => (
                  <li key={`${item.date}-${item.title}`} className="border-t border-[var(--border)] pt-4">
                    <p className="text-sm font-bold text-[var(--muted-foreground)]">{formatDate(item.date)}</p>
                    <h3 className="mt-1 text-xl font-bold">{item.title}</h3>
                    <p className="mt-2 text-base leading-7 text-[var(--muted-foreground)]">{item.detail}</p>
                    <SourceStamp place={place} sourceId={item.sourceId} />
                  </li>
                ))}
              </ol>
            </section>
          </div>

          <section aria-labelledby="around-title" className="mt-16">
            <SectionHeading
              eyebrow="Around Here"
              title="Useful nearby context"
              description="Representative distances only. A real Place requires live route, service, and accessibility checks."
            />
            <div id="around-title" className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {place.aroundHere.map((item) => (
                <article key={`${item.kind}-${item.label}`} className="bg-[var(--raised)] p-5">
                  <p className="text-sm font-extrabold tracking-[0.09em] uppercase">{item.kind}</p>
                  <h3 className="mt-2 text-lg font-bold">{item.label}</h3>
                  <p className="mt-2 text-base leading-6 text-[var(--muted-foreground)]">{item.detail}</p>
                </article>
              ))}
            </div>
          </section>

          <section aria-labelledby="fine-print-title" className="mt-16 bg-[var(--card)] p-6 shadow-[var(--shadow-sm)] md:p-9">
            <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr]">
              <div>
                <p className="flex items-center gap-2 text-sm font-extrabold tracking-[0.1em] text-[var(--primary)] uppercase">
                  <Scale aria-hidden="true" size={20} /> Fine Print
                </p>
                <h2 id="fine-print-title" className="mt-3 font-[family-name:var(--font-display)] text-3xl font-bold tracking-[-0.045em]">
                  Agreements, rights, and responsibilities
                </h2>
                <p className="mt-4 text-base leading-7 text-[var(--muted-foreground)]">
                  {place.finePrint.plainLanguageSummary}
                </p>
                <p className="mt-4 text-sm font-bold">{place.finePrint.title} · {place.finePrint.jurisdiction}</p>
                <SourceStamp place={place} sourceId={place.finePrint.sourceId} />
              </div>
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <h3 className="flex items-center gap-2 text-xl font-bold"><ShieldCheck aria-hidden="true" size={20} /> Resident rights</h3>
                  <ul className="mt-4 space-y-3">
                    {place.finePrint.residentRights.map((item) => <li key={item} className="text-base leading-6">• {item}</li>)}
                  </ul>
                </div>
                <div>
                  <h3 className="flex items-center gap-2 text-xl font-bold"><FileCheck2 aria-hidden="true" size={20} /> Responsibilities</h3>
                  <ul className="mt-4 space-y-3">
                    {place.finePrint.residentResponsibilities.map((item) => <li key={item} className="text-base leading-6">• {item}</li>)}
                  </ul>
                </div>
                <div className="bg-[var(--garden-soft)] p-5 sm:col-span-2">
                  <p className="font-bold">Human help remains available</p>
                  <p className="mt-2 text-base leading-7">{place.finePrint.humanHelp}</p>
                </div>
              </div>
            </div>
          </section>

          <section aria-labelledby="sources-title" className="mt-16">
            <SectionHeading
              eyebrow="Sources and freshness"
              title="Every material fact keeps its receipts"
              description={`This synthetic snapshot was checked ${formatDate(place.freshness.checkedAt)}. Its next review date is ${formatDate(place.freshness.nextReviewAt)}.`}
            />
            <div id="sources-title" className="mt-7 divide-y divide-[var(--border)] border-y border-[var(--border)]">
              {place.sources.map((source) => (
                <article key={source.id} className="grid gap-3 py-5 md:grid-cols-[1fr_auto] md:items-start">
                  <div>
                    <h3 className="text-lg font-bold">{source.title}</h3>
                    <p className="mt-1 text-base leading-6 text-[var(--muted-foreground)]">{source.note}</p>
                  </div>
                  <dl className="grid gap-1 text-sm md:text-right">
                    <div><dt className="inline font-bold">Status: </dt><dd className="inline">{source.status}</dd></div>
                    <div><dt className="inline font-bold">Source date: </dt><dd className="inline">{formatDate(source.sourceDate)}</dd></div>
                    <div><dt className="inline font-bold">Checked: </dt><dd className="inline">{formatDate(source.checkedAt)}</dd></div>
                  </dl>
                </article>
              ))}
            </div>
          </section>

          <section className="mt-12 flex flex-col gap-6 bg-[var(--feature-surface)] p-6 text-[var(--night-text)] md:flex-row md:items-center md:justify-between md:p-9 print:hidden">
            <div className="max-w-2xl">
              <p className="text-sm font-extrabold tracking-[0.1em] uppercase">Pull Up · request a tour</p>
              <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-bold tracking-[-0.045em]">
                Ready for the next clear step?
              </h2>
              <p className="mt-3 text-base leading-7 text-[color-mix(in_srgb,var(--night-text)_76%,transparent)]">
                Return to Flow to preview a tour request. This technical proof does not contact a provider or submit an application.
              </p>
            </div>
            <Link
              href="/#flow-actions"
              className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-2xl bg-[var(--primary)] px-6 text-base font-bold text-[var(--primary-foreground)]"
            >
              Return to Pull Up <ArrowRight aria-hidden="true" size={19} />
            </Link>
          </section>

          <footer className="mt-8 border-t border-[var(--border)] pt-6 text-base leading-7 text-[var(--muted-foreground)]">
            <p><strong className="text-[var(--foreground)]">Correction route:</strong> {place.corrections.route}</p>
            <p>{place.corrections.explanation}</p>
          </footer>
        </article>
      </main>
    </div>
  );
}
