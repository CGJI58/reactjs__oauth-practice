import { useEffect, useState } from "react";
import { IDiary } from "../types/types";
import useSaveDiary from "./useSaveDiary";
import { createDiary, getTempDiary } from "../util/diaryUtility";

function useTempDiary() {
  const [diary, setDiary] = useState<IDiary | null>(null);
  const { saveDiary } = useSaveDiary();

  useEffect(() => {
    const tempDiary = getTempDiary();
    if (tempDiary) {
      const confirm = window.confirm("작성하던 내용을 저장하시겠습니까?");
      if (confirm) {
        const diary = createDiary(tempDiary);
        setDiary(diary);
      }
      localStorage.removeItem("tempDiary");
    }
  }, []);

  useEffect(() => {
    if (diary) {
      saveDiary(diary);
      setDiary(null);
    }
  }, [diary]);
}

export default useTempDiary;
