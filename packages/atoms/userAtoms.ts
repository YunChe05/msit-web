import { atom } from "jotai";
import { atomWithQuery, atomWithMutation } from "jotai-tanstack-query";
import { errorHandler, makeRequest } from "../utils/axios";
import { AxiosError } from "axios";
import { LoginPayload } from "../types/user";
import { atomWithStorage } from "jotai/utils";

export const accessTokenAtom = atomWithStorage("accessToken", null);

export const loginAtom = atomWithMutation((get) => ({
  mutationKey: ["login"],
  mutationFn: async (payload: LoginPayload) => {
    try {
      const res = await makeRequest.post("/auth/local", payload);
      return res.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        errorHandler(error);
      }
    }
  },
}));
