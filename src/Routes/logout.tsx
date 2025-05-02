import { useEffect, useState } from "react";
import useUpdate from "../Hooks/useUpdate";
import { deleteCookie } from "../Api/api";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { defaultUserState, userState } from "../States/atoms";
import { IUserState } from "../types/types";
import useTempDiary from "../Hooks/useTempDiary";
import useModal from "../Hooks/useModal";
import Modal from "../Components/modal";

function Logout() {
  const navigate = useNavigate();
  const { ok } = useUpdate();
  const setUser = useSetRecoilState<IUserState>(userState);
  const [saveDone, setSaveDone] = useState<boolean>(false);

  const { saveTempDiaryVariants, tempDiary, runSaveTempDiary } = useTempDiary();
  const { modalProps, modalResult, modalOn, createModal } = useModal();

  const onLogout = async () => {
    await deleteCookie();
    setUser(() => defaultUserState);
  };

  useEffect(() => {
    if (tempDiary) {
      createModal(saveTempDiaryVariants);
    }
  }, [tempDiary]);

  useEffect(() => {
    if (modalProps && modalResult) {
      const { modalId } = modalProps;
      if (modalId === saveTempDiaryVariants.modalId) {
        runSaveTempDiary();
        setSaveDone(true);
      }
    }
  }, [modalResult]);

  useEffect(() => {
    if (ok && saveDone) {
      (async () => {
        await onLogout();
      })();
      console.log("logout done.");
      navigate("/");
    }
  }, [ok, saveDone]);

  return (
    <>
      <span>로그아웃 하는 중 입니다...</span>
      {modalOn && <Modal {...modalProps} />}
    </>
  );
}

export default Logout;
