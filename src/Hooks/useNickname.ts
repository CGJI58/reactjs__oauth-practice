import { IModalVariants } from "../types/types";

function useNickname() {
  const nicknameVariants: IModalVariants = {
    modalId: "nickname",
    sentence: "닉네임을 생성 또는 변경하시겠습니까?",
  };
  const nicknameForm = () => {
    console.log("닉네임 생성 또는 변경");
  };
  return { nicknameVariants, nicknameForm };
}

export default useNickname;
