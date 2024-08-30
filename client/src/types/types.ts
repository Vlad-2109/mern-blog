export interface SignUpForm {
  username: string;
  email: string;
  password: string;
}

export interface ISignUpData {
  username: string;
  email: string;
  password: string;
}

export interface SignInForm {
  email: string;
  password: string;
}

export interface ISignInData {
  email: string;
  password: string;
}

export interface UpdateForm {
  username: string;
  email: string;
  password: string;
  profilePicture: string;
}

export interface IUpdateUser {
  username: string;
  email: string;
  password: string;
  profilePicture: string;
}

export interface IUpdateUserResponse {
  _id: string;
  username: string;
  email: string;
  profilePicture: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}
export interface IGoogleData {
  name: string | null;
  email: string | null;
  googlePhotoUrl: string | null;
}

export interface ThemeProviderProps {
  children: React.ReactNode;
}

export interface PrivateRouteProps {
  children: React.ReactNode;
}

export interface CommentSectionProps {
  postId?: string;
}

export interface CommentProps {
  comment: IGetComment;
  onLike: (commentId: string) => Promise<void> | void;
  onEdit: (comment: IGetComment, editedContent: string) => Promise<void> | void;
  onDelete: (commentId: string) => Promise<void> | void;
}

export interface PostCardProps {
  post: Post;
}

export interface FormDataState {
  image: string;
  title: string;
  category: string;
  content: string;
}

export interface ICreatePost {
  image: string;
  title: string;
  category: string;
  content: string;
}

export interface ICreatePostResponse {
  userId: string;
  content: string;
  title: string;
  image: string;
  category: string;
  slug: string;
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface IUpdatePost {
  image: string;
  title: string;
  category: string;
  content: string;
}

export interface IUpdatePostResponse {
  userId: string;
  content: string;
  title: string;
  image: string;
  category: string;
  slug: string;
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface IGetPost {
  userId: string;
  content: string;
  title: string;
  image: string;
  category: string;
  slug: string;
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface Post {
  userId: string;
  content: string;
  title: string;
  image: string;
  category: string;
  slug: string;
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface IGetPosts {
  posts: IGetPost[];
  totalPosts: number;
  lastMonthPosts: number;
}

export interface IGetUser {
  _id: string;
  username: string;
  email: string;
  profilePicture: string;
  isAdmin?: boolean;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface IGetUsers {
  users: IGetUser[];
  totalUsers: number;
  lastMonthUsers: number;
}

export interface IGetComments {
  comments: IGetComment[];
  totalComments: number;
  lastMonthComments: number;
}

export interface ICreateComment {
  content: string;
  postId: string | undefined;
  userId: string | undefined;
}

export interface ICreateCommentResponse {
  content: string;
  postId: string;
  userId: string;
  likes: string[];
  numberOfLikes: number;
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface IGetComment {
  content: string;
  postId: string;
  userId: string;
  likes: string[];
  numberOfLikes: number;
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface ISideBarData {
  searchTerm: string;
  order: string;
  category: string;
}
