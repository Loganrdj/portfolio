import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { WorkTabs } from "@/components/WorkTabs";
import { codingProjects, creativeProjects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Software and automation systems alongside creative direction and campaign work by Logan Moss.",
};

export default function ProjectsPage() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <section className="sec">
          <div className="sec-inner">
            <p className="sec-kicker">Work</p>
            <h2 className="sec-title">
              I make the thing.
              <br />
              Then I make it run itself.
            </h2>
            <p className="resume-lede">
              {codingProjects.length} software projects and{" "}
              {creativeProjects.length} creative ones. Different kinds of
              evidence, so they get their own shelves.
            </p>

            <WorkTabs
              disciplines={[
                {
                  key: "software",
                  label: "Software & Automation",
                  blurb:
                    "Full-stack applications, scoring engines and the pipelines behind them.",
                  items: codingProjects,
                },
                {
                  key: "creative",
                  label: "Creative Direction",
                  blurb:
                    "Campaigns, merch lines and shoots for brands with an audience already watching.",
                  items: creativeProjects,
                },
              ]}
            />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
