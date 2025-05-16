import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { userSynchronizedState } from "../States/atoms";
import useTempDiary from "../Hooks/useTempDiary";
import useModal from "../Hooks/useModal";
import Modal from "../Components/modal";
import useAuth from "../Hooks/useAuth";

function Logout() {
  const synchronized = useRecoilValue<boolean>(userSynchronizedState);
  const {
    saveTempDiaryVariants,
    tempDiary,
    runSaveTempDiary,
    runRemoveTempDiary,
  } = useTempDiary();
  const { modalProps, modalAnswer, modalOn, createModal } = useModal();
  const { logOut } = useAuth();
  const [allDone, setAllDone] = useState<boolean>(false);

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
        await logOut();
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
