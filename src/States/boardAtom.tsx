import { atom } from "recoil";
import { IBoardState } from "../types/types";
import { defaultBoardState } from "../constants/defaults";

export const boardState = atom<IBoardState>({
  key: "boardState",
  default: defaultBoardState,
});
