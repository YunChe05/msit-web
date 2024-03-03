"use client";

import Layout from "../components/layout";
import isAuth from "../../../packages/components/isAuth";
import { PostCard } from "../../../packages/components/PostCard";
import { useGetPosts } from "../../../packages/hooks/usePosts";
import { parseDate } from "../../../packages/helper/parseDateTime";
import { Typography } from "@mui/material";

const Posts = () => {
  const { posts, meta, isLoading } = useGetPosts();
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
      </div>
    </Layout>
  );
};

export default isAuth(Posts);
