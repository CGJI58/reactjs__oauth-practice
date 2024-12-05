import { IUserState } from "../atoms";

export const updateUser = async (user: IUserState) => {
  await fetch("http://localhost:8000/users/update", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user }),
  });
};
