import React from "react";
import { clsx as cn } from "clsx";
import { ArrowRight, Crown } from "lucide-react";

interface EnterpriseFeatureCtaProps {
  feature: string;
  description?: string;
  trialHref?: string;
  pricingHref?: string;
}

const linkBase =
  "inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition-colors !no-underline hover:!no-underline";

const EnterpriseFeatureCta: React.FC<EnterpriseFeatureCtaProps> = ({
  feature,
  description,
  trialHref = "https://www.jumpserver.com/free-trial",
  pricingHref = "https://www.jumpserver.com/pricing",
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
              Enterprise Feature
            </span>
            <div className="space-y-1.5">
              <p className="!m-0 text-[15px] font-semibold leading-snug text-gray-900 dark:text-white">
                {feature}
              </p>
              <p className="!m-0 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
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
            rel="noopener"
            className={cn(
              linkBase,
              "bg-primary !text-white hover:bg-primary/90 hover:!text-white"
            )}
          >
            Free Trial
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
          <a
            href={pricingHref}
            target="_blank"
            rel="noopener"
            className={cn(
              linkBase,
              "border border-primary/30 bg-white/60 !text-primary hover:border-primary/50 hover:bg-white hover:!text-primary dark:bg-neutral-900/40 dark:hover:bg-neutral-900/70"
            )}
          >
            See Plans
          </a>
        </div>
      </div>
    </div>
  );
};

export default EnterpriseFeatureCta;
