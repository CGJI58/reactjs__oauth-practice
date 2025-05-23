import { IModalVariants } from "../types/types";

function usePassword() {
  const passwordVariants: IModalVariants = {
    modalId: "password",
    sentence: "비밀번호를 생성 또는 변경하시겠습니까?",
  };
  const passwordForm = () => {
    console.log("비밀번호 생성 또는 변경");
  };
  return { passwordVariants, passwordForm };
}

export default usePassword;
