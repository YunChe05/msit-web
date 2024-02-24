import { MakePayload } from "./helperType";
import { PaginationMeta, Profile } from "./user";

export type Post = {
  id: number;
  createdAt: string;
  updatedAt: string;
  title: string;
  post: string;
  likes: string;
  dislikes: string;
  profile: Profile;
};

export type PostsQueryData = MakePayload<Post[]> & {
  meta: PaginationMeta;
};
