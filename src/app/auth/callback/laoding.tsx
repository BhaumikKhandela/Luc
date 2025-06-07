import { Spinner } from "@/components/global/loader/spinner";
import React from "react";

type Props = {};

const AuthLoading = (props: Props) => {
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <Spinner />
    </div>
  );
};

export default AuthLoading;
