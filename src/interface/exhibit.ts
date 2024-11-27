import { User } from "./user";

export interface Exhibit {
  id: string;
  imageUrl: string;
  description: string;
  commentCount: number;
  user: User;
}
