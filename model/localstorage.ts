export const LOCAL_USER_DIARY = "user_diaries";

interface ILocalStorage {
  user_diaries: IUserDiary[];
}

export const loadDiary = (usersGhCode: string) => {
  const localUserDiary = localStorage.getItem(LOCAL_USER_DIARY);
  if (localUserDiary) {
    const data: ILocalStorage = JSON.parse(localUserDiary);
    const result = data.user_diaries.find(
      (item) => item.ghCode === usersGhCode
    );
    if (!result) return;
    return result;
  }
  return;
};

interface IUserDiary {
  ghCode: string;
  diary: {
    date: number;
    memo: string;
  };
}

export const saveDiary = (diary: IUserDiary) => {
  localStorage.setItem(LOCAL_USER_DIARY, JSON.stringify(diary));
  console.log("Diary saved!");
};
