import { defaultUserState } from "../constants/defaults";
import { BE_BASE_URL } from "../constants/urls";
import { IGetUserByCookie, IUserState } from "../types/types";

export const getCodeRequestURL = async (): Promise<string> => {
  try {
    const { codeRequestURL }: { codeRequestURL: string } = await (
      await fetch(`${BE_BASE_URL}`)
    ).json();
    return codeRequestURL;
  } catch (error) {
    console.error("getCodeRequestURL:", error);
    return "";
  }
};

export const loginByGhCode = async (ghCode: string): Promise<void> => {
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
    if (!ok) {
      throw new Error(`Server responded with status: ${response.status}`);
    }
  } catch (error) {
    console.error("loginByGhCode:", error);
  }
};

export const getUserByCookie = async (): Promise<IGetUserByCookie> => {
  try {
    const response = await fetch(`${BE_BASE_URL}/auth/get-user-by-cookie`, {
      method: "GET",
      mode: "cors",
      credentials: "include",
    });
    const { ok, status } = response;
    if (ok) {
      const userData: IUserState = await response.json();
      return { status, userData };
    } else {
      return { status, userData: defaultUserState };
    }
  } catch (error) {
    console.error("getUserByCookie:", error);
    return { status: null };
  }
};

export const deleteCookie = async (): Promise<void> => {
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
      return;
    } else {
      throw new Error(
        `fail to delete user data on server: ${status} ${responseText}`
      );
    }
  } catch (error) {
    console.error(error);
    return;
  }
};
