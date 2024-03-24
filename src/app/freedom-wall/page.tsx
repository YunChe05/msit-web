"use client";

import Layout from "../components/layout";
import isAuth from "../../../packages/components/isAuth";
import { PostCard } from "../../../packages/components/PostCard";
import { useGetPosts, useSearch } from "../../../packages/hooks/usePosts";
import { parseDate } from "../../../packages/helper/parseDateTime";
import { Pagination, Typography } from "@mui/material";
import page from "../profile/page";
import { SearchField } from "../../../packages/components/SearchField";

const Posts = () => {
  const { posts, meta, isLoading, handlePagination } = useGetPosts();

  const { search, handleClearSearch, handleSearch } = useSearch();

  return (
    <Layout>
      <div className="flex flex-col justify-center items-center gap-4 pt-2 w-full">
        <SearchField
          handleChangeText={handleSearch}
          text={search}
          handleCloseButton={handleClearSearch}
        />
        {posts &&
          posts.map(
            ({ title, post, createdAt, profile, reaction_count }, index) => {
              return (
                <PostCard
                  title={title}
                  body={post}
                  reactionCount={reaction_count}
                  date={parseDate(createdAt, "MMM D, YYYY")}
                  name={`${profile.firstName} ${profile.lastName}`}
                  key={index}
                />
              );
            }
          )}

        {posts && posts.length !== 0 && (
          <Pagination
            count={meta?.pagination.pageCount || 1}
            page={meta?.pagination.page || 1}
            color="primary"
            onChange={(_, page) => {
              handlePagination(page);
            }}
          />
        )}
      </div>
    </Layout>
  );
};

export default isAuth(Posts);
