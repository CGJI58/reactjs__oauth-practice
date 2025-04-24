import { defaultUserState } from "../States/atoms";
import { IGetUserByCookie, IUserState } from "../types/types";

const BE_BASE_URL = process.env.REACT_APP_BACK_END_URL;

export const loginByGhCode = async (ghCode: string) => {
  console.log("Run loginByGhCode()");
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
    const { ok } = response;
    return ok;
  } catch (error) {
    console.error("loginByGhCode:", error);
    return false;
  }
};

export const getUserByCookie = async (): Promise<IGetUserByCookie> => {
  try {
    const response = await fetch(`${BE_BASE_URL}/auth/get-user-by-cookie`, {
      method: "GET",
      mode: "cors",
      credentials: "include",
    });
    if (response.ok) {
      const userData: IUserState = await response.json();
      return { status: response.status, userData };
    } else {
      return { status: response.status, userData: defaultUserState };
    }
  } catch (error) {
    return { status: null };
  }
};

export const deleteCookie = async () => {
  try {
    const response = await fetch(`${BE_BASE_URL}/auth/delete-cookie`, {
      method: "POST",
      mode: "cors",
      credentials: "include",
    });
    const { ok, status } = response;
    const responseText = await response.text();
    if (ok) {
      console.log("Cookie has been deleted.");
    } else {
      console.error("fail to delete cookie on server:", status, responseText);
    }
  } catch (error) {
    console.error(error);
  }
};

export const updateUser = async (user: IUserState) => {
  const response = await fetch(`${BE_BASE_URL}/users/update`, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user }),
  });
  return response.ok;
};

export const getCodeRequestURL = async () => {
  const { codeRequestURL }: { codeRequestURL: string } = await (
    await fetch(`${BE_BASE_URL}`)
  ).json();
  return codeRequestURL;
};
