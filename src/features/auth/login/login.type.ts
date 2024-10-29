import { useLoginUserMutation } from "./login.api";

export type LoginResponseType = {
  accessToken: string;
  refreshToken: string;
  needPasswordChange: boolean;
};

export type WholeResponseType = ReturnType<typeof useLoginUserMutation>;
