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
  /**
   * Horizontal lane for the bar. Concurrent roles get different lanes so the
   * overlap is visible instead of one bar hiding behind another.
   */
  lane: number;
  /** Companies whose roles ran at the same time as this one. */
  concurrentWith: string[];
};

export type Timeline = {
  items: TimelineItem[];
  ticks: { year: number; pct: number }[];
  height: number;
  /** Widest lane index in use, so the CSS knows how much gutter to reserve. */
  laneCount: number;
};

// Tallest rendered card is ~361px (measured); this clears it with margin so
// two cards on the same side can never collide.
const MIN_CARD_GAP = 400;
/** Generous allowance for the tallest rendered card, used to size the track. */
const CARD_ALLOWANCE = 430;

/**
 * A role is current if its end is blank or the word "Present" — so the data
 * can say what a résumé says, rather than needing a placeholder date.
 */
export function isPresent(end: string | undefined | null): boolean {
  if (!end) return true;
  return end.trim().toLowerCase() === "present";
}

/**
 * Lays out a proportional timeline at build time — no runtime measurement.
 *
 * Reads newest-first: the axis runs from today at the top to the earliest role
 * at the bottom, so the most relevant work is what you see on arrival.
 *
 * Bars keep their true dates so the chart stays honest about how long each role
 * ran. Where roles genuinely overlapped, the bars are placed in separate lanes
 * so you can see two things running at once. Cards are nudged apart only as far
 * as needed to stay readable, with a connector back to the true position.
 */
export function buildTimeline(list: Experience[], height = 3200): Timeline {
  const now = Date.now();

  const parsed = list
    .map((exp) => {
      const start = Date.parse(exp.start);
      const ongoing = isPresent(exp.end);
      const end = ongoing ? now : Date.parse(exp.end);
      return { exp, start, end: Number.isNaN(end) ? now : end, ongoing };
    })
    .sort((a, b) => b.start - a.start);

  const min = Math.min(...parsed.map((p) => p.start));
  const max = Math.max(...parsed.map((p) => p.end));
  const pad = (max - min) * 0.04;
  const lo = min - pad;
  const hi = max + pad;
  // Inverted on purpose: the newest date sits at the top of the chart.
  const pct = (t: number) => ((hi - t) / (hi - lo)) * 100;

  // --- lanes: concurrent roles must not share one ---------------------------
  // Walk in start order and take the first lane whose last occupant has
  // finished. Anything that cannot reuse a lane was genuinely running at the
  // same time as something else, which is exactly what we want to show.
  const laneStarts: number[] = [];
  const lanes = parsed.map((p) => {
    // Walking newest-first, a lane is reusable when its current occupant
    // started after this role finished — i.e. they never ran together.
    let lane = laneStarts.findIndex((startsAt) => startsAt >= p.end);
    if (lane === -1) {
      lane = laneStarts.length;
      laneStarts.push(p.start);
    } else {
      laneStarts[lane] = p.start;
    }
    return lane;
  });

  let lastLeft = -Infinity;
  let lastRight = -Infinity;

  const items: TimelineItem[] = parsed.map((p, i) => {
    const startPct = pct(p.start);
    // With the axis inverted the end date is the higher edge. A current role
    // runs clean off the top of the chart rather than stopping at today's tick.
    const endPct = p.ongoing ? 0 : pct(p.end);
    const barTop = (endPct / 100) * height;
    const barHeight = Math.max(8, ((startPct - endPct) / 100) * height);
    const side: "left" | "right" = i % 2 === 0 ? "right" : "left";

    // Nudge down only if this card would collide with the previous one on the
    // same side; the bar stays where the dates actually put it.
    const lastOnSide = side === "left" ? lastLeft : lastRight;
    const cardTop = Math.max(barTop, lastOnSide + MIN_CARD_GAP);
    if (side === "left") lastLeft = cardTop;
    else lastRight = cardTop;

    // Who else was running during this role?
    const concurrentWith = parsed
      .filter(
        (q, j) => j !== i && q.start < p.end && p.start < q.end
      )
      .map((q) => q.exp.company);

    return {
      exp: p.exp,
      startPct,
      endPct,
      barTop,
      barHeight,
      cardTop,
      side,
      ongoing: p.ongoing,
      lane: lanes[i],
      concurrentWith: [...new Set(concurrentWith)],
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

  return {
    items,
    ticks,
    height: trackHeight,
    laneCount: Math.max(1, laneStarts.length),
  };
}
