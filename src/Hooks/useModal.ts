import { useState } from "react";
import { IModalProp, IOnModal } from "../types/types";

function useModal() {
  const [modalResult, setModalResult] = useState<boolean | null>(null);
  const [modalProps, setModalProps] = useState<IModalProp>();

  const onModal = (prop: IOnModal) => {
    setModalProps({ ...prop, modalResult, setModalResult });
  };

  return { onModal, modalProps, modalResult };
}

export default useModal;
