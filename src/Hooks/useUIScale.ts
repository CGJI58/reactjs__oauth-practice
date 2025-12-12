import { useSetRecoilState } from "recoil";
import { userConfigState } from "../States/userAtom";
import { IUserConfig, UIScaleOption } from "../types/types";

function useUIScale() {
  const setUserConfig = useSetRecoilState<IUserConfig>(userConfigState);
  const handleUIScale = (rangeValue?: UIScaleOption) => {
    if (rangeValue !== undefined) {
      setUserConfig((prev) => ({ ...prev, UIScale: rangeValue }));
    }
  };

  return { handleUIScale };
}

export default useUIScale;
