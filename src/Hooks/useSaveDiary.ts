import { useSetRecoilState } from "recoil";
import { userRecordState } from "../States/atoms";
import { IDiary, IUserRecord } from "../types/types";

function useSaveDiary() {
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
  return { saveDiary };
}

export default useSaveDiary;
