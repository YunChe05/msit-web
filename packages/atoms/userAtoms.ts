import { atom } from "jotai";
import { atomWithQuery, atomWithMutation } from "jotai-tanstack-query";
import { errorHandler, makeRequest } from "../utils/axios";
import { AxiosError } from "axios";

export const loginAtom = atomWithMutation((get) => ({
  mutationKey: ["login"],
  mutationFn: async (payload: { identifier: string; password: string }) => {
    try {
      const res = await makeRequest.post("/auth/local", payload);
      console.log(res.data);
      return res.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        errorHandler(error);
      }
    }
  },
}));
