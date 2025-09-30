export * from "./modal";

export interface IUserState {
  userInfo: IUserInfo;
  userRecord: IUserRecord;
  userConfig: IUserConfig;
  synchronized: boolean;
}

export interface IUserInfo {
  email: string;
  primary: boolean;
  verified: boolean;
  visibility: string;
}

export interface IUserRecord {
  diaries: Array<IDiary>;
}

export interface IUserConfig {
  nickname: string;
  UIScale: UIScaleOption;
  isDarkTheme: boolean;
}

export interface IDiary {
  id: string;
  date: string;
  title: string;
  text: string;
}

export type UIScaleOption = 0 | 1 | 2 | 3;

export interface IGetUserByCookie {
  userData?: IUserState;
  status: number | null;
}
