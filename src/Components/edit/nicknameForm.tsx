import { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { validateNickname } from "../../Api/api";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { userConfigState } from "../../States/atoms";
import { IUserConfig } from "../../types/types";

interface INicknameForm {
  newNickname: string;
  isUnique: boolean | null;
}

const CHECK_UNIQUE = "사용 가능한 닉네임인지 확인이 필요합니다";

function NicknameForm() {
  const navigate = useNavigate();
  const setUserConfig = useSetRecoilState<IUserConfig>(userConfigState);
  const { register, getValues, handleSubmit } = useForm<INicknameForm>();
  const [isUnique, setIsUnique] = useState<boolean | null>(null);

  const checkUniqueNickname = async () => {
    const target = getValues("newNickname");
    const isValid = await validateNickname(target);
    setIsUnique(isValid);
  };

  const onValid = ({ newNickname }: INicknameForm) => {
    setUserConfig((prev) => ({ ...prev, nickname: newNickname }));
    navigate("/profile");
  };

  return (
    <Form onSubmit={handleSubmit(onValid)}>
      <UniqueCheck>
        <input
          id="newNickname"
          {...register("newNickname", { required: true })}
          placeholder="Nickname"
        />
        <input
          id="isUnique"
          {...register("isUnique", { required: true })}
          type="button"
          value="중복확인"
          onClick={() => checkUniqueNickname()}
        />
      </UniqueCheck>
      {isUnique === true && <span>사용 가능한 닉네임입니다.</span>}
      {isUnique === false && <span>이미 사용 중인 닉네임입니다.</span>}

      <Submit
        $uniqueCheck={isUnique === true}
        disabled={isUnique !== true}
        type="submit"
        value="저장"
        title={isUnique !== true ? CHECK_UNIQUE : undefined}
      />
    </Form>
  );
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  input {
    margin: 0;
    padding: 10px;
    border: none;
    border-radius: 5px;
    background: ${(props) => props.theme.backgroundLighter};
    box-shadow: ${(props) => props.theme.boxShadow};
    outline: none;
    font: inherit;
    color: inherit;
  }
  #isUnique {
    transition: 100ms ease-in-out;
    &:hover,
    &:focus {
      background-color: ${(props) => props.theme.backgroundDarker};
    }
  }
`;

const UniqueCheck = styled.div`
  display: grid;
  grid-template-columns: 7fr 3fr;
  gap: 10px;
`;

const Submit = styled.input<{ $uniqueCheck: boolean }>`
  transition: 100ms ease-in-out;
  &:hover,
  &:focus {
    cursor: ${(props) => (props.$uniqueCheck ? "default" : "not-allowed")};
    background-color: ${(props) =>
      props.$uniqueCheck ? props.theme.backgroundDarker : "transparent"};
  }
`;

export default NicknameForm;
