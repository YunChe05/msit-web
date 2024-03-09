import { useAtomValue, useSetAtom } from "jotai";
import { getPostsAtom, paginationAtom } from "../atoms/postAtoms";

export const useGetPosts = () => {
  const { data, isLoading } = useAtomValue(getPostsAtom);
  const { data: posts, meta } = data || {};
  const setPage = useSetAtom(paginationAtom);

  const handlePagination = (page: number) => {
    setPage((prev) => ({ ...prev, page }));
  };

  return { posts, meta, isLoading, handlePagination };
};
