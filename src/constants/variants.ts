import { IModalVariants } from "../types/modal";

export const deleteDiaryVariants: IModalVariants = {
  modalId: "deleteDiary",
  modalOption: "YesNo",
  sentence: "이 게시글을 삭제하시겠습니까?",
};

export const modifyDiaryVariants: IModalVariants = {
  modalId: "modifyDiary",
  modalOption: "YesNo",
  sentence: "이 게시글을 수정하시겠습니까?",
};

export const clearDiariesVariants: IModalVariants = {
  modalId: "clearDiaries",
  modalOption: "YesNo",
  sentence: "모든 다이어리를 삭제하시겠습니까?",
};

export const logOutVariants: IModalVariants = {
  modalId: "logOut",
  modalOption: "YesNo",
  sentence: "로그아웃 하시겠습니까?",
};

export const signOutVariants: IModalVariants = {
  modalId: "signOut",
  modalOption: "YesNo",
  sentence: "회원 탈퇴하시겠습니까?",
};

export const UIScaleVariants: IModalVariants = {
  modalId: "UIScale",
  modalOption: "Range",
  sentence: "화면 컨텐츠 크기를 설정하세요.",
  rangeProps: {
    indexArray: ["작게", "보통", "크게", "아주 크게"],
  },
};

export const nicknameVariants: IModalVariants = {
  modalId: "nickname",
  modalOption: "YesNo",
  sentence: "닉네임을 변경하시겠습니까?",
};

export const saveDiaryVariants: IModalVariants = {
  modalId: "saveDiary",
  modalOption: "YesNo",
  sentence: "저장하시겠습니까?",
};
