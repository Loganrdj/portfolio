/**
 * Real numbers from Logan's résumé, presented as pipeline throughput.
 * Every value here must be defensible in an interview — no rounded-up vanity
 * metrics.
 */
export type Metric = {
  value: string;
  label: string;
  /** Where the number comes from, so it can be verified. */
  source: string;
};

export const metrics: Metric[] = [
  {
    value: "$100K+",
    label: "revenue generated",
    source: "LoganRDJ LLC — brand strategy consultancy",
  },
  {
    value: "10,000+",
    label: "concurrent viewers",
    source: "Livestreamed content, peak concurrent audience",
  },
  {
    value: "30%",
    label: "manual process cut",
    source: "Autodesk — webhook-driven lead pipelines",
  },
  {
    value: "100+",
    label: "engineers mentored",
    source: "Trilogy Education — full-stack bootcamp",
  },
];
