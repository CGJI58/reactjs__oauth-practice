import {
  IDiary,
  IModalProp,
  IModalResponse,
  IModalVariants,
  ITempDiary,
  IUserState,
} from "../types/types";

export const defaultDiary: IDiary = {
  id: "",
  date: "",
  title: "",
  text: "",
};

export const defaultTempDiary: ITempDiary = {
  status: "loading",
  data: null,
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

export const defaultModalVariants: IModalVariants = {
  modalId: null,
  modalOption: "YesNo",
  sentence: "",
};

export const defaultModalResponse: IModalResponse = {
  visible: false,
  confirm: null,
};

export const defaultModalProps: IModalProp = {
  ...defaultModalVariants,
  ...defaultModalResponse,
  onAnswer: () => {},
};
