import type { Experience } from "@/data/experience";

export type TimelineItem = {
  exp: Experience;
  /** True position of the role on the axis, as % of the span. */
  startPct: number;
  endPct: number;
  /** Where the card actually sits, in px, after collision nudging. */
  cardTop: number;
  /** Where the bar sits, in px — the honest position. */
  barTop: number;
  barHeight: number;
  side: "left" | "right";
  ongoing: boolean;
};

export type Timeline = {
  items: TimelineItem[];
  ticks: { year: number; pct: number }[];
  height: number;
};

// Tallest rendered card is ~361px (measured); this clears it with margin so
// two cards on the same side can never collide.
const MIN_CARD_GAP = 400;
/** Generous allowance for the tallest rendered card, used to size the track. */
const CARD_ALLOWANCE = 430;

/**
 * Lays out a proportional timeline at build time — no runtime measurement.
 *
 * Bars keep their true dates so the chart stays honest about how long each
 * role ran and where roles overlapped. Cards are nudged apart only as far as
 * needed to stay readable, and a connector links each card back to its bar.
 */
export function buildTimeline(list: Experience[], height = 3200): Timeline {
  const parsed = list
    .map((exp) => {
      const start = Date.parse(exp.start);
      const ongoing = !exp.end;
      const end = ongoing ? Date.now() : Date.parse(exp.end);
      return { exp, start, end, ongoing };
    })
    .sort((a, b) => a.start - b.start);

  const min = Math.min(...parsed.map((p) => p.start));
  const max = Math.max(...parsed.map((p) => p.end));
  const pad = (max - min) * 0.04;
  const lo = min - pad;
  const hi = max + pad;
  const pct = (t: number) => ((t - lo) / (hi - lo)) * 100;

  let lastLeft = -Infinity;
  let lastRight = -Infinity;

  const items: TimelineItem[] = parsed.map((p, i) => {
    const startPct = pct(p.start);
    const endPct = pct(p.end);
    const barTop = (startPct / 100) * height;
    const barHeight = Math.max(8, ((endPct - startPct) / 100) * height);
    const side: "left" | "right" = i % 2 === 0 ? "right" : "left";

    // Nudge down only if this card would collide with the previous one on the
    // same side; the bar stays where the dates actually put it.
    const lastOnSide = side === "left" ? lastLeft : lastRight;
    const cardTop = Math.max(barTop, lastOnSide + MIN_CARD_GAP);
    if (side === "left") lastLeft = cardTop;
    else lastRight = cardTop;

    return {
      exp: p.exp,
      startPct,
      endPct,
      barTop,
      barHeight,
      cardTop,
      side,
      ongoing: p.ongoing,
    };
  });

  const firstYear = new Date(lo).getFullYear();
  const lastYear = new Date(hi).getFullYear();
  const ticks = [];
  for (let y = firstYear; y <= lastYear; y++) {
    const t = Date.parse(`${y}-01-01`);
    if (t >= lo && t <= hi) ticks.push({ year: y, pct: pct(t) });
  }

  // The track was a fixed height while cards get nudged downward to avoid
  // colliding. With enough overlapping roles the last cards ran past the
  // bottom of the container and collided with the section beneath. The track
  // now grows to whatever the layout actually needs, so it stays correct as
  // roles are added.
  const contentBottom = items.reduce(
    (lowest, it) =>
      Math.max(lowest, it.cardTop + CARD_ALLOWANCE, it.barTop + it.barHeight),
    0
  );
  const trackHeight = Math.max(height, Math.ceil(contentBottom) + 24);

  return { items, ticks, height: trackHeight };
}
