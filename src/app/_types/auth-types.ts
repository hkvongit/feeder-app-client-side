export type LoginRequestBody = {
  email: string;
  password: string;
};

/** Login API response. Backend may use `token` or `accessToken`. */
export type LoginResponse = {
  token?: string;
  accessToken?: string;
};

export type RegisterRequestBody = {
  email: string;
  password: string;
  fullName: string;
};
