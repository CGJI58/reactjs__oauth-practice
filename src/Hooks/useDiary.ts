import { useSetRecoilState } from "recoil";
import { IBoardState, IDiary, ISaveDiaryProps } from "../types/types";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  addDiary,
  deleteDiaryDoc,
  getDiaries,
  updateDiary,
} from "../Api/diaryApi";
import { boardState } from "../States/boardAtom";
import { formatDiariesForUI } from "../util/diaryUtility";

function useDiary() {
  const navigate = useNavigate();
  const [done, setDone] = useState<boolean>(false);
  const setBoard = useSetRecoilState<IBoardState>(boardState);

  useEffect(() => {
    if (done) {
      setBoard((prev) => ({ ...prev, synchronized: !done }));
      navigate("/");
    }
  }, [done]);

  const getBoard = async () => {
    const { rawDiaries, ok } = await getDiaries();
    const diaries = formatDiariesForUI(rawDiaries);
    setBoard(() => ({ diaries, synchronized: ok }));
  };

  const saveDiary = async ({
    diaryId,
    userId,
    title,
    text,
  }: ISaveDiaryProps) => {
    if (!diaryId) {
      // from create mode
      const saveDone = await addDiary({ userId, title, text });
      setDone(saveDone);
    } else {
      // from modify mode
      const modifyDone = await updateDiary({ diaryId, userId, title, text });
      setDone(modifyDone);
    }
  };

  const deleteDiary = async (diaryId: string) => {
    const deleteDone = await deleteDiaryDoc(diaryId);
    setDone(deleteDone);
  };

  const navigateToModifyPage = (diary: IDiary) => {
    navigate(`../write?mode=modify`, { state: { diary } });
  };

  const clearBoard = () => {
    //myDiaries 를 보고 해당 사용자의 다이어리들을 모두 지우는 기능으로 사용될 예정
    console.log("공사 중...");
  };

  return {
    getBoard,
    saveDiary,
    clearBoard,
    deleteDiary,
    navigateToModifyPage,
  };
}

export default useDiary;
