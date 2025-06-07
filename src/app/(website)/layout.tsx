import React from "react";
import LandingPageNavBar from "./_components/LandingPageNavBar";
type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div className="min-h-screen flex flex-col">
      <LandingPageNavBar />
      <main className="flex-grow">{children}</main>
    </div>
  );
};

export default Layout;
