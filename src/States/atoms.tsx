import { atom } from "recoil";

export interface IUserState {
  userInfo: IUserInfo;
  userRecord: IUserRecord;
}

export interface IUserInfo {
  email: string;
  primary: boolean;
  verified: boolean;
  visibility: string;
}

export interface IUserRecord {
  nickname: string;
  diaries: Array<IDiary>;
}

export interface IDiary {
  id: string;
  date: string;
  title: string;
  text: string;
}

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
