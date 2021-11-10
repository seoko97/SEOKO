export interface SignInUser {
  userId: string;
  password: string;
}

export interface SignUpUser extends SignInUser {
  username: string;
}
