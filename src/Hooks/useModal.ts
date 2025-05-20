import { useEffect, useState } from "react";
import { IModalProp, IModalVariants } from "../types/types";

function useModal() {
  const [modalAnswer, setModalAnswer] = useState<boolean | null>(null);
  const [modalProps, setModalProps] = useState<IModalProp>();
  const [modalOn, setModalOn] = useState<boolean>(false);

  const createModal = (variants: IModalVariants) => {
    setModalProps({ ...variants, setModalAnswer });
    setModalOn(true);
  };

  useEffect(() => {
    // modalAnswer 값 반환 후 초기화
    if (!modalOn && modalProps) {
      modalProps.setModalAnswer(null);
    }
  }, [modalOn]);

  useEffect(() => {
    // modalAnswer 초기화 후 modal 창 종료
    if (modalAnswer !== null) {
      setModalOn(false);
    }
  }, [modalAnswer]);

  return { modalProps, modalAnswer, modalOn, createModal };
}

export default useModal;
