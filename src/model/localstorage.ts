export const LOCAL_USER_TOKEN = "user_token";

export const loadNowLoggedInUser = () => {
  const localUserToken = localStorage.getItem(LOCAL_USER_TOKEN);
  if (localUserToken) {
    return localUserToken;
  }
  return "";
};

export const saveNowLoggedInUser = (token: string) => {
  localStorage.setItem(LOCAL_USER_TOKEN, token);
  console.log(`User logged in! access token: ${token}`);
};

export const logOut = () => {
  localStorage.setItem(LOCAL_USER_TOKEN, "");
};
