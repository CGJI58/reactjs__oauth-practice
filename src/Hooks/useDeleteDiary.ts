import { useSetRecoilState } from "recoil";
import { userState } from "../States/atoms";
import { IUserState } from "../types/types";

function useDeleteDiary() {
  const setUser = useSetRecoilState<IUserState>(userState);
  const deleteDiary = (diaryId: string) => {
    setUser((prev) => {
      const newDiaries = prev.userRecord.diaries.filter(
        (diary) => diary.id !== diaryId
      );
      return {
        ...prev,
        userRecord: { ...prev.userRecord, diaries: newDiaries },
      };
    });
  };
  return { deleteDiary };
}

export default useDeleteDiary;
