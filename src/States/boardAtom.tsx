import { atom } from "recoil";
import { IBoardState } from "../types/types";

export const boardState = atom<IBoardState>({
  key: "boardState",
  default: { diaries: [] },
});
