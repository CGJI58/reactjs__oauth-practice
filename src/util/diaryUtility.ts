import { IDiary, ITempDiaryState } from "../types/types";

type GenerateTimestamp = () => Partial<IDiary>;

export const generateTimestamp: GenerateTimestamp = () => {
  const dateValue = Date.now();
  const id = dateValue;
  const now = new Date(dateValue);
  const year = String(now.getFullYear()).slice(-2);
  const mon = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hour = String(now.getHours()).padStart(2, "0");
  const min = String(now.getMinutes()).padStart(2, "0");
  const date = `${year}${mon}${day} ${hour}:${min}`;
  return { id, date };
};

type GetTempDiary = () => ITempDiaryState;

export const getTempDiary: GetTempDiary = () => {
  const rawTempDiary = sessionStorage.getItem("tempDiary");

  if (rawTempDiary) {
    const tempDiary: IDiary = JSON.parse(rawTempDiary);
    // 이후 타입가드 검사로직 추가 할 것
    return { ready: true, diary: { ...tempDiary } };
  }
  return { ready: true, diary: null };
};
