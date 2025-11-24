import { Dispatch, SetStateAction } from "react";

export type ModalId =
  | "modifyDiary"
  | "deleteDiary"
  | "saveDiary"
  | "nickname"
  | "clearDiaries"
  | "logOut"
  | "signOut"
  | "UIScale"
  | null;

export type ModalOption = "YesNo" | "Range";

export type RangeProps = {
  indexArray: Array<string>;
};

export type OnAnswer = (answer: IModalResponse) => void;

export interface IModalVariants {
  modalId: ModalId;
  modalOption: ModalOption;
  sentence: string;
  rangeProps?: RangeProps;
}

export interface IModalResponse {
  visible: boolean;
  confirm: boolean | null;
  rangeValue?: UIScaleOption;
}

export interface IModalProps extends IModalVariants, IModalResponse {
  onAnswer: OnAnswer;
}

export interface IModalActionProps {
  modalId: ModalId;
  diaryId?: string;
  diary?: IDiary;
}

export interface IModalContext {
  modalAction: (props: IModalActionProps) => void;
  modalResponse: IModalResponse;
}
