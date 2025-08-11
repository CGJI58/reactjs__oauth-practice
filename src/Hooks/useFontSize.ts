import { IModalVariants } from "../types/modal";

function useFontSize() {
  const fontSizeVariants: IModalVariants = {
    sentence: "글자 크기를 선택하세요.",
    modalOption: "Range",
    modalId: "fontSize",
  };

  const handleFontSize = () => {
    console.log("Run handleFontSize");
  };

  return { fontSizeVariants, handleFontSize };
}

export default useFontSize;
