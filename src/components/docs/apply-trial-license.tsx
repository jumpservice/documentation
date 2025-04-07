import React from "react";
import Icon from "./icons";
import NextLink from "next/link";

const ApplyTrialLicense = () => {

  return (
    <div className="grid grid-cols-[3%_auto] gap-2 my-5 p-2 border-2 border-primary items-start justify-start rounded-lg">
      <div className="">
        <Icon name="xpack" />
      </div>
      <div className="text-md">
        Experience the full features of the JumpServer enterprise edition with a 14-day free trial — <NextLink className="underline text-nowrap ml-1 font-normal text-primary" target="_blank" href="https://www.lxware.hk/pages/about">Contact us</NextLink> today to get started and explore all the benefits!
      </div>
    </div>
 );
};

export default ApplyTrialLicense;