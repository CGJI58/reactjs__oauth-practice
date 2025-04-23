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
    nickname: "",
    diaries: [],
  },
};

export const userState = atom<IUserState>({
  key: "userState",
  default: defaultUserState,
});

export const isDarkThemeState = atom<boolean>({
  key: "themeState",
  default: false,
});
