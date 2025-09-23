import { IModalVariants } from "../types/types";

function useScreenWidth() {
  const screenWidthVariants: IModalVariants = {
    sentence: "",
    modalOption: "Range",
    modalId: "screenWidth",
  };

  const handleScreenWidth = () => {
    console.log("Run handleScreenWidth");
  };

  return { screenWidthVariants, handleScreenWidth };
}

export default useScreenWidth;
