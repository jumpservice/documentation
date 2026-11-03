import { Link } from "@rspress/core/theme-original";
import { ArrowRight, Crown } from "lucide-react";

const trialUrl = "https://www.jumpserver.com/free-trial";
const contactUrl = "https://www.jumpserver.com/contact";

export default function EnterpriseEditionCta() {
  return (
    <section
      aria-labelledby="enterprise-edition-cta"
      className="not-prose my-5 overflow-hidden rounded-xl border border-primary/20 bg-gradient-to-r from-surface-feature via-surface to-canvas dark:border-white/10 dark:from-teal-mid/50 dark:via-teal-deep dark:to-teal-deep"
    >
      <div className="flex flex-col gap-3 px-4 py-3 sm:px-5">
        <div className="flex min-w-0 items-start gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary dark:bg-primary/15 dark:text-brand-light">
            <Crown className="h-4 w-4" aria-hidden="true" />
          </span>
          <div className="min-w-0 space-y-1">
            <p
              id="enterprise-edition-cta"
              style={{ margin: 0 }}
              className="text-sm font-semibold leading-5 text-ink dark:text-white"
            >
              JumpServer Enterprise Edition
            </p>
            <p
              style={{ margin: 0 }}
              className="text-xs leading-5 text-slate dark:text-white/65"
            >
              Custom RBAC, multi-tenant organizations, enterprise SSO, and
              SLA-backed support. 14-day free trial, no credit card required.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:pl-12">
          <a
            href={trialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="jms-btn jms-btn-primary !h-8 !bg-primary !px-3 !text-xs !leading-5 !text-white !no-underline hover:!bg-primary-deep hover:!text-white hover:!no-underline"
          >
            Start 14-day free trial
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
          <a
            href={contactUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="jms-btn jms-btn-secondary !inline-flex !h-8 !items-center !justify-center !px-3 !text-xs !font-medium !leading-5 !text-ink !no-underline hover:!text-primary hover:!no-underline dark:!text-white dark:hover:!text-brand-light"
          >
            Contact sales
          </a>
          <Link
            href="/reference/compare-editions"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              textDecoration: "none",
            }}
            className="text-xs font-medium text-primary underline-offset-2 hover:underline dark:text-brand-light"
          >
            Compare editions
          </Link>
        </div>
      </div>
    </section>
  );
}
