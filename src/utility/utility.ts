import { defaultUserState, IUserState } from "../atoms";

// const BE_BASE_URL = "http://localhost:8000";
const BE_BASE_URL = process.env.REACT_APP_BACK_END_URL;

export const getUserByGhCode = async (ghCode: string) => {
  const response = await fetch(`${BE_BASE_URL}/users/ghcode`, {
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
};

export const getUserByHashCode = async (hashCode: string) => {
  const response = await fetch(`${BE_BASE_URL}/users/hashcode`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      hashCode,
      default: defaultUserState,
    }),
  });
  const userData: IUserState = await response.json();
  return userData;
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
