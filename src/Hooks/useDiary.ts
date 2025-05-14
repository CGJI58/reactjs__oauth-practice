import { useSetRecoilState } from "recoil";
import { userRecordState } from "../States/atoms";
import { IDiary, IUserRecord } from "../types/types";

function useDiary() {
  const setUserRecord = useSetRecoilState<IUserRecord>(userRecordState);

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
  };

  return { saveDiary, deleteDiary };
}

export default useDiary;
