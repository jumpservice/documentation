import React from "react";
import Icon from "./icons";

const ApplyTrialLicense = ({ showBorder = true }) => {
  return (
    <div
      className={`my-5 flex flex-col gap-3 rounded-lg bg-surface-feature p-4 dark:bg-teal-mid/30 sm:flex-row sm:items-center sm:justify-between ${
        showBorder ? "border border-primary/40" : ""
      }`}
    >
      <div className="flex min-w-0 items-start gap-3">
        <span className="mt-0.5 shrink-0 text-primary">
          <Icon name="xpack" />
        </span>
        <div className="text-sm leading-6 text-slate dark:text-white/75">
          <p className="!m-0 font-semibold text-ink dark:text-white">
            Try JumpServer Enterprise Edition free for 14 days
          </p>
          <p className="!m-0">
            No credit card required. Includes custom RBAC, enterprise SSO,
            multi-tenancy, and SLA-backed support.
          </p>
        </div>
      </div>
      <div className="flex shrink-0 flex-wrap items-center gap-2">
        <a
          className="jms-btn jms-btn-primary !h-8 !px-3 !text-xs !leading-5 !text-white !no-underline hover:!text-white hover:!no-underline"
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.jumpserver.com/free-trial"
        >
          Request free trial
        </a>
        <a
          className="jms-btn jms-btn-secondary !h-8 !px-3 !text-xs !leading-5 !no-underline"
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.jumpserver.com/contact"
        >
          Contact sales
        </a>
      </div>
    </div>
  );
};

export default ApplyTrialLicense;
