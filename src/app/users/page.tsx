"use client";

import React from "react";
import { useState } from "react";
import Layout from "../components/layout";
import UsersList from "./userslist";
import { useGetProfilesAtom } from "../../../packages/hooks/useAuth";

export default function Users() {
  return (
    <Layout>
      <UsersList />
    </Layout>
  );
}
