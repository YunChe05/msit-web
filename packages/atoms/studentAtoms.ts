import { atomWithQuery } from "jotai-tanstack-query";
import { accessTokenAtom, loginAtom } from "./userAtoms";
import { errorHandler, makeRequest } from "../utils/axios";
import { AxiosError } from "axios";
import { MakePayload } from "../types/helperType";
import { College, Profile } from "../types/user";

export const collegeAtom = atomWithQuery((get) => ({
  queryKey: ["college", get(accessTokenAtom)],
  enabled: !!get(accessTokenAtom),
  refetchOnMount: false,
  queryFn: async () => {
    try {
      const { data } = await makeRequest.get<MakePayload<College[]>>(
        "colleges?populate=deep"
      );
      return data.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        errorHandler(error);
      }
    }
  },
  retry: false,
}));

export const getProfilesAtom = atomWithQuery((get) => ({
  queryKey: ["getProfiles", get(accessTokenAtom)],
  enabled: !!get(accessTokenAtom),
  refetchOnMount: false,
  queryFn: async () => {
    try {
      const { data } = await makeRequest.get<MakePayload<Profile[]>>(
        "profiles?populate=deep"
      );
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        errorHandler(error);
      }
    }
  },
  retry: false,
}));
