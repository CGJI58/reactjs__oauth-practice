import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { validateNickname } from "../../Api/userApi";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userConfigState } from "../../States/userAtom";
import { IUserConfig } from "../../types/types";

interface INicknameForm {
  newNickname: string;
}

type IsValidNickname =
  | "valid"
  | "same"
  | "duplicated"
  | "invalidLength"
  | "invalidText"
  | null;

type NicknameTracking = string | null;

function NicknameForm() {
  const { nickname } = useRecoilValue<IUserConfig>(userConfigState);
  const navigate = useNavigate();
  const setUserConfig = useSetRecoilState<IUserConfig>(userConfigState);

  const { register, setValue, handleSubmit, watch } = useForm<INicknameForm>();
  const nicknameTracking: NicknameTracking = watch("newNickname", "");
  const [isValidNickname, setIsValidNickname] = useState<IsValidNickname>(null);
  const [runSave, setRunSave] = useState<boolean>(false);

  useEffect(() => {
    if (nickname) {
      setValue("newNickname", nickname);
    }
  }, [nickname]);

  const onValid = async ({ newNickname }: INicknameForm) => {
    const apiResult = await validateNickname(newNickname);
    if (apiResult === true) {
      setIsValidNickname("valid");
    }
  };

  useEffect(() => {
    if (nicknameTracking === "사용자") {
      setIsValidNickname("invalidText");
    } else if (nicknameTracking === nickname) {
      setIsValidNickname("same");
    } else if (nicknameTracking.length > 18 || nicknameTracking.length < 3) {
      setIsValidNickname("invalidLength");
    } else {
      setIsValidNickname(null);
    }
  }, [nicknameTracking]);

  const onSaveNickname = async ({ newNickname }: INicknameForm) => {
    const doubleCheck = await validateNickname(newNickname);
    if (doubleCheck === true) {
      setUserConfig((prev) => ({ ...prev, nickname: newNickname }));
      navigate("/profile");
    } else {
      console.error("그 새 누군가가 해당 닉네임을 사용해버렸네요..");
      setRunSave(false);
      setIsValidNickname("duplicated");
    }
  };

  useEffect(() => {
    if (runSave) {
      onSaveNickname({ newNickname: nicknameTracking });
    }
  }, [runSave]);

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit(onValid)}>
        <input
          {...register("newNickname", {
            required: true,
            minLength: 3,
            maxLength: 18,
          })}
          placeholder="write your new nickname"
        />
        {isValidNickname === null && (
          <CheckNicknameBtn className="button" type="submit" value="중복확인" />
        )}
      </Form>
      {isValidNickname === "same" && (
        <Notice>새로운 닉네임을 입력하세요.</Notice>
      )}
      {isValidNickname === "invalidText" && (
        <Notice>사용할 수 없는 닉네임입니다.</Notice>
      )}
      {isValidNickname === "duplicated" && (
        <Notice>이미 사용 중인 닉네임입니다.</Notice>
      )}
      {isValidNickname === "invalidLength" && (
        <Notice>3자 이상, 18자 이하여야 합니다.</Notice>
      )}
      {isValidNickname === "valid" && (
        <Notice>사용 가능한 닉네임입니다.</Notice>
      )}
      {isValidNickname === "valid" && (
        <SaveBtn
          type="button"
          className="button"
          value="저장"
          onClick={() => setRunSave(true)}
        />
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
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
  .button {
    cursor: pointer;
    transition: 100ms ease-in-out;
    &:hover,
    &:focus {
      background-color: ${(props) => props.theme.backgroundDarker};
    }
  }
`;

const Form = styled.form`
  display: grid;
  grid-template-columns: 7fr 3fr;
  gap: 10px;
`;

const Notice = styled.span`
  height: 20px;
`;

const CheckNicknameBtn = styled.input``;

const SaveBtn = styled.input``;

export default NicknameForm;
