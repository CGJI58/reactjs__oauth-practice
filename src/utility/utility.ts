import { defaultUserState, IUserState } from "../atoms";

const BE_BASE_URL = process.env.REACT_APP_BACK_END_URL;

export const loginByGhCode = async (ghCode: string) => {
  try {
    const response = await fetch(`${BE_BASE_URL}/auth/login-by-ghcode`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // credentials: "include",
      body: JSON.stringify({
        ghCode,
      }),
    });
    if (response.ok) {
      console.log("Login complete.");
    }
  } catch (error) {
    console.error("fail to login by ghcode:", error);
  }
};

export const getUserByCookie = async (): Promise<IUserState> => {
  try {
    const response = await fetch(`${BE_BASE_URL}/auth/get-user-by-cookie`, {
      method: "GET",
      // credentials: "include",
    });
    return defaultUserState; // 임시
  } catch (error) {
    console.error("fail to get user by cookie. Error:", error);
    return defaultUserState;
  }
};

export const deleteCookie = async () => {
  try {
    const response = await fetch(`${BE_BASE_URL}/auth/delete-cookie`, {
      method: "GET",
      credentials: "include",
    });
    if (response.ok) console.log("Cookie has been deleted.");
  } catch (error) {
    console.error("fail to delete Cookie. Error:", error);
  }
};

export const updateUser = async (user: IUserState) => {
  await fetch(`${BE_BASE_URL}/users/update`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user }),
  });
};

export const getCodeRequestURL = async () => {
  const { codeRequestURL }: { codeRequestURL: string } = await (
    await fetch(`${BE_BASE_URL}`)
  ).json();
  return codeRequestURL;
};
