import { useAtom, useSetAtom } from "jotai";
import { loginAtom } from "../atoms/userAtoms";
import { useEffect } from "react";

export const useLogin = () => {
  const [{ mutate, isSuccess, isPending, isError, error }] = useAtom(loginAtom);

  return { mutate, isSuccess, isError, error, isPending };
};
