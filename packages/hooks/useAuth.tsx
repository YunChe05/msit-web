import { useAtom, useAtomValue, useSetAtom } from "jotai";
import {
  accessTokenAtom,
  loginAtom,
  profileAtom,
  registerAtom,
} from "../atoms/userAtoms";
import { useEffect } from "react";
import { RESET } from "jotai/utils";
import { useRouter } from "next/navigation";
import { Alert } from "@mui/material";
import { getProfilesAtom } from "../atoms/studentAtoms";
import { ProfilesQueryData, RegisterPayload } from "../types/user";
import { parsedStringDateToDate } from "../helper/parseDateTime";
import { randomId } from "@mui/x-data-grid-generator";

export const useLogin = () => {
  const [{ mutate, isSuccess, isPending, isError, error, data }] =
    useAtom(loginAtom);
  const setAccessToken = useSetAtom(accessTokenAtom);
  const router = useRouter();

  const accessToken = data?.jwt;
  useEffect(() => {
    if (isSuccess) {
      setAccessToken(accessToken);
      router.push("/");
    }
  }, [isSuccess]);

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

export const useGetProfilesAtom = () => {
  const { data, isLoading, isFetching } = useAtomValue(getProfilesAtom);

  const { data: profiles, meta } =
    (data as ProfilesQueryData | undefined) || {};

  const parsedProfile =
    profiles?.map((profile) => {
      const {
        birthDate,
        college,
        id,
        course,
        firstName,
        lastName,
        middleName,
        user,
        studentId,
      } = profile;
      return {
        id,
        studentId,
        email: user.email,
        userName: user.username,
        firstName,
        middleName,
        lastName,
        birthDate: parsedStringDateToDate(birthDate),
        college: college.code.toUpperCase(),
        course: course.code.toUpperCase(),
      };
    }) || [];
  return { parsedProfile, isLoading, isFetching };
};
export const useCreateProfile = () => {};
