import { IUserState } from "../types/types";
import { BE_BASE_URL } from "../constants/urls";

export const updateUser = async (user: IUserState): Promise<boolean> => {
  try {
    const response = await fetch(`${BE_BASE_URL}/users/update`, {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user }),
    });
    const { ok, status } = response;
    if (ok) {
      return ok;
    } else {
      throw new Error(`fail to delete user data on server: ${status}`);
    }
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const deleteUser = async (email: string): Promise<boolean> => {
  try {
    const response = await fetch(`${BE_BASE_URL}/users`, {
      method: "DELETE",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
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

export const validateNickname = async (nickname: string): Promise<boolean> => {
  try {
    const response = await fetch(
      `${BE_BASE_URL}/users/validate-nickname?nickname=${nickname}`,
      {
        method: "GET",
        mode: "cors",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const { isValid } = await response.json();
    console.log(isValid);
    return isValid;
  } catch (error) {
    console.error("validateNickname:", error);
    return false;
  }
};
