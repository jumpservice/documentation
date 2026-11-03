import { clsx as cn } from "clsx";

type VersionBadgeKind = "new" | "changed" | "deprecated" | "removed";

interface VersionBadgeProps {
  /** Version that introduced or changed the feature, for example "5.1.0" or "v5.1.0". */
  version: string;
  /** Kind of change. Defaults to "new". */
  kind?: VersionBadgeKind;
}

const labels: Record<VersionBadgeKind, string> = {
  new: "New in",
  changed: "Changed in",
  deprecated: "Deprecated in",
  removed: "Removed in",
};

const styles: Record<VersionBadgeKind, string> = {
  new: "border-primary/40 bg-primary/10 text-primary-deep dark:border-brand-light/40 dark:bg-brand-light/10 dark:text-brand-light",
  changed:
    "border-accent-blue/30 bg-accent-blue/10 text-accent-blue dark:border-accent-blue/50 dark:bg-accent-blue/20 dark:text-white/80",
  deprecated:
    "border-accent-orange/40 bg-accent-orange/10 text-accent-orange dark:border-accent-orange/50 dark:bg-accent-orange/15 dark:text-accent-orange",
  removed:
    "border-[#C2413A]/40 bg-[#C2413A]/10 text-[#C2413A] dark:border-[#F0A19C]/50 dark:bg-[#C2413A]/20 dark:text-[#F0A19C]",
};

const normalizeVersion = (version: string) =>
  version.startsWith("v") ? version : `v${version}`;

/**
 * Inline version badge used to mark when a feature was introduced or last changed.
 * Rendered as: "New in v5.1.0".
 */
export default function VersionBadge({
  version,
  kind = "new",
}: VersionBadgeProps) {
  return (
    <span
      className={cn(
        "my-1 inline-flex w-fit items-center gap-1 rounded-full border px-2.5 py-0.5 align-middle text-[11px] font-semibold leading-5 tracking-[0.02em]",
        styles[kind],
      )}
    >
      {labels[kind]} {normalizeVersion(version)}
    </span>
  );
}
