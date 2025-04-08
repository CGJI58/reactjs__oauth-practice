import { DefaultTheme } from "styled-components";

export const darkTheme: DefaultTheme = {
  text: "whitesmoke",
  background: { regular: "#374151", lighter: "#374251", darker: "#374051" },
  highlight: "red",
};

export const lightTheme: DefaultTheme = {
  text: "black",
  background: {
    regular: "#F9FAFB",
    lighter: "#FFFFFF",
    darker: "#E5E7EB",
  },
  highlight: "firebrick",
};
