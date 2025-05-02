import { useEffect, useState } from "react";
import { IModalProp, IOnModal } from "../types/types";

function useModal() {
  const [modalResult, setModalResult] = useState<boolean | null>(null);
  const [modalProps, setModalProps] = useState<IModalProp>();
  const [modalOn, setModalOn] = useState<boolean>(false);

  const createModal = (variants: IOnModal) => {
    setModalProps({ ...variants, setModalResult });
    setModalOn(true);
  };

  useEffect(() => {
    // modalResult 값 반환 후 초기화
    if (!modalOn && modalProps) {
      modalProps.setModalResult(null);
    }
  }, [modalOn]);

  useEffect(() => {
    // modalResult 초기화 후 modal 창 종료
    if (modalResult !== null) {
      setModalOn(false);
    }
  }, [modalResult]);

  return { modalProps, modalResult, modalOn, createModal };
}

export default useModal;
