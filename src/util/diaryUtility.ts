import { IDiary, IDiaryFromBE } from "../types/types";

interface IGenerateTimestamp {
  dateValue: number;
  now: number;
}

type GenerateTimestamp = ({
  dateValue,
  now,
}: IGenerateTimestamp) => Pick<IDiary, "absTime" | "relTime">;

export const generateTimestamp: GenerateTimestamp = ({ dateValue, now }) => {
  const date = new Date(dateValue);
  const year = String(date.getFullYear()).slice(-2);
  const mon = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hour = String(date.getHours()).padStart(2, "0");
  const min = String(date.getMinutes()).padStart(2, "0");
  const fullStamp = `${year}${mon}${day} ${hour}:${min}`;

  const diffMs = now - dateValue;
  const diffSec = Math.floor(diffMs / 1000);
  if (diffSec < 60) return { relTime: "방금 전", absTime: fullStamp };
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return { relTime: `${diffMin}분 전`, absTime: fullStamp };
  const diffHour = Math.floor(diffMin / 60);
  if (diffHour < 24)
    return { relTime: `${diffHour}시간 전`, absTime: fullStamp };
  const diffDay = Math.floor(diffHour / 24);
  if (diffDay < 7) return { relTime: `${diffDay}일 전`, absTime: fullStamp };
  const diffWeek = Math.floor(diffDay / 7);
  if (diffWeek < 5) return { relTime: `${diffWeek}주 전`, absTime: fullStamp };
  const diffMonth = Math.floor(diffDay / 30);
  if (diffMonth < 12)
    return { relTime: `${diffMonth}달 전`, absTime: fullStamp };
  const diffYear = Math.floor(diffDay / 365);
  return { relTime: `${diffYear}년 전`, absTime: fullStamp };
};

type FormDiariesForUI = (rawDiaries: Array<IDiaryFromBE>) => Array<IDiary>;

export const formatDiariesForUI: FormDiariesForUI = (rawDiaries) => {
  if (rawDiaries.length === 0) return [];
  const now = Date.now();
  const formated: Array<IDiary> = rawDiaries.map((rawDiary) => {
    const { relTime, absTime } = generateTimestamp({
      dateValue: rawDiary.dateValue,
      now,
    });
    return { ...rawDiary, relTime, absTime };
  });
  return formated;
};
