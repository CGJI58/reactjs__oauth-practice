import { useRecoilState } from "recoil";
import { userConfigState } from "../States/userAtom";
import { IUserConfig, UIScaleOption } from "../types/types";

function useUISettings() {
  const [{ isDarkTheme }, setUserConfig] =
    useRecoilState<IUserConfig>(userConfigState);

  const handleUIScale = (rangeValue?: UIScaleOption) => {
    if (rangeValue !== undefined) {
      localStorage.setItem("UIScale", `${rangeValue}`);
      setUserConfig((prev) => ({ ...prev, UIScale: rangeValue }));
    }
  };

  const handleDarkMode = () => {
    localStorage.setItem("darkMode", `${!isDarkTheme}`);
    setUserConfig((prev) => {
      return { ...prev, isDarkTheme: !prev.isDarkTheme };
    });
  };

  return { handleUIScale, handleDarkMode };
}

export default useUISettings;
