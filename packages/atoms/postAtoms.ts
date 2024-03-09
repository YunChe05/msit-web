import { atomWithQuery } from "jotai-tanstack-query";
import { accessTokenAtom } from "./userAtoms";
import { errorHandler, makeRequest } from "../utils/axios";
import { MakePayload } from "../types/helperType";
import { PostsQueryData } from "../types/post";
import { AxiosError } from "axios";
import { atom } from "jotai";

export const paginationAtom = atom({ page: 1, pageSize: 10 });

export const searchAtom = atom<string | undefined>(undefined);

export const getPostsAtom = atomWithQuery((get) => ({
  queryKey: [
    "getPosts",
    get(accessTokenAtom),
    get(paginationAtom),
    get(searchAtom),
  ],
  enabled: !!get(accessTokenAtom),
  queryFn: async () => {
    const { page, pageSize } = get(paginationAtom);
    const search = get(searchAtom);
    try {
      const { data } = await makeRequest.get<PostsQueryData>("/posts", {
        params: {
          populate: "deep",
          filters: {
            $or: [
              { title: { $contains: search } },
              {
                profile: {
                  $or: [
                    { studentId: { $contains: search } },
                    { firstName: { $contains: search } },
                    { middleName: { $contains: search } },
                    { lastName: { $contains: search } },
                    {
                      course: { code: { $contains: search } },
                    },
                    {
                      college: { code: { $contains: search } },
                    },
                  ],
                },
              },
            ],
          },
          sort: "id:desc",
          pagination: {
            page,
            pageSize,
          },
        },
      });
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        errorHandler(error);
      }
    }
  },
}));
