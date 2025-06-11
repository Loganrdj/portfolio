"use client";

import React, { useMemo, useEffect } from "react";
import "../../App.css";

const experiences = [
  { start: "2016-02-01", end: "2019-10-01", title: "Field Support / Level 2 Ops / Help Desk",          dateLabel: "Feb 2016 – Oct 2019" },
  { start: "2019-09-01", end: "2019-12-01", title: "Data Associate (Contract), Bungalow Living",   dateLabel: "Sept 2019 – Dec 2019" },
  { start: "2020-07-01", end: "2021-10-01", title: "Full Stack & Data Analytics TA/Tutor, Trilogy Ed.", dateLabel: "July 2020 – Oct 2021" },
  { start: "2021-01-01", end: "2021-05-01", title: "Web Developer (Contract), OUR Group",            dateLabel: "Jan 2021 – May 2021" },
  { start: "2021-03-01", end: "2023-09-01", title: "Demand Generation – Marketing Automation & Ops, Autodesk", dateLabel: "Mar 2021 – Sept 2023" },
  { start: "2023-09-01", end: null,         title: "Streamer & Content Manager, LoganRDJ LLC",      dateLabel: "Sept 2023 – Present" },
];

export default function Resume() {
  // 1) Chronologically sort
  const sorted = useMemo(
    () => experiences.slice().sort((a, b) => Date.parse(a.start) - Date.parse(b.start)),
    []
  );

  // 2) Compute timeline bounds
  const [minT, maxT] = useMemo(() => {
    const stamps = sorted.map((e) => Date.parse(e.start));
    return [Math.min(...stamps), Math.max(...stamps, Date.now())];
  }, [sorted]);

  // 3) Helper: timestamp → % down timeline
  const toPct = (t) => ((t - minT) / (maxT - minT)) * 100;

  // 4) Build ticks array (years + quarters)
  const ticks = useMemo(() => {
    const startY = new Date(minT).getFullYear();
    const endY   = new Date(maxT).getFullYear();
    const arr    = [];
    for (let y = startY; y <= endY; y++) {
      const yTime = Date.parse(`${y}-01-01`);
      if (yTime >= minT && yTime <= maxT) arr.push({ type: "year",  label: y,     top: toPct(yTime) });
      for (let m of [1,4,7,10]) {
        const mTime = Date.parse(`${y}-${String(m).padStart(2,"0")}-01`);
        if (mTime > minT && mTime < maxT) arr.push({ type: "month", top: toPct(mTime) });
      }
    }
    return arr;
  }, [minT, maxT]);

  // 5) Magnify cards on scroll
  useEffect(() => {
    const items = document.querySelectorAll(".timeline-item");
    const fn = () => {
      const mid = window.innerHeight / 2;
      items.forEach((el) => {
        const r     = el.getBoundingClientRect();
        const c     = r.top + r.height / 2;
        const dist  = Math.abs(c - mid);
        const ratio = Math.max(0, 1 - dist / (mid + r.height));
        const scale = 0.8 + ratio * 0.4;
        el.style.transform = `translateY(-50%) scale(${scale})`;
      });
    };
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    window.addEventListener("resize", fn);
    return () => {
      window.removeEventListener("scroll", fn);
      window.removeEventListener("resize", fn);
    };
  }, []);

  return (
    <div className="timeline">
      {/* Spine */}
      <div className="spine" />

      {/* Ticks */}
      {ticks.map((t, i) => (
        <div
          key={i}
          className={`timeline-tick ${t.type}`}
          style={{ position: "absolute", top: `${t.top}%` }}
        >
          {t.type === "year" && <span>{t.label}</span>}
        </div>
      ))}

      {/* Events */}
      {sorted.map((exp, i) => {
        const side     = i % 2 ? "left" : "right";
        const startPct = toPct(Date.parse(exp.start));
        const nudged   = startPct;  // place card at its actual start position

        // Count how many prior overlaps on same side
        const overlapIndex = sorted.slice(0, i).filter((o, j) => {
          const s2    = Date.parse(o.start),
                e2    = o.end ? Date.parse(o.end) : maxT,
                side2 = j % 2 ? "left" : "right";
          return side2 === side &&
                 Date.parse(exp.start) <= e2 &&
                 s2 <= Date.parse(exp.start);
        }).length;

        // Compute horizontal offset:
        // half the card width + base connector length + per-overlap bump
        const cardWidth     = 280;
        const baseConnector = 60;
        const bump          = 40;
        const connectorLen  = baseConnector + bump * overlapIndex;
        const offsetX       = cardWidth + connectorLen;

        // inline styles:
        const barStyle = {
          position: "absolute",
          top: `${nudged}%`,
          left: "50%",
          transform: "translateX(-50%)",
          height: exp.end
            ? `${toPct(Date.parse(exp.end)) - startPct}%`
            : "5%",
          width: "4px",
          background: "#0ea5e9",
          zIndex: 0,
        };

        const cardLeft = side === "left"
          ? `calc(50% - ${offsetX}px)`
          : `calc(50% + ${connectorLen}px)`;

        return (
          <React.Fragment key={i}>
            <div className="timeline-duration" style={barStyle} />

            <div
              className={`timeline-item ${side}`}
              style={{
                top: `${nudged}%`,
                left: cardLeft,
              }}
            >
              <div className="card">
                <h3>{exp.title}</h3>
                <em>{exp.dateLabel}</em>
              </div>

              <div
                className="connector"
                style={{ width: `${connectorLen}px` }}
              />
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
}
