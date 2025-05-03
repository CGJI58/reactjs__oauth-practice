import { useSetRecoilState } from "recoil";
import { userRecordState } from "../States/atoms";
import { IUserRecord } from "../types/types";

function useDeleteDiary() {
  const setUserRecordState = useSetRecoilState<IUserRecord>(userRecordState);
  const deleteDiary = (diaryId: string) => {
    setUserRecordState((prev) => {
      const newDiaries = prev.diaries.filter((diary) => diary.id !== diaryId);
      return {
        diaries: newDiaries,
      };
    });
  };
  return { deleteDiary };
}

export default useDeleteDiary;
