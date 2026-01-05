export * from "./modal";

export interface IUserState {
  userInfo: IUserInfo;
  userRecord: IUserRecord;
  userConfig: IUserConfig;
  synchronized: boolean;
}

export interface IUserInfo {
  githubId: number | null;
  githubUsername: string;
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
  diaryId?: string;
  userId?: number;
  createdAt: {
    absTime: string;
    relTime: string;
  };
  modifiedAt: {
    absTime: string;
    relTime: string;
  };
  title: string;
  text: string;
}

export type IDiaryState = {
  mode?: WriteOption;
  ready: boolean;
  diary: IDiary;
};

export interface ISaveDiaryProps {
  diaryId?: string;
  userId: number;
  title: string;
  text: string;
}

export interface IDiaryFromBE {
  diaryId: string;
  userId: number;
  dateValue: Array<number>;
  title: string;
  text: string;
}

export type GetDiariesRes = {
  ok: boolean;
  rawDiaries: Array<IDiaryFromBE>;
};

export type IFocusIndexHandler = (index?: string) => void;

export type UIScaleOption = 0 | 1 | 2 | 3;

export type WriteOption = "create" | "modify";

export interface IGetUserByCookie {
  userData?: IUserState;
  status: number | null;
}
