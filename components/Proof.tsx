"use client";

import { useState } from "react";
import { metrics } from "@/data/telemetry";

/**
 * The homepage close: evidence instead of a contact box.
 *
 * Each headline number from the hero opens into the story behind it —
 * the mess that went in, the system built, what came out. Selecting a number
 * swaps the panel, so the section argues rather than asserts.
 */
export function Proof() {
  const [active, setActive] = useState(0);
  const m = metrics[active];

  return (
    <section className="proof" aria-labelledby="proof-heading">
      <div className="proof-inner">
        <p className="sec-kicker">Proof</p>
        <h2 id="proof-heading" className="sec-title">
          Every number has a
          <br />
          system behind it.
        </h2>

        <div className="proof-body">
          <div className="proof-tabs" role="tablist" aria-label="Results">
            {metrics.map((x, i) => (
              <button
                key={x.label}
                role="tab"
                type="button"
                id={`proof-tab-${i}`}
                aria-selected={i === active}
                aria-controls="proof-panel"
                className="proof-tab"
                data-active={i === active || undefined}
                onClick={() => setActive(i)}
              >
                <span className="proof-tab-value">{x.value}</span>
                <span className="proof-tab-label">{x.label}</span>
              </button>
            ))}
          </div>

          <div
            className="proof-panel"
            id="proof-panel"
            role="tabpanel"
            aria-labelledby={`proof-tab-${active}`}
            key={active}
          >
            <p className="proof-source">{m.source}</p>
            <ol className="proof-steps">
              <li>
                <span className="proof-step-label">Input</span>
                <p>{m.input}</p>
              </li>
              <li>
                <span className="proof-step-label">Built</span>
                <p>{m.built}</p>
              </li>
              <li>
                <span className="proof-step-label">Output</span>
                <p>{m.output}</p>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
