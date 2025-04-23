import { useSetRecoilState } from "recoil";
import { userState } from "../States/atoms";
import { IDiary, IUserState } from "../types/types";

function useSaveDiary() {
  const setUser = useSetRecoilState<IUserState>(userState);
  const saveDiary = (newDiary: IDiary) => {
    if (newDiary) {
      setUser((prev) => {
        const originalDiaries = prev.userRecord.diaries;
        const modifiedDiaries = originalDiaries.filter(
          (diary) => diary.id !== newDiary.id
        );
        const newUser: IUserState = {
          ...prev,
          userRecord: {
            ...prev.userRecord,
            diaries: [newDiary, ...modifiedDiaries],
          },
        };
        return newUser;
      });
    }
  };
  return { saveDiary };
}

export default useSaveDiary;
