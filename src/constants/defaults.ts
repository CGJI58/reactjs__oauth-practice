import { IDiary, IUserState } from "../types/types";

export const defaultDiary: IDiary = {
  id: "",
  date: "",
  title: "",
  text: "",
};

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
    UIScale: 1,
    isDarkTheme: false,
  },
  synchronized: false,
};
