import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { getPostsAtom, paginationAtom, searchAtom } from "../atoms/postAtoms";

export const useGetPosts = () => {
  const { data, isLoading } = useAtomValue(getPostsAtom);
  const { data: posts, meta } = data || {};
  const setPage = useSetAtom(paginationAtom);

  const handlePagination = (page: number) => {
    setPage((prev) => ({ ...prev, page }));
  };

  return { posts, meta, isLoading, handlePagination };
};

export const useSearch = () => {
  const [search, setSearch] = useAtom(searchAtom);

  const handleSearch = (text?: string) => {
    setSearch(text);
  };

  return {
    search,
    handleSearch,
    handleClearSearch: () => setSearch(undefined),
  };
};
