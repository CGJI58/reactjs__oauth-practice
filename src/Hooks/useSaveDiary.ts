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

  const isTempDiaryInStorage = () => {
    const stringTempDiary = localStorage.getItem("tempDiary");
    if (stringTempDiary) {
      const confirmed = window.confirm("변경사항을 저장하시겠습니까?");
      if (confirmed) {
        const tempDiary: IDiary = JSON.parse(stringTempDiary);
        return tempDiary;
      }
    }
  };

  return { onSave, isTempDiaryInStorage };
}

export default useSaveDiary;

//로컬스토리지에 뭔가 들어있으면 무조건 실행되는 saveIfTempDiary()
