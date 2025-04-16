import { DefaultTheme } from "styled-components";

export const darkTheme: DefaultTheme = {
  text: "whitesmoke",
  highlight: "red",
  backgroundRegular: "#374151",
  backgroundLighter: "#374251",
  backgroundDarker: "#2A303E",
  boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.2), -2px -2px 4px rgba(0, 0, 0, 0.2)",
};

export const lightTheme: DefaultTheme = {
  text: "black",
  highlight: "firebrick",
  backgroundRegular: "#F9FAFB",
  backgroundLighter: "#FFFFFF",
  backgroundDarker: "#E5E7EB",
  boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.2), -2px -2px 4px rgba(0, 0, 0, 0.2)",
};
