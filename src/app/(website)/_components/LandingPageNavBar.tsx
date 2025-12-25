import { Menu, User } from "lucide-react";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
type Props = {};

const LandingPageNavBar = (props: Props) => {
  return (
    <div className="sticky top-0 z-50 flex width-full justify-between items-center py-5 bg-gradient-to-b from-pink-500/5 to-transparent">
      <div className="text-3xl mx-2 font-semibold flex items-center gap-x-3">
        <Image alt="logo" src="/opal-logo.svg" width={40} height={40} />
        Opal
      </div>
     
      <div className="mx-2">
        <Link href="/auth/sign-in">
          <Button className="text-base flex gap-x-2">
            <User fill="#000" />
            Login
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPageNavBar;
