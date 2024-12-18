import { IUserState } from "../atoms";

const BASE_URL = "http://localhost:8000";
// const BASE_URL = process.env.REACT_APP_BACK_END_URL;

export const updateUser = async (user: IUserState) => {
  await fetch("http://localhost:8000/users/update", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user }),
  });
};

export const getCodeRequestURL = async () => {
  const { codeRequestURL }: { codeRequestURL: string } = await (
    await fetch(`${BASE_URL}`)
  ).json();
  return codeRequestURL;
};

/**
 *
 * @param ghCode
 * @returns user object : IUserState
 */
export const login = async (ghCode: string) => {
  const response = await fetch(`${BASE_URL}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ghCode,
    }),
  });
  const data = await response.json();
  return data;
};
