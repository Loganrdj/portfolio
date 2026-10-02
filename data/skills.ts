/**
 * THE canonical skills list.
 *
 * Previously this lived in two places that disagreed: a hardcoded object in
 * Home.js (rendered) and SkillsCard/skills.json (imported by nothing). Both
 * are replaced by this module.
 *
 * Grouped to match the résumé's own "Technical Skills" headings so the site
 * and the PDF never drift apart.
 */
export type SkillGroup = {
  /** Short machine-ish label used for the node readout. */
  key: string;
  label: string;
  skills: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    key: "lang",
    label: "Languages",
    skills: ["Python", "SQL", "JavaScript", "TypeScript", "Java", "Swift"],
  },
  {
    key: "frontend",
    label: "Frontend",
    skills: [
      "React",
      "Next.js",
      "React Native",
      "SwiftUI",
      "GatsbyJS",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
      "Material UI",
      "Bootstrap",
      "Mapbox GL",
      "PWA",
    ],
  },
  {
    key: "backend",
    label: "Backend",
    skills: [
      "Node.js",
      "Express.js",
      "FastAPI",
      "Flask",
      "GraphQL",
      "REST APIs",
      "PostgreSQL",
      "MongoDB",
      "MySQL",
      "SQLAlchemy",
      "Alembic",
      "Pydantic",
      "OAuth 2.0",
      "JWT Auth",
    ],
  },
  {
    key: "tools",
    label: "Developer Tools",
    skills: [
      "Git",
      "GitHub",
      "Docker",
      "Vite",
      "pytest",
      "Jupyter Notebook",
      "Postman",
      "Netlify",
      "Render",
      "Claude",
      "GPT",
      "GitHub Copilot",
    ],
  },
  {
    key: "ops",
    label: "Platforms & Automation",
    skills: [
      "OpenAI API",
      "Gmail API",
      "Salesforce",
      "Marketo",
      "HubSpot",
      "Zapier",
      "Airtable",
      "Google Analytics",
      "Tableau",
    ],
  },
];

export const allSkills: string[] = skillGroups.flatMap((g) => g.skills);
