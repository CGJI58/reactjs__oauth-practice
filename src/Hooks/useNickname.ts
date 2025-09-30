import { useNavigate } from "react-router-dom";

function useNickname() {
  const navigate = useNavigate();
  const nicknameForm = () => {
    navigate("/edit/nickname");
  };
  return { nicknameForm };
}

export default useNickname;
