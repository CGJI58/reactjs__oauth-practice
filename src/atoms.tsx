import { atom } from "recoil";

export interface IUserState {
  ghCode: string;
  accessToken: string;
  userinfo: string; //BE 쪽 작업 덜해서 임시 문자열 데이터 받음
  id: string;
}

export const defaultUserState: IUserState = {
  ghCode: "default",
  accessToken: "default",
  userinfo: "default",
  id: "default",
};

export const userState = atom<IUserState>({
  key: "token",
  default: defaultUserState,
});
