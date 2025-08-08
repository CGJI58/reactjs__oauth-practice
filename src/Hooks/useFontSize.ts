import { IModalVariants } from "../types/modal";

function useFontSize() {
  const fontSizeVariants: IModalVariants = {
    sentence: "useFontSize sentence",
    modalOption: "Range",
    modalId: "fontSize",
  };

  const handleFontSize = () => {
    console.log("Run handleFontSize");
  };

  return { fontSizeVariants, handleFontSize };
}

export default useFontSize;
