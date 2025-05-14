import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  defaultUserState,
  userState,
  userSynchronizedState,
} from "../States/atoms";
import useTempDiary from "../Hooks/useTempDiary";
import useModal from "../Hooks/useModal";
import Modal from "../Components/modal";
import { deleteCookie } from "../Api/api";
import { IUserState } from "../types/types";

function Logout() {
  const setUser = useSetRecoilState<IUserState>(userState);
  const synchronized = useRecoilValue<boolean>(userSynchronizedState);
  const {
    saveTempDiaryVariants,
    tempDiary,
    runSaveTempDiary,
    runRemoveTempDiary,
  } = useTempDiary();

  const { modalProps, modalAnswer, modalOn, createModal } = useModal();

  const [allDone, setAllDone] = useState<boolean>(false);

  const onLogout = async () => {
    await deleteCookie();
    setUser(() => defaultUserState);
  };

  useEffect(() => {
    if (tempDiary !== undefined) {
      if (tempDiary) {
        createModal(saveTempDiaryVariants);
      } else {
        setAllDone(true);
      }
    }
  }, [tempDiary]);

  useEffect(() => {
    if (modalProps && modalAnswer !== null) {
      const { modalId } = modalProps;
      if (modalId === saveTempDiaryVariants.modalId) {
        if (modalAnswer) {
          runSaveTempDiary();
        }
        runRemoveTempDiary();
        if (synchronized) {
          setAllDone(true);
        }
      }
    }
  }, [modalAnswer]);

  useEffect(() => {
    if (synchronized && allDone) {
      (async () => {
        await onLogout();
      })();
    }
  }, [synchronized, allDone]);

  return (
    <>
      <span>로그아웃 하는 중 입니다...</span>
      {modalOn && <Modal {...modalProps} />}
    </>
  );
}

export default Logout;
