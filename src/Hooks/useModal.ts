import { useEffect, useState } from "react";
import {
  IModalActionProps,
  IModalProp,
  IModalResponse,
  IModalVariants,
} from "../types/types";
import { defaultModalProps, defaultModalResponse } from "../constants/defaults";
import useTempDiary from "./useTempDiary";
import useNickname from "./useNickname";
import useUIScale from "./useUIScale";
import useDiary from "./useDiary";
import useAuth from "./useAuth";
import {
  clearDiariesVariants,
  deleteDiaryVariants,
  modifyDiaryVariants,
  nicknameVariants,
  signOutVariants,
  tempDiaryVariants,
  UIScaleVariants,
} from "../constants/variants";
import { isEqual } from "lodash";

function useModal() {
  const { runSaveTempDiary, runRemoveTempDiary } = useTempDiary();
  const { nicknameForm } = useNickname();
  const { handleUIScale } = useUIScale();
  const { clearDiaries, modifyDiary, deleteDiary } = useDiary();
  const { signOut } = useAuth();
  const [modalActionProps, setModalActionProps] = useState<IModalActionProps>({
    modalId: null,
  });
  const [modalResponse, setModalResponse] =
    useState<IModalResponse>(defaultModalResponse);
  const [modalProps, setModalProps] = useState<IModalProp>(defaultModalProps);

  const modalAction = (props: IModalActionProps) => {
    setModalActionProps(props);
  };

  const createModal = (modalVariants: IModalVariants) => {
    const onAnswer = (response: IModalResponse) => {
      setModalResponse(response);
    };
    setModalProps({
      ...modalVariants,
      confirm: null,
      visible: true,
      onAnswer,
    });
  };

  useEffect(() => {
    if (modalActionProps.modalId !== null) {
      switch (modalActionProps.modalId) {
        case "tempDiary":
          createModal(tempDiaryVariants);
          break;
        case "nickname":
          createModal(nicknameVariants);
          break;
        case "UIScale":
          createModal(UIScaleVariants);
          break;
        case "clearDiaries":
          createModal(clearDiariesVariants);
          break;
        case "signOut":
          createModal(signOutVariants);
          break;
        case "deleteDiary":
          createModal(deleteDiaryVariants);
          break;
        case "modifyDiary":
          createModal(modifyDiaryVariants);
          break;
      }
    }
  }, [modalActionProps.modalId]);

  useEffect(() => {
    if (!isEqual(modalResponse, defaultModalResponse)) {
      if (modalResponse.confirm) {
        switch (modalProps.modalId) {
          case tempDiaryVariants.modalId:
            runSaveTempDiary();
            break;
          case nicknameVariants.modalId:
            nicknameForm();
            break;
          case UIScaleVariants.modalId:
            handleUIScale(modalResponse.rangeValue);
            break;
          case clearDiariesVariants.modalId:
            clearDiaries();
            break;
          case signOutVariants.modalId:
            signOut();
            break;
          case modifyDiaryVariants.modalId:
            if (modalActionProps.diary) {
              modifyDiary(modalActionProps.diary);
            }
            break;
          case deleteDiaryVariants.modalId:
            if (modalActionProps.diaryId) {
              deleteDiary(modalActionProps.diaryId);
            }
            break;
        }
      }
      if (modalActionProps.modalId === "tempDiary") {
        runRemoveTempDiary();
      }
      setModalResponse(defaultModalResponse);
      setModalProps(defaultModalProps);
      setModalActionProps({ modalId: null });
    }
  }, [modalResponse]);

  return { modalProps, modalResponse, modalAction };
}

export default useModal;
