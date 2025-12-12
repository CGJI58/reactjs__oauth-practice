import { useSetRecoilState } from "recoil";
import { userRecordState } from "../States/userAtom";
import { IDiary, IUserRecord } from "../types/types";
import { useNavigate } from "react-router-dom";
import { generateTimestamp } from "../util/diaryUtility";
import { useEffect, useState } from "react";
import { defaultDiary } from "../constants/defaults";
import { isEqual } from "lodash";

function useDiary() {
  const setUserRecord = useSetRecoilState<IUserRecord>(userRecordState);
  const navigate = useNavigate();
  const [diary, setDiary] = useState<IDiary>(defaultDiary);

  useEffect(() => {
    if (!isEqual(diary, defaultDiary)) {
      setUserRecord((prev) => {
        const originalDiaries = prev.diaries;
        const modifiedDiaries = originalDiaries.filter(
          (item) => item.id !== diary.id
        );
        const newUserRecord: IUserRecord = {
          diaries: [diary, ...modifiedDiaries],
        };
        return newUserRecord;
      });
      removeTempDiary();
      navigate("/");
    }
  }, [diary]);

  const saveDiary = (newDiary: IDiary) => {
    if (newDiary.date === "" || newDiary.id === "") {
      const newTimeStamp = generateTimestamp();
      setDiary(() => ({ ...newDiary, ...newTimeStamp }));
    } else {
      setDiary(() => newDiary);
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

  const removeTempDiary = () => {
    sessionStorage.removeItem("tempDiary");
  };

  return {
    saveDiary,
    clearDiaries,
    deleteDiary,
    modifyDiary,
    removeTempDiary,
  };
}

export default useDiary;
