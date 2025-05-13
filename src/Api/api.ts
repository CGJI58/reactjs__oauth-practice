import { defaultUserState } from "../States/atoms";
import { IGetUserByCookie, IUserState } from "../types/types";

const BE_BASE_URL = process.env.REACT_APP_BACK_END_URL;

export const loginByGhCode = async (ghCode: string): Promise<boolean> => {
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
    if (ok) {
      return ok;
    } else {
      throw new Error(`Server responded with status: ${response.status}`);
    }
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
    const { ok, status } = response;
    if (ok) {
      const userData: IUserState = await response.json();
      return { status: status, userData };
    } else {
      return { status: status, userData: defaultUserState };
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

export const updateUser = async (user: IUserState): Promise<boolean> => {
  try {
    const response = await fetch(`${BE_BASE_URL}/users/update`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user }),
    });
    const { ok, status } = response;
    if (ok) {
      return ok;
    } else {
      throw new Error(`fail to delete user data on server: ${status}`); // 이거 메세지가 좀 잘못됐음. 수정할 것.
      // 백엔드에서도 update 할 때 delete user 어쩌구 메세지였던거같은데
      // 회원탈퇴기능이랑 헷갈리니까 이것도 찾아서 다 고쳐
    }
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const deleteUser = async (user: IUserState): Promise<boolean> => {
  try {
    const response = await fetch(`${BE_BASE_URL}/auth/delete-user`, {
      method: "DELETE",
      mode: "cors",
      credentials: "include",
    });
    const { ok, status } = response;
    const responseText = await response.text();
    if (ok) {
      console.log("User data has been deleted.");
      return ok;
    } else {
      throw new Error(
        `fail to delete user data on server: ${status} ${responseText}`
      );
    }
  } catch (error) {
    console.error(error);
    return false;
  }
};

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
