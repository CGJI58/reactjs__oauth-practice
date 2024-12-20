import { atom } from "recoil";

export interface IUserState {
  hashCode: string;
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
  date: string;
  title: string;
  text: string;
}

export const defaultUserState: IUserState = {
  hashCode: "",
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
