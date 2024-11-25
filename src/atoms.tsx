import { atom } from "recoil";

export interface IUserState {
  ghCode: string;
  accessToken: string;
  userinfo: IUserinfo;
  id: string;
}

export interface IUserinfo {
  email: string;
  primary: boolean;
  verified: boolean;
  visibility: string;
}

export const defaultUserState: IUserState = {
  ghCode: "default",
  accessToken: "default",
  userinfo: {
    email: "default",
    primary: false,
    verified: false,
    visibility: "default",
  },
  id: "default",
};

export const userState = atom<IUserState>({
  key: "user",
  default: defaultUserState,
});
