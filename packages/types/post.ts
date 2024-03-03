import { MakePayload } from "./helperType";
import { PaginationMeta, Profile } from "./user";

export type Post = {
  id: number;
  createdAt: string;
  updatedAt: string;
  title: string;
  post: string;
  profile: Profile;
  reaction_count: ReactionCount;
};

export type PostsQueryData = MakePayload<Post[]> & {
  meta: PaginationMeta;
};

export type ReactionCount = {
  angry: string;
  dislike: string;
  funny: string;
  happy: string;
  laugh: string;
  like: string;
  love: string;
  sad: string;
  surprised: string;
};
