import { useSetRecoilState } from "recoil";
import { userRecordState } from "../States/atoms";
import { IDiary, IUserRecord } from "../types/types";
import { useNavigate } from "react-router-dom";

function useDiary() {
  const setUserRecord = useSetRecoilState<IUserRecord>(userRecordState);
  const navigate = useNavigate();

  const saveDiary = (newDiary: IDiary) => {
    if (newDiary) {
      setUserRecord((prev) => {
        const originalDiaries = prev.diaries;
        const modifiedDiaries = originalDiaries.filter(
          (diary) => diary.id !== newDiary.id
        );
        const newUserRecord: IUserRecord = {
          diaries: [newDiary, ...modifiedDiaries],
        };
        return newUserRecord;
      });
    }
  };

  const deleteDiary = (diaryId: string) => {
    setUserRecord((prev) => {
      const newDiaries = prev.diaries.filter((diary) => diary.id !== diaryId);
      return {
        diaries: newDiaries,
      };
    });
    navigate("/");
  };

  const modifyDiary = (diary: IDiary) => {
    navigate(`../write?mode=modify`, { state: { diary } });
  };

  const clearDiaries = () => {
    setUserRecord((prev) => ({ ...prev, diaries: [] }));
  };

  return {
    saveDiary,
    clearDiaries,
    deleteDiary,
    modifyDiary,
  };
}

export default useDiary;
