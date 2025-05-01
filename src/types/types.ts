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

export interface IGetUserByCookie {
  userData?: IUserState;
  status: number | null;
}

export interface IOnModal {
  modalId: string | null;
  sentence: string;
}

export type IModalProp = {
  modalResult: boolean | null;
  setModalResult: React.Dispatch<React.SetStateAction<boolean | null>>;
} & IOnModal;
