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

export type IDiaryState = {
  mode?: WriteOption;
  status: "original" | "editing" | "ready";
  diary: IDiary;
};

export interface IDiaryForm extends Omit<IDiary, "date" | "id"> {}

export type ITempDiary = {
  status: "loading" | "empty" | "loaded";
  data: null | IDiaryForm;
};

export type UIScaleOption = 0 | 1 | 2 | 3;

export type WriteOption = "create" | "modify";

export interface IGetUserByCookie {
  userData?: IUserState;
  status: number | null;
}
