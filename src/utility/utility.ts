import { defaultUserState, IUserState } from "../atoms";

const BE_BASE_URL = process.env.REACT_APP_BACK_END_URL;

export const loginByGhCode = async (ghCode: string) => {
  try {
    const response = await fetch(`${BE_BASE_URL}/auth/login-by-ghcode`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        ghCode,
      }),
    });
    if (response.status < 300) {
      return true;
    } else return false;
  } catch (error) {
    console.error("fail to login by ghcode:", error);
    return false;
  }
};

export const getUserByCookie = async (): Promise<IUserState> => {
  try {
    const response = await fetch(`${BE_BASE_URL}/auth/get-user-by-cookie`, {
      method: "GET",
      mode: "cors",
      credentials: "include",
    });
    const userData: IUserState = await response.json();
    return userData;
  } catch (error) {
    console.error(error);
    return defaultUserState;
  }
};

export const deleteCookie = async () => {
  try {
    const response = await fetch(`${BE_BASE_URL}/auth/delete-cookie`, {
      method: "POST",
      mode: "cors",
      credentials: "include",
    });
    if (response.ok) {
      console.log("Cookie has been deleted.");
    } else {
      console.error(
        "fail to delete cookie on server:",
        response.status,
        await response.text()
      );
    }
  } catch (error) {
    console.error(error);
  }
};

export const updateUser = async (user: IUserState) => {
  await fetch(`${BE_BASE_URL}/users/update`, {
    method: "POST",
    mode: "cors",
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
