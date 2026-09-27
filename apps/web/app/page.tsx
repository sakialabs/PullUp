"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import type { LucideIcon } from "lucide-react";
import {
  Accessibility,
  ArrowRight,
  ArrowUpRight,
  Bell,
  Bike,
  Building2,
  Calendar,
  Check,
  CircleCheck,
  CircleHelp,
  Compass,
  Eye,
  Hammer,
  Handshake,
  Heart,
  Home as HomeIcon,
  Key,
  Leaf,
  Lock,
  MapPin,
  Moon,
  Share2,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Sun,
  Users,
  Undo2,
  Wallet,
  Wrench,
  X,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion, MotionConfig, useReducedMotion } from "motion/react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { formatDate, formatMoney, formatTotalDamage } from "@/lib/places/format";
import { syntheticPlace } from "@/lib/places/fixture";
import type { PublicPlace } from "@/lib/places/schema";

type View = "flow" | "place" | "commons" | "dayone";
type FlowDecision = "keep" | "not-it";

const subscribeToClient = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

const nav: { id: View; label: string; note: string; icon: LucideIcon }[] = [
  { id: "flow", label: "Flow", note: "Find a place", icon: Compass },
  { id: "place", label: "My Place", note: "Run your home", icon: HomeIcon },
  { id: "commons", label: "Commons", note: "Share nearby", icon: Handshake },
  { id: "dayone", label: "Day One", note: "Move together", icon: Users },
];

export default function Home() {
  const [view, setView] = useState<View>("flow");
  const [decision, setDecision] = useState<FlowDecision | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [toast, setToast] = useState("");
  const [announcement, setAnnouncement] = useState("");
  const toastTimer = useRef<number | null>(null);
  const reduceMotion = useReducedMotion();
  const place = syntheticPlace;

  function tell(message: string) {
    setToast(message);
    if (toastTimer.current) window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(""), 2600);
  }

  useEffect(() => {
    return () => {
      if (toastTimer.current) window.clearTimeout(toastTimer.current);
    };
  }, []);

  function changeView(next: View) {
    setView(next);
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  }

  function decide(nextDecision: FlowDecision) {
    const message =
      nextDecision === "keep"
        ? `${place.name} is kept privately for this review session. You can undo this.`
        : `${place.name} is hidden from this review Flow. Only you can see Not It. You can undo this.`;
    setDecision(nextDecision);
    tell(message);
    setAnnouncement(message);
  }

  function undoDecision() {
    setDecision(null);
    const message = `Undone. ${place.name} is back in your Flow.`;
    tell(message);
    setAnnouncement(message);
  }

  return (
    <MotionConfig reducedMotion="user">
      <main className="app-shell">
        <a className="skip-link" href="#flow">Skip to main content</a>
        <Sidebar view={view} onChange={changeView} />

        <section className="main-column">
          <Topbar view={view} onHome={() => changeView("flow")} tell={tell} />

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={view}
              className="page-content"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            >
              {view === "flow" && (
                <FlowView
                  place={place}
                  decision={decision}
                  onPullUp={() => setDialogOpen(true)}
                  onKeep={() => decide("keep")}
                  onPass={() => decide("not-it")}
                  onUndo={undoDecision}
                  onDayOne={() => changeView("dayone")}
                  tell={tell}
                />
              )}
              {view === "place" && <PlaceView tell={tell} />}
              {view === "commons" && <CommonsView tell={tell} />}
              {view === "dayone" && <DayOneView tell={tell} />}
            </motion.div>
          </AnimatePresence>
        </section>

        <MobileNav view={view} onChange={changeView} />

        <PullUpDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          place={place}
          onPreviewed={() => tell("Tour request preview ready. Nothing was sent")}
        />

        <AnimatePresence>
          {toast && (
            <motion.div
              className="toast"
              role="status"
              initial={{ opacity: 0, y: 18, x: "-50%" }}
              animate={{ opacity: 1, y: 0, x: "-50%" }}
              exit={{ opacity: 0, y: 12, x: "-50%" }}
            >
              <CircleCheck aria-hidden="true" size={19} />
              {toast}
            </motion.div>
          )}
        </AnimatePresence>
        <p className="sr-only" aria-live="polite" aria-atomic="true">{announcement}</p>
      </main>
    </MotionConfig>
  );
}

function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <span className={compact ? "brand-lockup compact" : "brand-lockup"}>
      <span className="brand-hut">
        <Image src="/brand/hut-static.png" alt="" width={64} height={64} priority unoptimized />
      </span>
      <span className="brand-copy">
        <strong>PullUp</strong>
        {!compact && <small>Find your place</small>}
      </span>
    </span>
  );
}

function Sidebar({ view, onChange }: { view: View; onChange: (view: View) => void }) {
  return (
    <aside className="side-nav" aria-label="Primary navigation">
      <button className="brand-button" onClick={() => onChange("flow")} aria-label="PullUp Flow">
        <Brand />
      </button>

      <nav>
        {nav.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              className={view === item.id ? "nav-item active" : "nav-item"}
              onClick={() => onChange(item.id)}
              aria-current={view === item.id ? "page" : undefined}
            >
              <span className="nav-icon"><Icon aria-hidden="true" size={20} /></span>
              <span><strong>{item.label}</strong><small>{item.note}</small></span>
              {item.id === "dayone" && <span className="nav-ping" aria-label="One update">1</span>}
            </button>
          );
        })}
      </nav>

      <div className="side-manifesto">
        <Sparkles aria-hidden="true" size={18} />
        <p>Homes made for chillin’ not flipping.</p>
        <span>Working prototype</span>
      </div>
    </aside>
  );
}

function Topbar({ view, onHome, tell }: { view: View; onHome: () => void; tell: (message: string) => void }) {
  const { resolvedTheme, setTheme } = useTheme();
  const themeReady = useSyncExternalStore(subscribeToClient, getClientSnapshot, getServerSnapshot);
  const darkMode = themeReady && resolvedTheme === "dark";
  const current = nav.find((item) => item.id === view)?.label ?? "PullUp";

  return (
    <header className="topbar">
      <button className="mobile-brand" onClick={onHome} aria-label="PullUp Flow"><Brand compact /></button>
      <div className="top-context">
        <span>{current}</span>
        {view === "flow" && <small><span /> 1 synthetic Place · checked {formatDate(syntheticPlace.freshness.checkedAt)}</small>}
      </div>
      <div className="top-actions">
        <Button
          variant="ghost"
          size="icon"
          aria-label={themeReady ? (darkMode ? "Use light mode" : "Use dark mode") : "Change colour theme"}
          onClick={() => setTheme(darkMode ? "light" : "dark")}
        >
          {themeReady && darkMode ? <Sun aria-hidden="true" size={19} /> : <Moon aria-hidden="true" size={19} />}
        </Button>
        <Button variant="ghost" size="icon" aria-label="Notifications" onClick={() => tell("You are all caught up")}>
          <Bell aria-hidden="true" size={19} />
        </Button>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="secondary" className="help-trigger"><CircleHelp aria-hidden="true" size={18} /><span>Need a hand?</span></Button>
          </PopoverTrigger>
          <PopoverContent>
            <p className="micro-label">Human-first help</p>
            <h3>What do you need?</h3>
            <button onClick={() => tell("Plain-language explanation opened")}><Eye size={17} /> Explain this</button>
            <button onClick={() => tell("Day One support opened")}><Users size={17} /> Ask my Twin</button>
            <button onClick={() => tell("Human support request started")}><CircleHelp size={17} /> Talk to a person</button>
            <p className="support-note"><ShieldCheck size={15} /> No mystery chatbot. You choose the route.</p>
          </PopoverContent>
        </Popover>
        <button className="avatar" aria-label="Open profile" onClick={() => tell("Profile opened")}>AM</button>
      </div>
    </header>
  );
}

function FlowView({
  place,
  decision,
  onPullUp,
  onKeep,
  onPass,
  onUndo,
  onDayOne,
  tell,
}: {
  place: PublicPlace;
  decision: FlowDecision | null;
  onPullUp: () => void;
  onKeep: () => void;
  onPass: () => void;
  onUndo: () => void;
  onDayOne: () => void;
  tell: (message: string) => void;
}) {
  const reduceMotion = useReducedMotion();
  const primaryAccess = place.accessibilityFacts[0];
  const availableLabel = place.availability.availableFrom
    ? formatDate(place.availability.availableFrom)
    : place.availability.status;
  const decisionMessage =
    decision === "keep"
      ? "Kept privately for this review session."
      : "Hidden from this review Flow. Not It stays private.";

  return (
    <>
      <div id="flow" className="page-heading flow-heading">
        <div>
          <p className="eyebrow">Your housing flow</p>
          <h1>Find somewhere that <em>fits.</em></h1>
          <p>Real costs, honest tradeoffs, source dates, and no mystery ranking.</p>
        </div>
        <Button variant="secondary" onClick={() => tell("Flow preferences are a later milestone")}>
          <SlidersHorizontal aria-hidden="true" size={17} /> Tune my Flow <span className="count">4</span>
        </Button>
      </div>

      <div className="fixture-notice" role="note">
        <CircleHelp aria-hidden="true" size={20} />
        <p><strong>Synthetic review fixture.</strong> No provider, price, availability, access claim, or housing policy shown here is live.</p>
      </div>

      <div className="flow-layout">
        <section className="place-stage" aria-labelledby="flow-place-title">
          <motion.article
            className={decision ? `place-card decided ${decision}` : "place-card"}
            initial={{ opacity: 0, scale: 0.985, y: reduceMotion ? 0 : 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0.01 : 0.24 }}
          >
            <motion.div
              className="place-media"
              drag={reduceMotion || decision ? false : "x"}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.13}
              onDragEnd={(_, info) => {
                if (info.offset.x > 115) onKeep();
                if (info.offset.x < -115) onPass();
              }}
            >
              <Image
                src={place.image.src}
                alt={place.image.alt}
                fill
                sizes="(max-width: 760px) 100vw, (max-width: 1180px) 70vw, 50vw"
                draggable={false}
                priority
                unoptimized
              />
              <div className="place-media-shade" />
              <div className="media-topline">
                <span className="fit-pill">
                  <Check aria-hidden="true" size={14} />
                  <strong>{place.discovery.matchedCount} of {place.discovery.totalPriorities}</strong> priorities
                </span>
                <button
                  className="save-place"
                  onClick={onKeep}
                  aria-label={`Keep ${place.name} privately`}
                  aria-pressed={decision === "keep"}
                >
                  <Heart aria-hidden="true" size={20} fill={decision === "keep" ? "currentColor" : "none"} />
                </button>
              </div>
              <div className="media-bottomline">
                <div className="location">
                  <MapPin aria-hidden="true" size={15} />
                  <span>{place.building.neighbourhood}, {place.building.municipality}</span>
                </div>
                <span className="media-caption">Representative image</span>
              </div>
            </motion.div>

            <div className="place-info">
              <div className="place-kicker">
                <span>Synthetic</span>
                <p>{place.placeType}</p>
              </div>
              <h2 id="flow-place-title">{place.name}</h2>
              <p className="provider-line">
                <Building2 aria-hidden="true" size={17} />
                {place.provider.displayName} · {place.provider.legalForm}
              </p>
              <p className="place-note">{place.summary}</p>

              <div className="tag-row" aria-label="Key Place facts">
                <span><Accessibility aria-hidden="true" size={14} /> {primaryAccess.feature}</span>
                <span><Key aria-hidden="true" size={14} /> {place.tenure.type}</span>
                <span><Users aria-hidden="true" size={14} /> {place.householdType}</span>
              </div>

              <div className="damage-card">
                <div>
                  <p>Total Damage</p>
                  <small>Full expected housing cost</small>
                </div>
                <strong>{formatTotalDamage(place.totalDamage)}<small>/mo</small></strong>
                <span>
                  {formatMoney(place.totalDamage.totals.knownMonthlyMinor, place.totalDamage.currency)} known
                  {" + "}
                  {formatMoney(place.totalDamage.totals.estimatedMonthlyMinMinor, place.totalDamage.currency)}–
                  {formatMoney(place.totalDamage.totals.estimatedMonthlyMaxMinor, place.totalDamage.currency)} estimated
                </span>
                <span>
                  {formatMoney(place.totalDamage.totals.moveInRefundableMinor, place.totalDamage.currency)} refundable at move-in · optional parking separate
                </span>
              </div>

              <dl className="quick-rundown" aria-label="Quick Place facts">
                <div>
                  <Calendar aria-hidden="true" size={18} />
                  <span><dt>Available</dt><dd>{availableLabel}</dd></span>
                </div>
                <div>
                  <Key aria-hidden="true" size={18} />
                  <span><dt>Initial term</dt><dd>{place.tenure.initialTerm}</dd></span>
                </div>
                <div>
                  <Accessibility aria-hidden="true" size={18} />
                  <span><dt>Access fact</dt><dd>{primaryAccess.detail}</dd></span>
                </div>
              </dl>

              <div className="heads-up">
                <span>Heads Up · honest tradeoff</span>
                <p><strong>{place.headsUp[0].title}.</strong> {place.headsUp[0].detail}</p>
              </div>

              <p className="source-line">
                Facts checked {formatDate(place.freshness.checkedAt)} · Total Damage version {place.totalDamage.version}
              </p>

              <Button asChild variant="secondary" className="rundown-link">
                <Link href={"/places/" + place.slug}>
                  Open the full Rundown <ArrowRight aria-hidden="true" size={17} />
                </Link>
              </Button>

              {decision ? (
                <div className="decision-result">
                  <CircleCheck aria-hidden="true" size={20} />
                  <p><strong>{decisionMessage}</strong> Providers cannot see your Not It choice.</p>
                  <button onClick={onUndo}><Undo2 aria-hidden="true" size={17} /> Undo</button>
                </div>
              ) : null}

              <div id="flow-actions" className="decision-row" aria-label="Place decisions">
                <Button
                  variant="soft"
                  onClick={onPass}
                  aria-pressed={decision === "not-it"}
                >
                  <X aria-hidden="true" size={20} /> Not It
                </Button>
                <Button size="lg" onClick={onPullUp}>
                  Pull Up <ArrowUpRight aria-hidden="true" size={19} />
                </Button>
                <Button
                  variant="soft"
                  onClick={onKeep}
                  aria-pressed={decision === "keep"}
                >
                  <Heart aria-hidden="true" size={20} /> Keep
                </Button>
              </div>
              <p className="gesture-note">Optional: swipe the photo left for Not It or right to Keep. The labelled buttons always do the same thing.</p>
            </div>
          </motion.article>
        </section>

        <aside className="flow-rail" aria-label="Why this Place appears">
          <section className="rail-card match-card">
            <p className="micro-label">Why this Place appeared</p>
            <h3>{place.discovery.matchedCount} of {place.discovery.totalPriorities} priorities match.</h3>
            <ul>
              {place.discovery.criteria.map((criterion) => (
                <li key={criterion.id}>
                  <span>{criterion.matched ? <Check aria-hidden="true" size={16} /> : <X aria-hidden="true" size={16} />}</span>
                  <div>
                    <strong>{criterion.label}</strong>
                    <small>{criterion.explanation}</small>
                  </div>
                </li>
              ))}
            </ul>
            <button onClick={() => tell("Priority editing is planned, but no hidden profile is learning from you")}>
              How matching works <ArrowRight aria-hidden="true" size={16} />
            </button>
          </section>

          <section className="rail-card source-card">
            <p className="micro-label">Source-backed facts</p>
            <h3>Receipts before claims.</h3>
            <p>Every cost, access fact, tradeoff, and date points to a source record. This fixture is deliberately marked synthetic.</p>
            <dl>
              <div><dt>Provider identity</dt><dd>Not verified · synthetic</dd></div>
              <div><dt>Facts checked</dt><dd>{formatDate(place.freshness.checkedAt)}</dd></div>
              <div><dt>Next review</dt><dd>{formatDate(place.freshness.nextReviewAt)}</dd></div>
            </dl>
            <Link href={"/places/" + place.slug + "#sources-title"}>Review all sources <ArrowRight aria-hidden="true" size={16} /></Link>
          </section>

          <section className="rail-card day-one-card">
            <div className="day-one-top"><p className="micro-label">Day One</p><Share2 aria-hidden="true" size={18} /></div>
            <h3>Pull up together.</h3>
            <p>Maya can compare the Damage, join a tour, or run through selected Fine Print only when you share it.</p>
            <div className="day-one-person"><span>MK</span><div><strong>Maya K.</strong><small>Your Twin</small></div><i>Here</i></div>
            <Button variant="dark" onClick={onDayOne}>Open Day One <ArrowRight aria-hidden="true" size={17} /></Button>
          </section>

          <section className="rail-rule">
            <ShieldCheck aria-hidden="true" size={19} />
            <div><strong>Discovery is not allocation.</strong><p>{place.discovery.allocationFirewall}</p></div>
          </section>
        </aside>
      </div>
    </>
  );
}

function PlaceView({ tell }: { tell: (message: string) => void }) {
  const fixes = [
    { title: "Kitchen tap is dripping", status: "Booked", meta: "Sam arrives Tue, 10:00", icon: Wrench },
    { title: "Hall light replacement", status: "Done", meta: "Closed three days ago", icon: Zap },
  ];

  return (
    <>
      <div className="page-heading">
        <div><p className="eyebrow">Your home base</p><h1>My Place</h1><p>The home, bills, fixes, and building life in one calm view.</p></div>
        <Button onClick={() => tell("Fix report started")}><Wrench size={18} /> Report a fix</Button>
      </div>

      <section className="home-hero">
        <div className="home-image"><Image src="/images/place-interior.webp" alt="Warm living room at Cedar Commons" fill sizes="(max-width: 760px) 100vw, 42vw" unoptimized /></div>
        <div className="home-copy">
          <span className="good-status"><span /> All good at home</span>
          <p className="micro-label">Cedar Commons · Home 2B</p>
          <h2>Morning, Alex.</h2>
          <p>Your next housing charge is covered. The kitchen repair is booked, and the garden vote closes Friday.</p>
          <div className="home-stats"><span><small>Next TapIn</small><strong>£845 · 1 Sep</strong></span><span><small>Energy</small><strong>18% under target</strong></span></div>
        </div>
      </section>

      <div className="bento-grid">
        <section className="bento fixes-panel">
          <div className="panel-heading"><div><p className="micro-label">Fixes</p><h3>Things getting sorted</h3></div><button onClick={() => tell("Repair history opened")}>History <ArrowUpRight size={15} /></button></div>
          {fixes.map((fix) => {
            const Icon = fix.icon;
            return <div className="fix-row" key={fix.title}><span><Icon size={18} /></span><div><strong>{fix.title}</strong><small>{fix.meta}</small></div><i className={fix.status === "Done" ? "done" : "booked"}>{fix.status}</i></div>;
          })}
        </section>
        <section className="bento setup-panel">
          <p className="micro-label">The Setup</p><h3>Your home, less mysterious.</h3>
          <div className="setup-item"><Zap size={18} /><span><strong>Heat & energy</strong><small>Comfort mode · 20°C</small></span><button aria-label="Turn comfort mode off"><i /></button></div>
          <div className="setup-item"><Lock size={18} /><span><strong>Front door</strong><small>Locked · checked now</small></span><b>Safe</b></div>
          <Button variant="secondary" onClick={() => tell("The Setup opened")}>Open the Setup</Button>
        </section>
        <section className="bento damage-panel">
          <p className="micro-label">TapIn</p><h3>Next up</h3><strong className="big-cost">£845</strong><p>September home share<br />Scheduled for 1 September</p>
          <button onClick={() => tell("Total Damage opened")}>See the Damage <ArrowRight size={16} /></button>
        </section>
        <section className="bento board-panel">
          <div><p className="micro-label">The Board</p><h3>Your building, your vote.</h3><p>Should the south yard become a food garden?</p><span>Resident proposal · closes Friday at 18:00</span></div>
          <Button variant="dark" onClick={() => tell("Vote opened with the full context")}>Review and vote <ArrowUpRight size={17} /></Button>
        </section>
      </div>
    </>
  );
}

function CommonsView({ tell }: { tell: (message: string) => void }) {
  const resources = [
    { icon: Hammer, name: "Tool library", detail: "42 things ready", action: "Browse" },
    { icon: Bike, name: "Cargo bike", detail: "Free after 14:00", action: "Book" },
    { icon: Calendar, name: "Common room", detail: "Open Thursday", action: "Reserve" },
  ];

  return (
    <>
      <div className="page-heading">
        <div><p className="eyebrow">Shared abundance</p><h1>The Commons</h1><p>Borrow more, buy less, and make ordinary life lighter together.</p></div>
        <Button variant="secondary"><MapPin size={17} /> Near Cedar Commons</Button>
      </div>

      <section className="commons-feature">
        <div className="commons-image"><Image src="/images/commons.webp" alt="Neighbours sharing tools around a community table" fill sizes="(max-width: 760px) 100vw, 58vw" unoptimized /></div>
        <div className="commons-copy"><p className="micro-label">This week nearby</p><h2>Repair café<br />+ soup night</h2><p>Bring the thing that needs fixing, or just pull through for dinner. Tools, ingredients, and patient neighbours included.</p><div><span><Calendar size={17} /> Thu, 18:00</span><span><Building2 size={17} /> Cedar common room</span></div><Button variant="dark" onClick={() => tell("You are on the guest list")}>I’m pulling through <ArrowUpRight size={18} /></Button></div>
      </section>

      <section className="resource-section">
        <div className="section-heading"><div><p className="micro-label">Borrow nearby</p><h2>Useful stuff, already here.</h2></div><button onClick={() => tell("All shared resources opened")}>See everything <ArrowRight size={16} /></button></div>
        <div className="resource-grid">
          {resources.map((resource) => {
            const Icon = resource.icon;
            return <article key={resource.name}><span><Icon size={21} /></span><div><h3>{resource.name}</h3><p>{resource.detail}</p></div><button onClick={() => tell(`${resource.name} opened`)}>{resource.action} <ArrowUpRight size={15} /></button></article>;
          })}
        </div>
      </section>

      <section className="commons-principle"><Leaf size={22} /><div><strong>Commons, not points.</strong><p>No streaks, leaderboards, or guilt. Shared resources exist to make life cheaper, greener, and more connected.</p></div></section>
    </>
  );
}

function DayOneView({ tell }: { tell: (message: string) => void }) {
  const moves = [
    { name: "Run It By Me", line: "Review Cedar Commons", icon: Eye, tone: "sky" },
    { name: "Tag Team", line: "Compare two Places", icon: Users, tone: "garden" },
    { name: "Pull Through", line: "Join your next tour", icon: Calendar, tone: "sun" },
    { name: "Hold It Down", line: "Cover one chosen task", icon: ShieldCheck, tone: "coral" },
    { name: "Split It", line: "Share an approved cost", icon: Wallet, tone: "plum" },
    { name: "Check In", line: "A gentle safety check", icon: Heart, tone: "pink" },
  ];

  return (
    <>
      <div className="page-heading">
        <div><p className="eyebrow">Your people layer</p><h1>Day One</h1><p>More ways to move with someone you trust. Clear permission, zero surveillance.</p></div>
        <Button onClick={() => tell("Twin Up invitation ready")}><Users size={18} /> Twin Up</Button>
      </div>

      <section className="day-one-hero">
        <div className="day-one-visual"><span className="avatar-big first">AM</span><span className="link-heart"><Heart size={24} fill="currentColor" /></span><span className="avatar-big second">MK<i /></span></div>
        <div className="day-one-copy"><span className="good-status"><span /> Here when you need her</span><p className="micro-label">Your Twin</p><h2>Maya moves with you.</h2><p>She sees only what you deliberately share. No automatic access to messages, money, location, or your home.</p><div className="max-pass"><Key size={19} /><span><strong>Max Pass</strong><small>Two permissions · both expire Friday</small></span><button onClick={() => tell("Max Pass controls opened")}>Manage</button></div></div>
      </section>

      <section className="day-one-moves">
        <div className="section-heading"><div><p className="micro-label">Day One moves</p><h2>What are we doing together?</h2></div><button onClick={() => tell("All Day One moves opened")}>See all moves <ArrowRight size={16} /></button></div>
        <div className="move-grid">
          {moves.map((move) => {
            const Icon = move.icon;
            return <button key={move.name} onClick={() => tell(`${move.name} started`)}><span className={`move-icon ${move.tone}`}><Icon size={20} /></span><div><strong>{move.name}</strong><small>{move.line}</small></div><ArrowUpRight size={17} /></button>;
          })}
        </div>
      </section>

      <div className="day-one-lower">
        <section className="shared-plan"><p className="micro-label">Our Move</p><h3>Cedar Commons tour</h3><p>Maya is joining Tuesday at 17:30. You shared the Rundown and accessibility notes only.</p><div><Calendar size={19} /><span><strong>Tue, 17:30</strong><small>Meet at the main entrance</small></span></div><Button variant="secondary" onClick={() => tell("Shared plan opened")}>Open shared plan</Button></section>
        <section className="receipts"><p className="micro-label">Receipts</p><h3>Nothing happens in the dark.</h3><p>Every view, change, and expiry is visible to both of you.</p><ul><li><span /><div><strong>Maya viewed the Rundown</strong><small>Today · 10:42</small></div></li><li><span /><div><strong>You ended location sharing</strong><small>Yesterday · 19:08</small></div></li></ul><button onClick={() => tell("All receipts opened")}>See all receipts <ArrowRight size={16} /></button></section>
      </div>

      <section className="privacy-promise"><ShieldCheck size={21} /><div><strong>A Twin is a person you trust, not an AI copy.</strong><p>No automatic access, secret scoring, or selling relationship data.</p></div><button onClick={() => tell("Plain-language privacy promise opened")}>Read the promise</button></section>
    </>
  );
}

function MobileNav({ view, onChange }: { view: View; onChange: (view: View) => void }) {
  return (
    <nav className="mobile-nav" aria-label="Mobile navigation">
      {nav.map((item) => {
        const Icon = item.icon;
        return <button key={item.id} className={view === item.id ? "active" : ""} onClick={() => onChange(item.id)} aria-current={view === item.id ? "page" : undefined}><Icon size={19} /><span>{item.label}</span></button>;
      })}
    </nav>
  );
}

function PullUpDialog({
  open,
  onOpenChange,
  place,
  onPreviewed,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  place: PublicPlace;
  onPreviewed: () => void;
}) {
  const [mode, setMode] = useState("in-person");
  const [reviewed, setReviewed] = useState(false);

  useEffect(() => {
    if (!open) {
      const timer = window.setTimeout(() => setReviewed(false), 180);
      return () => window.clearTimeout(timer);
    }
  }, [open]);

  const choices = [
    { id: "in-person", title: "In-person tour", line: "Visit the Place with a named host", icon: Calendar },
    { id: "video", title: "Live video tour", line: "Ask questions while someone walks through", icon: Eye },
    { id: "accessible", title: "Accessible tour", line: "Add an accommodation without explaining more than needed", icon: Accessibility },
    { id: "trusted-person", title: "Trusted-person tour", line: "Let one chosen person attend this tour", icon: Users },
  ];
  const selected = choices.find((choice) => choice.id === mode) ?? choices[0];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={reviewed ? "pullup-dialog success" : "pullup-dialog"}>
        {reviewed ? (
          <div className="success-state">
            <div className="success-hut"><Image src="/brand/hut-static.png" alt="" width={128} height={128} unoptimized /></div>
            <p className="micro-label">Pull Up preview</p>
            <DialogTitle>Tour request preview ready.</DialogTitle>
            <DialogDescription>
              You chose a {selected.title.toLowerCase()} for {place.name}. This technical proof does not contact a provider or save personal information.
            </DialogDescription>
            <div className="success-receipt"><CircleCheck aria-hidden="true" size={19} /><span><strong>Nothing was sent</strong><small>A real request will show the host, time, access method, accommodation, information shared, and reporting route before confirmation.</small></span></div>
            <DialogClose asChild><Button size="lg">Back to Flow <ArrowRight size={18} /></Button></DialogClose>
          </div>
        ) : (
          <>
            <p className="micro-label">Pull Up to {place.name}</p>
            <DialogTitle>How would you like to tour?</DialogTitle>
            <DialogDescription>Choose a tour mode to preview the request. Nothing is sent, charged, or treated as an application.</DialogDescription>
            <div className="intent-list">
              {choices.map((choice) => {
                const Icon = choice.icon;
                return <button key={choice.id} className={mode === choice.id ? "selected" : ""} onClick={() => setMode(choice.id)} aria-pressed={mode === choice.id}><span className="intent-icon"><Icon aria-hidden="true" size={19} /></span><span><strong>{choice.title}</strong><small>{choice.line}</small></span><i>{mode === choice.id && <Check aria-hidden="true" size={15} />}</i></button>;
              })}
            </div>
            <div className="dialog-safety"><ShieldCheck aria-hidden="true" size={19} /><span><strong>Review before sharing</strong><small>The production flow will disclose every field and ask once more before sending.</small></span></div>
            <Button size="lg" className="dialog-primary" onClick={() => { setReviewed(true); onPreviewed(); }}>Preview this request <ArrowRight aria-hidden="true" size={18} /></Button>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
