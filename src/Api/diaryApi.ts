import { BE_BASE_URL } from "../constants/urls";
import { IBoardState, IDiary } from "../types/types";

export const getDiaries = async (): Promise<Array<IDiary>> => {
  try {
    const response = await fetch(`${BE_BASE_URL}/diaries`, {
      method: "GET",
      mode: "cors",
      credentials: "include",
    });
    const diaries = await response.json();
    return diaries;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const addDiary = async (diary: IDiary): Promise<boolean> => {
  try {
    const response = await fetch(`${BE_BASE_URL}/diaries`, {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ diary }),
    });
    const { saveDone }: { saveDone: boolean } = await response.json();
    return saveDone;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const deleteDiaryDoc = async (diaryId: number): Promise<boolean> => {
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

export const updateDiary = async (diary: IDiary): Promise<boolean> => {
  try {
    const response = await fetch(`${BE_BASE_URL}/diaries/`, {
      method: "PUT",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ diary }),
    });
    const { updateDone }: { updateDone: boolean } = await response.json();
    return updateDone;
  } catch (error) {
    console.error(error);
    return false;
  }
};
