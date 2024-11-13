import { User } from "./user";

export interface Comment {
  id: string;
  text: string;
  createdAt: string;
  user: User;
}
