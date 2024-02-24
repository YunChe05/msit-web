import { atomWithQuery } from "jotai-tanstack-query";
import { accessTokenAtom } from "./userAtoms";
import { errorHandler, makeRequest } from "../utils/axios";
import { MakePayload } from "../types/helperType";
import { PostsQueryData } from "../types/post";
import { AxiosError } from "axios";

export const getPostsAtom = atomWithQuery((get) => ({
  queryKey: ["getPosts", get(accessTokenAtom)],
  enabled: !!get(accessTokenAtom),
  queryFn: async () => {
    try {
      const { data } = await makeRequest.get<PostsQueryData>(
        "/posts?populate=deep"
      );
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        errorHandler(error);
      }
    }
  },
}));
