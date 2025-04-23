export type ModalFlag = "modify" | "delete" | null;

export interface IModal {
  diary: IDiary;
  sentence: string;
  modalFlag: ModalFlag;
  setModalFlag: React.Dispatch<React.SetStateAction<ModalFlag>>;
}

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
