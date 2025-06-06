import hash from "hash.js";

export const hashString = (input: string): string => {
  return hash.sha256().update(input).digest("hex");
};
