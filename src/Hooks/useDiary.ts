import { useSetRecoilState } from "recoil";
import { userRecordState } from "../States/atoms";
import { IDiary, IModalVariants, IUserRecord } from "../types/types";
import { useNavigate } from "react-router-dom";

function useDiary() {
  const setUserRecord = useSetRecoilState<IUserRecord>(userRecordState);
  const navigate = useNavigate();

  const deleteVariants: IModalVariants = {
    modalId: "deleteDiary",
    modalOption: "YesNo",
    sentence: "이 게시글을 삭제하시겠습니까?",
  };

  const modifyVariants: IModalVariants = {
    modalId: "modifyDiary",
    modalOption: "YesNo",
    sentence: "이 게시글을 수정하시겠습니까?",
  };

  const clearDiariesVariants: IModalVariants = {
    modalId: "clearDiaries",
    modalOption: "YesNo",
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
    clearDiariesVariants,
    modifyVariants,
    deleteVariants,
  };
}

export default useDiary;
