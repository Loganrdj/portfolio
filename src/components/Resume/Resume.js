"use client";

import React, { useMemo, useState, useLayoutEffect, useEffect } from "react";
import "../../App.css";
import ExperienceModal from "./ExperienceModal";
import autodeskLogo from "../../logos/AutodeskLogo.png";
import trilogyLogo from "../../logos/TrilogyLogo.webp";
import usflogo from "../../logos/USFLogo.png";
import freelancelogo from "../../logos/globelogo.png";
import bungalowlogo from "../../logos/BungalowLogo.png";
import twitchLogo from "../../logos/TwitchLogo.png";
import berkeleyLogo from "../../logos/BerkeleyLogo.png";
import ShabuClubLogo from "../../logos/ShabuClubLogo.png";


const educationexp = [
  {
    start: "2020-02-01",
    end: "2021-08-01",
    title: "University of California, Berkeley",
    company: "Fullstack Development Coding Bootcamp",
    logo: berkeleyLogo,
    dateLabel: "Feb 2020 – Oct 2021",
    description: "",
    backgroundcolor: 'white',
    list_skills: ["MongoDB", "Express","ReactJS","Node","MySQL","SQL"],
    fontColor: 'black'
  },
  {
    start: "2015-08-01",
    end: "2019-05-01",
    title: "University of San Francisco",
    company: "Advertising, Computer Science",
    logo: usflogo,
    dateLabel: "Aug 2015 – May 2019",
    description: "",
    backgroundcolor: '#01543c',
    list_skills: ["Skills", "Testing"],
    fontColor: 'white'
  },
]

const experiences = [
  {
    start: "2016-02-01",
    end: "2016-08-01",
    title: "ITS Help Desk",
    company: "University of San Francisco",
    logo: usflogo,
    dateLabel: "Feb 2016 – Oct 2019",
    description: "Resolved a wide range of software and hardware issues, including memory failures, operating system errors, and general troubleshooting across various devices. Consistently recognized for outstanding customer support, maintaining a 99% satisfaction rating or higher based on client feedback.",
    backgroundcolor: '#01543c',
    list_skills: ["Skills", "Testing", "JAMF", "Zendesk", "Splunk", "Active Directory","Can turn things on and off again"],
    fontColor: 'white'
  },
  {
    start: "2016-08-01",
    end: "2018-10-01",
    title: "ITS System Administrator",
    company: "University of San Francisco",
    logo: usflogo,
    dateLabel: "Feb 2016 – Oct 2019",
    description: "Managed Virtual Machine Software (VMWare). Configured and support routers, switches, firewalls. Monitored network health, bandwidth usage, and resolved connectivity issues. Maintained backups, disaster-recovery plans, and regularly test restore procedures.",
    backgroundcolor: '#01543c',
    list_skills: ["VMWare","Looker","TeamViewer", "NAC", "Active Directory"],
    fontColor: 'white'
  },
  {
    start: "2018-01-28",
    end: "2021-02-01",
    title: "Kitchen, Server, Host",
    company: "Shabu Club",
    logo: ShabuClubLogo,
    dateLabel: "Jan 2018 – Feb 2021",
    description: "Worked across front and back-of-house roles in a fast-paced restaurant environment. Delivered attentive customer service, managed reservations and seating flow, and assisted with food prep and kitchen operations. Gained strong teamwork, multitasking, and communication skills through hands-on service experience.",
    backgroundcolor: 'black',
    list_skills: ["Customer Service", "Food Handling", "Can make a mean bowl of Shabu Shabu", "Can cut vegetables, sometimes"],
    fontColor: 'white'
  },
  {
    start: "2018-10-01",
    end: "2019-10-01",
    title: "Field Support / Level 2 Operations",
    company: "University of San Francisco",
    logo: usflogo,
    dateLabel: "Feb 2016 – Oct 2019",
    description: "Provided on-site technical support for faculty, staff, and students, resolving hardware, software, and network issues across campus. Installed and configured devices, performed system diagnostics, and maintained AV equipment in classrooms. Delivered timely, customer-focused service in a fast-paced academic environment.",
    backgroundcolor: '#01543c',
    list_skills: ["IP/TCP", "ServiceNow","MAC OS Repair","Windows OS Repair", "Active Directory"],
    fontColor: 'white'
  },
  {
    start: "2019-09-01",
    end: "2019-12-01",
    title: "Data Associate (Contract)",
    company: "Bungalow Living",
    logo: bungalowlogo,
    dateLabel: "Sept 2019 – Dec 2019",
    description: "Supported data entry, cleanup, and validation tasks to help maintain accurate property and tenant records. Collaborated with the operations team to ensure data consistency across internal systems. Lead internet growth and support channels.",
    backgroundcolor: '#f98d77',
    list_skills: ["Python","Microsoft Excel","VBA","Tableau"],
    fontColor: 'black'
  },
  {
    start: "2020-07-01",
    end: "2021-10-01",
    title: "Full Stack & Data Analytics TA/Tutor",
    company: "Trilogy Ed.",
    logo: trilogyLogo,
    dateLabel: "July 2020 – Oct 2021",
    description: "Assisted students in mastering full stack web development and data analytics, including technologies like JavaScript, Python, SQL, and React. Led code reviews, debug sessions, and one-on-one mentoring to support learning outcomes. Collaborated with instructors to deliver hands-on labs and ensure student success across coding bootcamp cohorts.",
    backgroundcolor: '#ffffff',
    list_skills: ["MongoDB", "Express","ReactJS","Node","MySQL","SQL","Tableau","R","Python","DBA","Microsoft Excel","Looker","Knows how to code Hello World in multiple languages"],
    fontColor: 'black'
  },
  {
    start: "2021-04-01",
    end: "2021-08-01",
    title: "Web Developer (Contract)",
    company: "Freelance",
    logo: freelancelogo,
    dateLabel: "April 2021 – May 2021",
    description: "Built responsive, user-friendly websites using HTML, CSS, JavaScript, and React. Collaborated with clients to design and implement custom features, optimize site performance, and ensure cross-browser compatibility. Deployed sites using platforms like Netlify and GitHub, with a focus on clean UI/UX and mobile-first design.",
    backgroundcolor: '#ffffff',
    list_skills: ["GatsbyJS","ReactJS","HTML","CSS","JavaScript","API Endpoints"],
    fontColor: 'black'
  },
  {
    start: "2021-03-01",
    end: "2023-09-01",
    title: "Demand Generation – Marketing Automation & Ops",
    company: "Autodesk",
    logo: autodeskLogo,
    dateLabel: "Mar 2021 – Sept 2023",
    description: "At Autodesk, I managed the execution and optimization of marketing automation campaigns across email, webinars, and chatbot channels. I supported demand generation by building and maintaining scalable workflows in platforms like Marketo and Salesforce combined with Zapier, ensuring data accuracy and lead flow efficiency. I collaborated cross-functionally with sales, product marketing, and design teams to streamline campaign execution, track KPIs, and refine segmentation strategies. Additionally, I played a key role in recruiting for our team, contributing to hiring decisions and fostering a collaborative team culture.",
    backgroundcolor: 'lightgray',
    list_skills: ["Marketo","Airtable","Zapier","Looker","Google Tags Manager","GoToMarket","Drift Chatbot/Email", "Slack", "Zoom", "Salesforce", "Looker", "Automate things to make co-workers less angry at each other"],
    fontColor: 'black'
  },
  {
    start: "2023-09-01",
    end: "2025-01-01",
    title: "Streamer & Marketing Consultant",
    company: "LoganRDJ LLC",
    logo: twitchLogo,
    dateLabel: "Sept 2023 – Jan 2025",
    description: "As a Twitch Partner and Marketing Consultant, I developed and executed a comprehensive growth plan for my own and other's channel and brand. This included managing a consistent streaming schedule, planning engaging content across gaming, IRL, and collaborative streams, and analyzing viewer data to optimize performance. I led the creative direction, branding, and promotion of the channel, collaborating with sponsors and managing partnerships with brands like Taco Bell and AT&T. Through targeted campaigns, audience engagement tactics, and cross-platform promotion, I grew my channels to over 100k combined followers and achieved sustained revenue growth of over $100K.",
    backgroundcolor: '#CBC3E3',
    list_skills: ["OBS","Adobe Photoshop","Adobe Premiere Pro","Adobe Premiere Rush", "Discord", "Event Management", "Sponsorship Strategy", "Content Strategy", "Audio Interface","Doesn't get shy in front of virtual audiences", "Can make a fool of myself in a good way"],
    fontColor: 'black'
  },
];

// Helper function placed outside the component to avoid recreation on each render
const createToPct = (minT, maxT) => (t) => ((t - minT) / (maxT - minT)) * 100;


export default function Resume() {
  const [selected, setSelected] = useState(null);
  const [view, setView] = useState("career");
  const [fading, setFading] = useState(false);
  const [atTop, setAtTop] = useState(true);

  useEffect(() => {
    document.body.classList.add("resume-background");
    return () => {
      document.body.classList.remove("resume-background");
    };
  }, []);

  // Ensure toggle is visible when returning to the page
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
    setAtTop(true);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0;
      setAtTop(scrollTop < 50);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleToggle = (newView) => {
    if (newView === view) return;
    setFading(true);
    setTimeout(() => {
      setView(newView);
      setFading(false);
    }, 300);
  };

  const expArray = view === "career" ? experiences : educationexp;

  // 1) Chronologically sort
  const sorted = useMemo(
    () => expArray.slice().sort((a, b) => Date.parse(a.start) - Date.parse(b.start)),
    [expArray]
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
  const toPct = useMemo(() => createToPct(minT, maxT), [minT, maxT]);


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
  }, [minT, maxT, toPct]);

  // 5) Magnify cards on scroll and adjust connector lengths
  useLayoutEffect(() => {

    const cardWidth = 280;
    let rafId;

    const update = () => {
      const items = document.querySelectorAll(".timeline-item");
      const mid = window.innerHeight / 2;
      items.forEach((el) => {
        const card      = el.querySelector(".card");
        const connector = el.querySelector(".connector");
        if (!card || !connector) return;
        const base      = parseFloat(el.dataset.baseconnector);
        const r         = el.getBoundingClientRect();
        const c         = r.top + r.height / 2;
        const dist      = Math.abs(c - mid);
        const ratio     = Math.max(0, 1 - dist / mid);
        const scale     = 0.8 + ratio * 0.4;
        card.style.transform = `scale(${scale})`;
        const dynamic  = base + (cardWidth * (1 - scale)) / 2;
        const factor   = dynamic / base;
        connector.style.transform = `translateY(-50%) scaleX(${factor})`;
      });
      rafId = requestAnimationFrame(update);
    };

    rafId = requestAnimationFrame(update);
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", update);
    };
  }, [sorted]);

  return (
    <>
    <div className="timeline-wrapper">
      <div
        className={`resume-toggle${atTop ? '' : ' slide-out'}`}
      >
        <button
          type="button"
          className={view === "career" ? "active" : ""}
          onClick={() => handleToggle("career")}
        >
          Career
        </button>
        <span> | </span>
        <button
          type="button"
          className={view === "education" ? "active" : ""}
          onClick={() => handleToggle("education")}
        >
          Education
        </button>
      </div>
      <div className={`timeline ${fading ? "fading" : ""}`}>
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
    </div>
    <ExperienceModal exp={selected} onClose={() => setSelected(null)} />
    </>
  );
}

