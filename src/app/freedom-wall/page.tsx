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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 pt-2">
        {posts &&
          posts.map(
            ({ title, post, dislikes, likes, createdAt, profile }, index) => {
              return (
                <PostCard
                  title={title}
                  body={post}
                  likes={Number(likes)}
                  dislikes={Number(dislikes)}
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
