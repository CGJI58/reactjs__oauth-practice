import { defaultUserState, IUserState } from "../atoms";

const BE_BASE_URL = process.env.REACT_APP_BACK_END_URL;

export const getUserByGhCode = async (ghCode: string): Promise<IUserState> => {
  try {
    const response = await fetch(`${BE_BASE_URL}/users/get-user-by-ghcode`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ghCode,
      }),
    });
    const userData: IUserState = await response.json();
    return userData;
  } catch {
    return defaultUserState;
  }
};

export const getUserByCookie = async () => {
  try {
    const response = await fetch(`${BE_BASE_URL}/users/get-user-by-hashcode`, {
      method: "GET",
      credentials: "include",
    });
    const userData: IUserState = await response.json();
    return userData;
  } catch {
    return defaultUserState;
  }
};

export const logOut = async () => {
  try {
    await fetch(`${BE_BASE_URL}/users/logout`, {
      method: "POST",
      credentials: "include",
    });
    console.log("Cookie has been deleted.");
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
