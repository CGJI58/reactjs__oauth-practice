import { atom, DefaultValue, selector } from "recoil";
import { IUserState } from "../types/types";

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
    isDarkTheme: false,
  },
  synchronized: false,
};

export const userState = atom<IUserState>({
  key: "userState",
  default: defaultUserState,
});

export const userInfoState = selector({
  key: "userInfoState",
  get: ({ get }) => get(userState).userInfo,
  set: ({ set }, newUserInfo) => {
    if (newUserInfo instanceof DefaultValue) {
      throw new Error("userInfoState: Invalid argument.");
    } else {
      set(userState, (prev) => ({
        ...prev,
        userInfo: newUserInfo,
      }));
    }
  },
});

export const userRecordState = selector({
  key: "userRecordState",
  get: ({ get }) => get(userState).userRecord,
  set: ({ set }, newUserRecord) => {
    if (newUserRecord instanceof DefaultValue) {
      throw new Error("userRecordState: Invalid argument.");
    } else {
      set(userState, (prev) => ({
        ...prev,
        userRecord: newUserRecord,
      }));
    }
  },
});

export const userConfigState = selector({
  key: "userConfigState",
  get: ({ get }) => get(userState).userConfig,
  set: ({ set }, newUserConfig) => {
    if (newUserConfig instanceof DefaultValue) {
      throw new Error("userConfigState: Invalid argument.");
    } else {
      set(userState, (prev) => ({
        ...prev,
        userConfig: newUserConfig,
      }));
    }
  },
});

export const userSynchronizedState = selector({
  key: "userSynchronizedState",
  get: ({ get }) => get(userState).synchronized,
  set: ({ set }, newSync) => {
    if (newSync instanceof DefaultValue) {
      throw new Error("userConfigState: Invalid argument.");
    } else {
      set(userState, (prev) => ({
        ...prev,
        synchronized: newSync,
      }));
    }
  },
});
