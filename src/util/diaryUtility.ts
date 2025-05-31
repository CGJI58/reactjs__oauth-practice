import { IDiaryForm } from "../Routes/write";
import { IDiary } from "../types/types";

export const createDiary = ({ title, text }: IDiaryForm): IDiary => {
  const generateDate = (dateValue: number) => {
    const now = new Date(dateValue);
    const year = String(now.getFullYear()).slice(-2);
    const mon = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hour = String(now.getHours()).padStart(2, "0");
    const min = String(now.getMinutes()).padStart(2, "0");
    const sec = String(now.getSeconds()).padStart(2, "0");
    return `${year}${mon}${day} ${hour}:${min}:${sec}`;
  };

  const id = Date.now().toString();
  const date = generateDate(Date.now());
  const newDiary: IDiary = { title, text, id, date };
  return newDiary;
};

export const getTempDiary = () => {
  const tempDiaryString = localStorage.getItem("tempDiary");

  if (tempDiaryString) {
    const tempDiary: IDiaryForm = JSON.parse(tempDiaryString);
    return tempDiary;
  }
  return null;
};
