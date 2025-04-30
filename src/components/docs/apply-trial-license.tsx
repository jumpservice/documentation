import React from "react";
import Icon from "./icons";
import NextLink from "next/link";

const ApplyTrialLicense = () => {

  return (
    <div className="grid grid-cols-[3%_auto] gap-2 my-5 p-2 border border-primary items-center justify-center rounded-lg">
      <div className="">
        <Icon name="xpack" />
      </div>
      <div className="text-md">
        Try JumpServer Enterprise free for 14 days — <NextLink className="underline text-nowrap ml-1 font-normal text-primary" target="_blank" href="mailto:sales@lxware.hk">Contact us</NextLink> to get started !
      </div>
    </div>
 );
};

export default ApplyTrialLicense;