"use client";

import Layout from "../components/layout";
import isAuth from "../../../packages/components/isAuth";
import { PostCard } from "../../../packages/components/PostCard";

const Dashboard = () => {
  return (
    <Layout>
      <h2 className="text-lg mb-2">Freedom wall</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4">
        {Array(10)
          .fill(0)
          .map((_, index) => (
            <PostCard key={index} />
          ))}
      </div>
    </Layout>
  );
};

export default isAuth(Dashboard);
