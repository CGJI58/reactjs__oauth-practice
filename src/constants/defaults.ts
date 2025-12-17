import {
  IBoardState,
  IDiary,
  IModalProps,
  IModalResponse,
  IModalVariants,
  IUserState,
} from "../types/types";

export const defaultBoardState: IBoardState = {
  diaries: [],
  synchronized: false,
};

export const defaultDiary: IDiary = {
  id: 0,
  date: "",
  writer: "",
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
    myDiaries: [],
  },
  userConfig: {
    nickname: "",
    UIScale: 1,
    isDarkTheme: false,
  },
  synchronized: false,
};

export const defaultModalVariants: IModalVariants = {
  modalId: null,
  modalOption: "YesNo",
  sentence: "",
};

export const defaultModalResponse: IModalResponse = {
  modalId: null,
  visible: false,
  confirm: null,
};

export const defaultModalProps: IModalProps = {
  ...defaultModalVariants,
  ...defaultModalResponse,
  onAnswer: () => {},
};
