import { useVersion } from "@rspress/core/runtime";
import releaseNotes from "@/data/release-notes.json";

interface ReleaseSection {
  title: string;
  items: string[];
}

interface ReleaseNote {
  version: string;
  date: string;
  url: string;
  summary: string;
  sections: ReleaseSection[];
}

const notes = releaseNotes as ReleaseNote[];

export default function ReleaseNotes() {
  const version = useVersion() || "v5";
  const releases = notes.filter((release) =>
    release.version.startsWith(`${version}.`),
  );

  if (releases.length === 0) {
    return (
      <p>
        Detailed release notes are not available for this version yet. See the{" "}
        <a href="https://github.com/jumpserver/jumpserver/releases">
          JumpServer releases page
        </a>
        .
      </p>
    );
  }

  return (
    <div className="mt-8 space-y-12">
      {releases.map((release) => (
        <section key={release.version} className="scroll-mt-24">
          <div className="flex flex-wrap items-baseline gap-3">
            <h3
              id={`release-${release.version}`}
              className="!my-0 text-xl font-semibold text-ink dark:text-white"
            >
              {release.version}
            </h3>
            <span className="text-sm text-steel dark:text-white/60">
              {release.date}
            </span>
          </div>
          <p className="mt-2 text-sm leading-6 text-slate dark:text-white/75">
            {release.summary}{" "}
            <a
              href={release.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary !no-underline hover:!underline dark:text-brand-light"
            >
              GitHub release notes
            </a>
          </p>
          {release.sections.map((section) => (
            <div key={section.title} className="mt-5">
              <h4 className="!mb-2 !mt-0 text-base font-semibold text-ink dark:text-white">
                {section.title}
              </h4>
              <ul className="mt-2 space-y-1.5 pl-5 text-sm leading-6 text-slate dark:text-white/75">
                {section.items.map((item) => (
                  <li key={item} className="list-disc">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      ))}
    </div>
  );
}
