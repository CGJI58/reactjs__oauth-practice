export const LOCAL_USER_DIARY = "user_diaries";

interface ILocalStorage {
  user_diaries: IUserDiary[];
}

export const loadDiary = (userGhEmail: string) => {
  const localUserDiary = localStorage.getItem(LOCAL_USER_DIARY);
  if (localUserDiary) {
    const data: ILocalStorage = JSON.parse(localUserDiary);
    const userData = data.user_diaries.find(
      (item) => item.ghEmail === userGhEmail
    );
    if (!userData) return;
    return userData;
  }
  return;
};

interface IUserDiary {
  ghEmail: string;
  diary: {
    date: number;
    memo: string;
  };
}

export const saveDiary = (diary: IUserDiary) => {
  localStorage.setItem(LOCAL_USER_DIARY, JSON.stringify(diary));
  console.log("Diary saved!");
};
