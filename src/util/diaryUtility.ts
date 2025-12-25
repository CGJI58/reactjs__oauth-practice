import { IDiary } from "../types/types";

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
