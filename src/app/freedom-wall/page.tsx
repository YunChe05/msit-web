"use client";

import Layout from "../components/layout";
import isAuth from "../../../packages/components/isAuth";
import { PostCard } from "../../../packages/components/PostCard";
import { useGetPosts } from "../../../packages/hooks/usePosts";
import { parseDate } from "../../../packages/helper/parseDateTime";
import { Pagination, Typography } from "@mui/material";
import page from "../profile/page";

const Posts = () => {
  const { posts, meta, isLoading, handlePagination } = useGetPosts();

  console.log(meta?.pagination.pageCount, meta?.pagination.page);
  return (
    <Layout>
      <div className="flex flex-col justify-center items-center gap-4 pt-2 w-full">
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
        <Pagination
          count={meta?.pagination.pageCount || 1}
          page={meta?.pagination.page || 1}
          color="primary"
          onChange={(_, page) => {
            handlePagination(page);
          }}
        />
      </div>
    </Layout>
  );
};

export default isAuth(Posts);
