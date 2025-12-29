import { BE_BASE_URL } from "../constants/urls";
import { GetDiariesRes, IDiaryFromBE, ISaveDiaryProps } from "../types/types";

export const getDiaries = async (): Promise<GetDiariesRes> => {
  try {
    const response = await fetch(`${BE_BASE_URL}/diaries`, {
      method: "GET",
      mode: "cors",
      credentials: "include",
    });
    const rawDiaries: Array<IDiaryFromBE> = await response.json();
    const ok = response.ok;
    return { rawDiaries, ok };
  } catch (error) {
    console.error(error);
    return { ok: false, rawDiaries: [] };
  }
};

export const addDiary = async ({
  userId,
  title,
  text,
}: ISaveDiaryProps): Promise<boolean> => {
  if (!userId) return false;
  try {
    const response = await fetch(`${BE_BASE_URL}/diaries`, {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, title, text }),
    });
    const { saveDone }: { saveDone: boolean } = await response.json();
    return saveDone;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const deleteDiaryDoc = async (diaryId: string): Promise<boolean> => {
  try {
    const response = await fetch(`${BE_BASE_URL}/diaries/${diaryId}`, {
      method: "DELETE",
      mode: "cors",
      credentials: "include",
    });
    const { deleteDone }: { deleteDone: boolean } = await response.json();
    return deleteDone;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const updateDiary = async ({
  diaryId,
  userId,
  title,
  text,
}: ISaveDiaryProps): Promise<boolean> => {
  try {
    const response = await fetch(`${BE_BASE_URL}/diaries/`, {
      method: "PUT",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ diaryId, userId, title, text }),
    });
    const { updateDone }: { updateDone: boolean } = await response.json();
    return updateDone;
  } catch (error) {
    console.error(error);
    return false;
  }
};
