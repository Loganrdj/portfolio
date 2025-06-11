"use client";

import React, { useMemo, useEffect, useState } from "react";
import "../../App.css";
import ExperienceModal from "./ExperienceModal";
import placeholderLogo from "../../low_contrast_linen.png";
import autodeskLogo from "../../logos/AutodeskLogo.png";
import trilogyLogo from "../../logos/TrilogyLogo.webp";
import usflogo from "../../logos/USFLogo.png";
import freelancelogo from "../../logos/globelogo.png";
import bungalowlogo from "../../logos/BungalowLogo.png";
import twitchLogo from "../../logos/TwitchLogo.png";

const lorem =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

const experiences = [
  {
    start: "2016-02-01",
    end: "2019-10-01",
    title: "Field Support / Level 2 Ops / Help Desk",
    company: "University of San Francisco",
    logo: usflogo,
    dateLabel: "Feb 2016 – Oct 2019",
    description: lorem,
    backgroundcolor: '#01543c',
    fontColor: 'white'
  },
  {
    start: "2019-09-01",
    end: "2019-12-01",
    title: "Data Associate (Contract)",
    company: "Bungalow Living",
    logo: bungalowlogo,
    dateLabel: "Sept 2019 – Dec 2019",
    description: lorem,
    backgroundcolor: '#f98d77',
    fontColor: 'black'
  },
  {
    start: "2020-07-01",
    end: "2021-10-01",
    title: "Full Stack & Data Analytics TA/Tutor",
    company: "Trilogy Ed.",
    logo: trilogyLogo,
    dateLabel: "July 2020 – Oct 2021",
    description: lorem,
    backgroundcolor: '#ffffff',
    fontColor: 'black'
  },
  {
    start: "2021-01-01",
    end: "2021-05-01",
    title: "Web Developer (Contract)",
    company: "Freelance",
    logo: freelancelogo,
    dateLabel: "Jan 2021 – May 2021",
    description: lorem,
    backgroundcolor: '#ffffff',
    fontColor: 'black'
  },
  {
    start: "2021-03-01",
    end: "2023-09-01",
    title: "Demand Generation – Marketing Automation & Ops",
    company: "Autodesk",
    logo: autodeskLogo,
    dateLabel: "Mar 2021 – Sept 2023",
    description: lorem,
    backgroundcolor: 'lightgray',
    fontColor: 'black'
  },
  {
    start: "2023-09-01",
    end: null,
    title: "Streamer & Content Manager",
    company: "LoganRDJ LLC",
    logo: twitchLogo,
    dateLabel: "Sept 2023 – Present",
    description: lorem,
    backgroundcolor: '#CBC3E3',
    fontColor: 'black'
  },
];

// Education timeline data
const educationexp = [
  {
    start: "2014-08-01",
    end: "2018-05-01",
    title: "B.S. Studies",
    company: "University of San Francisco",
    logo: usflogo,
    dateLabel: "Aug 2014 – May 2018",
    description: lorem,
    backgroundcolor: "#01543c",
    fontColor: "white",
  },
  {
    start: "2019-01-01",
    end: "2019-06-01",
    title: "Full Stack Bootcamp",
    company: "Trilogy Education",
    logo: trilogyLogo,
    dateLabel: "Jan 2019 – Jun 2019",
    description: lorem,
    backgroundcolor: "#ffffff",
    fontColor: "black",
  },
];

export default function Resume() {
  const [selected, setSelected] = useState(null);
  const [activeTab, setActiveTab] = useState("career");

  const data = activeTab === "education" ? educationexp : experiences;

  // 1) Chronologically sort
  const sorted = useMemo(
    () => data.slice().sort((a, b) => Date.parse(a.start) - Date.parse(b.start)),
    [data]
  );

  // 2) Compute timeline bounds with one year buffer
  const [minT, maxT] = useMemo(() => {
    const startTimes = sorted.map((e) => Date.parse(e.start));
    const endTimes   = sorted.map((e) =>
      e.end ? Date.parse(e.end) : Date.now()
    );
    const buffer = 365 * 24 * 60 * 60 * 1000; // one year
    const min = Math.min(...startTimes) - buffer;
    const max = Math.max(...endTimes) + buffer;
    return [min, max];
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

  // 5) Magnify cards on scroll and adjust connector lengths
  useEffect(() => {
    const items = document.querySelectorAll(".timeline-item");
    const cardWidth = 280;
    const fn = () => {
      const mid = window.innerHeight / 2;
      items.forEach((el) => {
        const card      = el.querySelector(".card");
        const connector = el.querySelector(".connector");
        const base      = parseFloat(el.dataset.baseconnector);
        const r         = el.getBoundingClientRect();
        const c         = r.top + r.height / 2;
        const dist      = Math.abs(c - mid);
        const ratio     = Math.max(0, 1 - dist / (mid + r.height));
        const scale     = 0.8 + ratio * 0.4;
        card.style.transform = `scale(${scale})`;
        const dynamic = base + (cardWidth * (1 - scale)) / 2;
        connector.style.width = `${dynamic}px`;
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
    <>
    <div className="exp-toggle">
      <span
        className={activeTab === "career" ? "active" : ""}
        onClick={() => setActiveTab("career")}
      >
        Career
      </span>
      <span className="separator"> | </span>
      <span
        className={activeTab === "education" ? "active" : ""}
        onClick={() => setActiveTab("education")}
      >
        Education
      </span>
    </div>
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
      {(() => {
        // track end time and mid point for each lane so cards never overlap
        const lanes = { left: [], right: [] };
        return sorted.map((exp, i) => {
          const side  = i % 2 ? "left" : "right";
          const start = Date.parse(exp.start);
          const end   = exp.end ? Date.parse(exp.end) : maxT;

          const startPct = toPct(start);
          const endPct   = exp.end ? toPct(Date.parse(exp.end)) : toPct(maxT);
          const midPct   = startPct + (endPct - startPct) / 2;

          // assign to the first lane that is free and spaced out
          // increased from 5 to 15 so larger cards don't overlap
          const minGap = 15; // % between event centers
          const laneData = lanes[side];
          let laneIndex = laneData.findIndex(({ endTime, mid }) => {
            return endTime <= start && Math.abs(midPct - mid) >= minGap;
          });
          if (laneIndex === -1) {
            laneIndex = laneData.length;
            laneData.push({ endTime: end, mid: midPct });
          } else {
            laneData[laneIndex] = { endTime: end, mid: midPct };
          }

          const nudged   = midPct; // center card on the duration

          const cardWidth     = 280;
          const laneGap       = 16;
          const baseConnector = 60;
          const bracketSpacing = 8;
          const connectorLen  = baseConnector + laneIndex * (cardWidth + laneGap);

          // inline styles
          const bracketLeft = side === "left"
            ? `calc(50% - 2% - ${laneIndex * bracketSpacing}px)`
            : `calc(50% + 2% + ${laneIndex * bracketSpacing}px)`;

          const bracketStyle = {
            position: "absolute",
            top: `${startPct}%`,
            left: bracketLeft,
            transform: "translateX(-50%)",
            height: exp.end
              ? `${toPct(Date.parse(exp.end)) - startPct}%`
              : "5%",
          };

          const cardLeft = side === "left"
            ? `calc(50% - 2% - ${laneIndex * bracketSpacing}px - ${connectorLen + cardWidth}px)`
            : `calc(50% + 2% + ${laneIndex * bracketSpacing}px + ${connectorLen}px)`;

          return (
            <React.Fragment key={i}>
              <div className={`duration-bracket ${side}`} style={bracketStyle} />

            <div
              className={`timeline-item ${side}`}
              data-baseconnector={connectorLen}
              style={{
                top: `${nudged}%`,
                left: cardLeft,
                cursor: "pointer",
              }}
              onClick={() => setSelected(exp)}
            >
              <div className="card" style={{ backgroundColor: exp.backgroundcolor, color: exp.fontColor }}>
                <img src={exp.logo} alt={`${exp.company} logo`} className="exp-logo" />
                <h3>{exp.title}</h3>
                <p className="company">{exp.company}</p>
                <em>{exp.dateLabel}</em>
              </div>

              <div
                className="connector"
                style={{ width: `${connectorLen}px` }}
              />
            </div>
          </React.Fragment>
        );
        });
      })()}
    </div>
    <ExperienceModal exp={selected} onClose={() => setSelected(null)} />
    </>
  );
}

