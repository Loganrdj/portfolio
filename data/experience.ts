// Ported from the previous Resume.js. This is now the single source of
// truth for career + education content; no component defines it inline.
//
// `backgroundcolor`/`fontColor` are carried over from the old card design.
// The pipeline design assigns node colors from the paint palette instead, but
// the values are preserved rather than dropped.

export type Experience = {
  start: string;
  /** Empty string means "present". */
  end: string;
  title: string;
  company: string;
  /** Public path, e.g. /assets/logos/AutodeskLogo.png */
  logo: string;
  dateLabel: string;
  description: string;
  list_skills: string[];
  backgroundcolor: string;
  fontColor: string;
};

export const experiences: Experience[] = [
  {
    "start": "2016-02-01",
    "end": "2016-08-01",
    "title": "ITS Help Desk",
    "company": "University of San Francisco",
    "logo": "/assets/logos/USFLogo.png",
    "dateLabel": "Feb 2016 – Oct 2019",
    "description": "Resolved a wide range of software and hardware issues, including memory failures, operating system errors, and general troubleshooting across various devices. Consistently recognized for outstanding customer support, maintaining a 99% satisfaction rating or higher based on client feedback.",
    "backgroundcolor": "#01543c",
    "list_skills": [
      "Skills",
      "Testing",
      "JAMF",
      "Zendesk",
      "Splunk",
      "Active Directory",
      "Can turn things on and off again"
    ],
    "fontColor": "white"
  },
  {
    "start": "2016-08-01",
    "end": "2018-10-01",
    "title": "ITS System Administrator",
    "company": "University of San Francisco",
    "logo": "/assets/logos/USFLogo.png",
    "dateLabel": "Feb 2016 – Oct 2019",
    "description": "Managed Virtual Machine Software (VMWare). Configured and support routers, switches, firewalls. Monitored network health, bandwidth usage, and resolved connectivity issues. Maintained backups, disaster-recovery plans, and regularly test restore procedures.",
    "backgroundcolor": "#01543c",
    "list_skills": [
      "VMWare",
      "Looker",
      "TeamViewer",
      "NAC",
      "Active Directory"
    ],
    "fontColor": "white"
  },
  {
    "start": "2018-01-28",
    "end": "2021-02-01",
    "title": "Kitchen, Server, Host",
    "company": "Shabu Club",
    "logo": "/assets/logos/ShabuClubLogo.png",
    "dateLabel": "Jan 2018 – Feb 2021",
    "description": "Worked across front and back-of-house roles in a fast-paced restaurant environment. Delivered attentive customer service, managed reservations and seating flow, and assisted with food prep and kitchen operations. Gained strong teamwork, multitasking, and communication skills through hands-on service experience.",
    "backgroundcolor": "black",
    "list_skills": [
      "Customer Service",
      "Food Handling",
      "Can make a mean bowl of Shabu Shabu",
      "Can cut vegetables, sometimes"
    ],
    "fontColor": "white"
  },
  {
    "start": "2018-10-01",
    "end": "2019-10-01",
    "title": "Field Support / Level 2 Operations",
    "company": "University of San Francisco",
    "logo": "/assets/logos/USFLogo.png",
    "dateLabel": "Feb 2016 – Oct 2019",
    "description": "Provided on-site technical support for faculty, staff, and students, resolving hardware, software, and network issues across campus. Installed and configured devices, performed system diagnostics, and maintained AV equipment in classrooms. Delivered timely, customer-focused service in a fast-paced academic environment.",
    "backgroundcolor": "#01543c",
    "list_skills": [
      "IP/TCP",
      "ServiceNow",
      "MAC OS Repair",
      "Windows OS Repair",
      "Active Directory"
    ],
    "fontColor": "white"
  },
  {
    "start": "2019-09-01",
    "end": "2019-12-01",
    "title": "Operations Data Analyst (Contract)",
    "company": "Bungalow Living",
    "logo": "/assets/logos/BungalowLogo.png",
    "dateLabel": "Sept 2019 – Dec 2019",
    "description": "Supported data entry, cleanup, and validation tasks to help maintain accurate property and tenant records. Collaborated with the operations team to ensure data consistency across internal systems. Lead internet growth and support channels.",
    "backgroundcolor": "#f98d77",
    "list_skills": [
      "Python",
      "Microsoft Excel",
      "VBA",
      "Tableau"
    ],
    "fontColor": "black"
  },
  {
    "start": "2020-07-01",
    "end": "2021-10-01",
    "title": "Full Stack Technical Mentor",
    "company": "Trilogy Ed.",
    "logo": "/assets/logos/TrilogyLogo.webp",
    "dateLabel": "July 2020 – Oct 2021",
    "description": "Mentored cohorts of students through the MERN stack (MongoDB, Express.js, React, Node.js), guiding them through full-stack architecture, RESTful API design, and database schema modeling in a remote, project-based curriculum. Provided 1:1 and group code reviews, debugging support, and technical feedback on capstone projects, translating complex full-stack concepts into digestible guidance for learners at varying skill levels.",
    "backgroundcolor": "#ffffff",
    "list_skills": [
      "MongoDB",
      "Express.js",
      "React",
      "Node.js",
      "REST APIs",
      "Full-Stack Architecture",
      "Database Schema Design",
      "Code Review",
      "Mentoring"
    ],
    "fontColor": "black"
  },
  {
    "start": "2021-04-01",
    "end": "2021-08-01",
    "title": "Full Stack Developer (Contract)",
    "company": "OUR Group",
    "logo": "/assets/logos/globelogo.png",
    "dateLabel": "April 2021 – May 2021",
    "description": "Built a full-stack web application using GatsbyJS, implementing lazy loading and performance optimizations to deliver fast, smooth page load times across the front-end. Collaborated closely with a UX designer to translate wireframes and design specs into responsive, production-ready components, aligning technical implementation with user experience goals.",
    "backgroundcolor": "#ffffff",
    "list_skills": [
      "GatsbyJS",
      "React",
      "HTML",
      "CSS",
      "JavaScript",
      "Lazy Loading",
      "Performance Optimization",
      "Responsive Design",
      "UX Collaboration"
    ],
    "fontColor": "black"
  },
  {
    "start": "2021-03-01",
    "end": "2023-09-01",
    "title": "Marketing Automation & Operations - Demand Generation",
    "company": "Autodesk",
    "logo": "/assets/logos/AutodeskLogo.png",
    "dateLabel": "Mar 2021 – Sept 2023",
    "description": "Built custom API integrations connecting Marketo, Zapier, and Airtable, including webhook-driven data pipelines that automated lead scoring, campaign triggers, and cross-platform syncing, cutting manual processes by 30%. Developed Airtable-based statistical significance algorithms on survey data scraped from SurveyMonkey, enabling rigorous A/B testing on email and landing pages that lifted CTR 5–10% and form completions 15%.",
    "backgroundcolor": "lightgray",
    "list_skills": [
      "Marketo",
      "Zapier",
      "Airtable",
      "SurveyMonkey",
      "Webhooks",
      "API Integrations",
      "A/B Testing",
      "Lead Scoring Automation"
    ],
    "fontColor": "black"
  },
  {
    "start": "2023-09-01",
    "end": "2025-01-01",
    "title": "Founder, Brand Strategy And Marketing Operations",
    "company": "LoganRDJ LLC",
    "logo": "/assets/logos/TwitchLogo.png",
    "dateLabel": "Sept 2023 – Jan 2025",
    "description": "Founded a brand strategy consultancy generating $100K+ in revenue through data-driven campaigns with partners including Taco Bell and AT&T. Advised clients on content and platform strategy, producing livestreamed content for audiences of 10,000+ concurrent viewers.",
    "backgroundcolor": "#CBC3E3",
    "list_skills": [
      "Brand Strategy",
      "Data-Driven Campaigns",
      "Partnership Management",
      "Content Strategy",
      "Platform Strategy",
      "Livestreaming"
    ],
    "fontColor": "black"
  },
  {
    "start": "2026-03-01",
    "end": "2026-04-29",
    "title": "Audio/Visual Technician",
    "company": "AEG Presents",
    "logo": "/assets/logos/AEGPLogo.jpeg",
    "dateLabel": "Mar 2026 – Present",
    "description": "Designed and implemented the architecture of multi-display AV systems for festivals and concerts using VMIX, Blackmagic devices, and Stream Deck software, which streamlined setup and improved system reliability.",
    "backgroundcolor": "#CBC3E3",
    "list_skills": [
      "VMIX",
      "Blackmagic",
      "Stream Deck",
      "AV Systems Architecture",
      "Live Event Production"
    ],
    "fontColor": "black"
  }
];

export const education: Experience[] = [
  {
    "start": "2020-02-01",
    "end": "2021-08-01",
    "title": "University of California, Berkeley",
    "company": "Fullstack Development Coding Bootcamp",
    "logo": "/assets/logos/BerkeleyLogo.png",
    "dateLabel": "Feb 2020 – Oct 2021",
    "description": "",
    "backgroundcolor": "white",
    "list_skills": [
      "Fullstack Development",
      "MERN Stack",
      "JavaScript",
      "React",
      "Node.js",
      "Express.js",
      "MongoDB"
    ],
    "fontColor": "black"
  },
  {
    "start": "2015-08-01",
    "end": "2019-05-01",
    "title": "University of San Francisco",
    "company": "Advertising, Computer Science",
    "logo": "/assets/logos/USFLogo.png",
    "dateLabel": "Aug 2015 – May 2019",
    "description": "",
    "backgroundcolor": "#01543c",
    "list_skills": [
      "Advertising",
      "Computer Science",
      "Marketing",
      "Business",
      "Programming"
    ],
    "fontColor": "white"
  }
];

/** Newest first, by start date. */
export function byRecency(list: Experience[]): Experience[] {
  return [...list].sort((a, b) => Date.parse(b.start) - Date.parse(a.start));
}
