import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { accessTokenAtom, loginAtom, profileAtom } from "../atoms/userAtoms";
import { useEffect } from "react";
import { RESET } from "jotai/utils";

export const useLogin = () => {
  const [{ mutate, isSuccess, isPending, isError, error, data }] =
    useAtom(loginAtom);
  const setAccessToken = useSetAtom(accessTokenAtom);

  const accessToken = data?.jwt;
  useEffect(() => {
    if (isSuccess) {
      setAccessToken(accessToken);
    }
  });
  return { mutate, isSuccess, isError, error, isPending };
};

export const useLogout = () => {
  const setAccessToken = useSetAtom(accessTokenAtom);

  const logout = () => {
    setAccessToken(RESET);
  };

  return { logout };
};

export const useProfile = () => {
  const { data, isLoading, isFetching } = useAtomValue(profileAtom);

  return { data, isLoading, isFetching };
};
