import { onAuthenticateUser } from "@/app/actions/user";
import { redirect } from "next/navigation";
import React from "react";

type Props = {};

const AuthCallbackPage = async (props: Props) => {
  const auth = await onAuthenticateUser();

  if (auth.status === 200 || auth.status === 201) {
    return redirect(`/dashboard/${auth.user?.workspace[0].id}`);
  }

  if (
    auth.status === 400 ||
    auth.status === 404 ||
    auth.status === 500 ||
    auth.status === 403
  ) {
    console.log(auth.status);
    return redirect("/auth/sign-in");
  }
};

export default AuthCallbackPage;
