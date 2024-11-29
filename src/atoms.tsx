import { atom } from "recoil";

export interface IUserState {
  login: boolean;
  userInfo: IUserInfo;
}

export interface IUserInfo {
  email: string;
  primary: boolean;
  verified: boolean;
  visibility: string;
}

export const defaultUserState: IUserState = {
  login: false,
  userInfo: {
    email: "default",
    primary: false,
    verified: false,
    visibility: "default",
  },
};

export const userState = atom<IUserState>({
  key: "user",
  default: defaultUserState,
});
