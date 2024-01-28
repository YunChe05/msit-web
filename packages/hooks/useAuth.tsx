import { useAtom, useSetAtom } from "jotai";
import { loginAtom } from "../atoms/userAtoms";
import { useEffect } from "react";

export const useLogin = () => {
  const [{ mutate, status }] = useAtom(loginAtom);

  useEffect(() => {
    mutate({ identifier: "mikebarquilla8@gmail.com", password: "12345678" });
  }, []);
};
