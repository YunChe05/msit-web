import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { accessTokenAtom, loginAtom, profileAtom } from "../atoms/userAtoms";
import { useEffect } from "react";
import { RESET } from "jotai/utils";
import { useRouter } from "next/navigation";
import { Alert } from "@mui/material";
import {
  createUserAtom,
  editUserAtom,
  getProfilesAtom,
} from "../atoms/studentAtoms";
import { ProfilesQueryData, RegisterPayload, UserProfile } from "../types/user";
import { parsedStringDateToDate } from "../helper/parseDateTime";
import { randomId } from "@mui/x-data-grid-generator";
import { profile } from "console";

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

  const parsedProfile: UserProfile[] =
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
        id: user.id,
        studentId,
        email: user.email,
        username: user.username,
        firstName,
        middleName,
        lastName,
        birthDate: parsedStringDateToDate(birthDate),
        college: college.code.toUpperCase(),
        course: course.code.toUpperCase(),
      };
    }) || [];

  const getSingleProfile = (userId: number): UserProfile | undefined => {
    const profile = profiles?.find((profile) => userId === profile.user.id);
    if (!profile) {
      return;
    }
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
      id: user.id,
      studentId,
      email: user.email,
      username: user.username,
      firstName,
      middleName,
      lastName,
      birthDate,
      college: `${college.id}:${college.collegeName}`,
      course: `${course.id}:${course.name}`,
    };
  };

  return { parsedProfile, getSingleProfile, isLoading, isFetching };
};
export const useCreateProfile = () => {
  const { mutate, isError, isSuccess, error, reset } =
    useAtomValue(createUserAtom);

  return { createUser: mutate, isSuccess, isError, error, reset };
};

export const useEditProfile = () => {
  const { mutate, isError, isSuccess, error, reset } =
    useAtomValue(editUserAtom);

  return { editUser: mutate, isSuccess, isError, error, reset };
};
