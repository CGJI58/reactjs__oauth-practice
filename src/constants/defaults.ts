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
  diaryId: undefined,
  userId: undefined,
  absTime: "",
  relTime: "",
  title: "",
  text: "",
};

export const defaultUserState: IUserState = {
  userInfo: {
    githubId: null,
    githubUsername: "",
  },
  userRecord: {
    myDiaries: [],
  },
  userConfig: {
    nickname: "",
    UIScale: 1,
    isDarkTheme: true, //FOUC 방지
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
