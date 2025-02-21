import { useSetRecoilState } from "recoil";
import { IDiary, IUserState, userState } from "../States/atoms";

function useSaveDiary() {
  const setUser = useSetRecoilState<IUserState>(userState);

  const onSave = (newDiary: IDiary) => {
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
  };

  return { onSave };
}

export default useSaveDiary;
