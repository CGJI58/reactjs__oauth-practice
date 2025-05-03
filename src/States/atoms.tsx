import { atom } from "recoil";
import { IUserState } from "../types/types";

export const defaultUserState: IUserState = {
  userInfo: {
    email: "",
    primary: false,
    verified: false,
    visibility: "",
  },
  userRecord: {
    diaries: [],
  },
  userConfig: {
    nickname: "",
    isDarkTheme: false,
    password: "임시비번임",
  },
};

export const userState = atom<IUserState>({
  key: "userState",
  default: defaultUserState,
});
