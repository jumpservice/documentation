import React from "react";
import { clsx as cn } from "clsx";
import { ArrowRight, Crown } from "lucide-react";

interface EnterpriseFeatureCtaProps {
  feature: string;
  description?: string;
  trialHref?: string;
  pricingHref?: string;
  contactHref?: string;
}

const linkBase =
  "inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition-colors !no-underline hover:!no-underline";

const EnterpriseFeatureCta: React.FC<EnterpriseFeatureCtaProps> = ({
  feature,
  description,
  trialHref = "https://www.jumpserver.com/free-trial",
  pricingHref = "https://www.jumpserver.com/pricing",
  contactHref = "https://www.jumpserver.com/contact",
}) => {
  return (
    <div
      className={cn(
        "enterprise-feature-cta not-prose my-6 overflow-hidden rounded-xl",
        "border border-primary/15 bg-gradient-to-r from-primary/[0.06] to-primary/[0.02]",
        "shadow-sm ring-1 ring-primary/5"
      )}
    >
      <div className="flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 flex-1 gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10">
            <Crown className="h-5 w-5 text-primary" strokeWidth={2} />
          </div>

          <div className="min-w-0">
            <span className="mb-3 inline-block rounded-sm bg-primary/10 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-primary">
              Enterprise Edition
            </span>
            <div className="space-y-1.5">
              <p className="!m-0 text-[15px] font-semibold leading-snug text-ink dark:text-white">
                {feature}
              </p>
              <p className="!m-0 text-sm leading-relaxed text-slate dark:text-white/70">
                Requires JumpServer Enterprise Edition.
                {description && <> {description}</>}
              </p>
            </div>
          </div>
        </div>

        <div className="flex shrink-0 flex-col gap-2 sm:flex-row sm:items-center">
          <a
            href={trialHref}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              linkBase,
              "bg-primary !text-white hover:bg-primary/90 hover:!text-white"
            )}
          >
            Start 14-day trial
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
          <a
            href={pricingHref}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              linkBase,
              "border border-primary/30 bg-white/60 !text-primary hover:border-primary/50 hover:bg-white hover:!text-primary dark:bg-teal-mid/40 dark:hover:bg-teal-mid/60"
            )}
          >
            View pricing
          </a>
          <a
            href={contactHref}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-primary underline-offset-2 hover:underline dark:text-brand-light"
          >
            Contact sales
          </a>
        </div>
      </div>
    </div>
  );
};

export default EnterpriseFeatureCta;
