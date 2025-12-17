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
  myDiaries: Array<number>;
}

export interface IUserConfig {
  nickname: string;
  UIScale: UIScaleOption;
  isDarkTheme: boolean;
}

export interface IBoardState {
  diaries: Array<IDiary>;
  synchronized: boolean;
}

export interface IDiary {
  id: number;
  writer: string;
  date: string;
  title: string;
  text: string;
}

export type IDiaryState = {
  mode?: WriteOption;
  ready: boolean;
  diary: IDiary;
};

export type ITempDiaryState = {
  ready: boolean;
  diary?: null | IDiary;
};

export type UIScaleOption = 0 | 1 | 2 | 3;

export type WriteOption = "create" | "modify";

export interface IGetUserByCookie {
  userData?: IUserState;
  status: number | null;
}
