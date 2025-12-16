import { useCallback, useEffect, useState } from "react";
import {
  IModalActionProps,
  IModalProps,
  IModalResponse,
  IModalVariants,
} from "../types/types";
import { defaultModalProps, defaultModalResponse } from "../constants/defaults";
import {
  clearBoardVariants,
  deleteDiaryVariants,
  modifyDiaryVariants,
  nicknameVariants,
  signOutVariants,
  saveDiaryVariants,
  UIScaleVariants,
  logOutVariants,
} from "../constants/variants";

function useModal() {
  const [modalActionProps, setModalActionProps] = useState<IModalActionProps>({
    modalId: null,
  });
  const [modalResponse, setModalResponse] =
    useState<IModalResponse>(defaultModalResponse);
  const [modalProps, setModalProps] = useState<IModalProps>(defaultModalProps);

  const modalAction = useCallback(
    (props: IModalActionProps) => {
      setModalActionProps(props);
    },
    [setModalActionProps]
  );

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
        case "saveDiary":
          createModal(saveDiaryVariants);
          break;
        case "nickname":
          createModal(nicknameVariants);
          break;
        case "UIScale":
          createModal(UIScaleVariants);
          break;
        case "logOut":
          createModal(logOutVariants);
          break;
        case "clearBoard":
          createModal(clearBoardVariants);
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
    if (modalResponse.modalId !== null) {
      setModalResponse(defaultModalResponse);
      setModalProps(defaultModalProps);
      setModalActionProps({ modalId: null });
    }
  }, [modalResponse]);

  return { modalProps, modalResponse, modalAction };
}

export default useModal;
