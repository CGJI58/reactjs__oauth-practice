import { useEffect, useState } from "react";
import { IModalProp, IModalResponse, IModalVariants } from "../types/types";
import { defaultModalProps, defaultModalResponse } from "../constants/defaults";

function useModal() {
  const [modalResponse, setModalResponse] =
    useState<IModalResponse>(defaultModalResponse);
  const [modalProps, setModalProps] = useState<IModalProp>(defaultModalProps);

  const createModal = (modalVariants: IModalVariants) => {
    const onAnswer = (response: IModalResponse) => {
      setModalResponse(response);
    };
    setModalProps({
      ...modalVariants,
      ...modalResponse,
      visible: true,
      onAnswer,
    });
  };

  useEffect(() => {
    if (modalResponse !== defaultModalResponse) {
      setModalProps((prev) => ({ ...prev, ...modalResponse }));
    }
  }, [modalResponse]);

  return { modalProps, modalResponse, createModal };
}

export default useModal;
