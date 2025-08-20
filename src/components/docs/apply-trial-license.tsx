import React from "react";
import Icon from "./icons";
import NextLink from "next/link";

const ApplyTrialLicense = ({ showBorder = true }) => {
  return (
    <div
      className={`grid grid-cols-[3%_auto] gap-2 my-5 p-2 items-center justify-center rounded-lg ${
        showBorder ? "border border-primary" : ""
      }`}
    >
      <div>
        <Icon name="xpack" />
      </div>
      <div className="text-md">
        Try JumpServer Enterprise free for 14 days —{" "}
        <NextLink
          className="text-nowrap ml-1 font-normal text-primary hover:underline"
          target="_blank"
          href="mailto:sales@lxware.hk"
        >
          Contact us <Icon name="send" />
        </NextLink>{" "}
        to get started !
      </div>
    </div>
  );
};

export default ApplyTrialLicense;