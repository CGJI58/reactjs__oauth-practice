import { useNavigate } from "react-router-dom";
import { IModalVariants } from "../types/types";

function useNickname() {
  const navigate = useNavigate();
  const nicknameVariants: IModalVariants = {
    modalId: "nickname",
    sentence: "닉네임을 변경하시겠습니까?",
  };
  const nicknameForm = () => {
    navigate("/edit/nickname");
  };
  return { nicknameVariants, nicknameForm };
}

export default useNickname;
