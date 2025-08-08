import { Dispatch, SetStateAction } from "react";

export type ModalId =
  | "modifyDiary"
  | "deleteDiary"
  | "tempDiary"
  | "nickname"
  | "clearDiaries"
  | "signOut"
  | "fontSize"
  | "screenWidth"
  | null;

export type ModalOption = "YesNo" | "Range";

export interface IModalVariants {
  modalId: ModalId;
  modalOption: ModalOption;
  sentence: string;
}

export interface IModalProp extends IModalVariants {
  setModalAnswer: Dispatch<SetStateAction<boolean | null>>;
}
