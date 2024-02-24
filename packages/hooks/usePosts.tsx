import { useAtomValue } from "jotai";
import { getPostsAtom } from "../atoms/postAtoms";

export const useGetPosts = () => {
  const { data, isLoading } = useAtomValue(getPostsAtom);
  const { data: posts, meta } = data || {};

  return { posts, meta, isLoading };
};
