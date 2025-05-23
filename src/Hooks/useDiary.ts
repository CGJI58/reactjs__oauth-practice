import { useSetRecoilState } from "recoil";
import { userRecordState } from "../States/atoms";
import { IDiary, IModalVariants, IUserRecord } from "../types/types";

function useDiary() {
  const setUserRecord = useSetRecoilState<IUserRecord>(userRecordState);

  const clearDiariesVariants: IModalVariants = {
    modalId: "clearDiaries",
    sentence: "모든 다이어리를 삭제하시겠습니까?",
  };

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

  const clearDiaries = () => {
    console.log("모든 다이어리 삭제");
    // setUserRecord((prev) => ({ ...prev, diaries: [] }));
  };

  return { saveDiary, deleteDiary, clearDiaries, clearDiariesVariants };
}

export default useDiary;
