import { useSetRecoilState } from "recoil";
import { IBoardState, IDiary } from "../types/types";
import { useNavigate } from "react-router-dom";
import { generateTimestamp } from "../util/diaryUtility";
import { useEffect, useState } from "react";
import { addDiary, deleteDiaryDoc, updateDiary } from "../Api/diaryApi";
import { boardState } from "../States/boardAtom";

function useDiary() {
  // userRecord.myDiaries 갱신 작업은 백엔드에서 diary 관련 request 받은 시점에 writer 값 보고 users db를 갱신하도록 할 것
  const setBoard = useSetRecoilState<IBoardState>(boardState);
  const navigate = useNavigate();
  const [sync, setSync] = useState<boolean>(false);

  useEffect(() => {
    if (sync) {
      setBoard((prev) => ({ ...prev, synchronized: true }));
      navigate("/");
    }
  }, [sync]);

  const saveDiary = async (newDiary: IDiary) => {
    let diary = newDiary;
    if (diary.date === "" || diary.id === 0) {
      // newDiary from create mode
      const newTimeStamp = generateTimestamp();
      diary = { ...diary, ...newTimeStamp };
      const saveDone = await addDiary(diary);
      setSync(saveDone);
    } else {
      // newDiary from modify mode
      const modifyDone = await updateDiary(diary);
      setSync(modifyDone);
    }
  };

  const deleteDiary = async (diaryId: number) => {
    const deleteDone = await deleteDiaryDoc(diaryId);
    setSync(deleteDone);
  };

  const navigateToModifyPage = (diary: IDiary) => {
    navigate(`../write?mode=modify`, { state: { diary } });
  };

  const clearBoard = () => {
    console.log("공사 중...");
  };

  const removeTempDiary = () => {
    sessionStorage.removeItem("tempDiary");
  };

  return {
    saveDiary,
    clearBoard,
    deleteDiary,
    navigateToModifyPage,
    removeTempDiary,
  };
}

export default useDiary;
