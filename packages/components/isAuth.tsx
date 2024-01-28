// isAuth.tsx

"use client";
import { useLayoutEffect } from "react";
import { redirect } from "next/navigation";
import { isAuthenticated } from "../utils/isAuthenticated";

export default function isAuth(Component: any, toLogin?: boolean) {
  return function IsAuth(props: any) {
    const auth = isAuthenticated();

    useLayoutEffect(() => {
      if (!auth) {
        return redirect("/login");
      }
    }, []);

    if (!auth) {
      return null;
    }

    return <Component {...props} />;
  };
}
