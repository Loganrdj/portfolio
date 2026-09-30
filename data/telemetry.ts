/**
 * Real numbers from Logan's résumé, presented as pipeline throughput.
 * Every value here must be defensible in an interview — no rounded-up vanity
 * metrics.
 *
 * Each metric carries the full story so the homepage can close on evidence
 * rather than a contact box: what went in, what got built, what came out.
 */
export type Metric = {
  value: string;
  label: string;
  /** Where the number comes from, so it can be verified. */
  source: string;
  /** The mess before. */
  input: string;
  /** What was actually built. */
  built: string;
  /** What it produced. */
  output: string;
};

export const metrics: Metric[] = [
  {
    value: "$100K+",
    label: "revenue generated",
    source: "LoganRDJ LLC — brand strategy consultancy",
    input:
      "Brands with an audience they couldn't convert, and creators with reach but no commercial structure behind it.",
    built:
      "A consultancy practice pairing campaign strategy with the tracking and automation to prove it worked — sponsorship pipelines, partnership terms, attribution.",
    output:
      "Over $100K in revenue across partners including Taco Bell and AT&T, with campaigns measurable enough to renew on.",
  },
  {
    value: "10,000+",
    label: "concurrent viewers",
    source: "Livestreamed content, peak concurrent audience",
    input:
      "An empty channel and a schedule nobody had a reason to show up for.",
    built:
      "A content system: a consistent format, cross-platform promotion, and community automation handling alerts, moderation and post-stream distribution.",
    output:
      "A Twitch Partner channel peaking above 10,000 concurrent viewers, and an audience that transferred to brand work.",
  },
  {
    value: "30%",
    label: "manual process cut",
    source: "Autodesk — webhook-driven lead pipelines",
    input:
      "Lead data spread across Marketo, Salesforce and Airtable, reconciled by hand, with scoring that arrived too late to act on.",
    built:
      "Custom API integrations and webhook-driven pipelines that automated lead scoring, campaign triggers and cross-platform syncing between all three.",
    output:
      "A 30% cut in manual process, plus A/B testing that lifted click-through 5–10% and form completions 15%.",
  },
  {
    value: "100+",
    label: "engineers mentored",
    source: "Trilogy Education — full-stack bootcamp",
    input:
      "Cohorts of career changers facing the full MERN stack with no mental model for how the pieces fit.",
    built:
      "A mentoring practice built on code review and debugging in the open — full-stack architecture, RESTful API design and schema modelling taught against real capstone projects.",
    output:
      "Over 100 engineers through the program, many into their first development role.",
  },
];
