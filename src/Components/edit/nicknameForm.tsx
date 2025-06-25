import { useEffect, useState } from "react";
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
  const { register, getValues, handleSubmit, watch } = useForm<INicknameForm>();
  const nicknameTracking = watch("newNickname", "");
  const [isUnique, setIsUnique] = useState<boolean | null>(null);
  const [verifiedNickname, setVerifiedNickname] = useState<string | null>(null);

  const checkUniqueNickname = async () => {
    const target = getValues("newNickname");
    const isValid = await validateNickname(target);
    setIsUnique(isValid);
  };

  const onValid = ({ newNickname }: INicknameForm) => {
    setUserConfig((prev) => ({ ...prev, nickname: newNickname }));
    navigate("/profile");
  };

  useEffect(() => {
    if (isUnique) {
      setVerifiedNickname(() => getValues("newNickname"));
    }
  }, [isUnique]);

  useEffect(() => {
    if (isUnique && verifiedNickname) {
      // 중복검사 통과한 닉네임이랑 달라지는 순간 폼을 제출하지 못하도록 한다.
      if (verifiedNickname !== nicknameTracking) {
        setIsUnique(null);
        setVerifiedNickname(null);
      }
    }
  }, [isUnique, verifiedNickname, nicknameTracking]);

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
      {isUnique === true && <Notice>사용 가능한 닉네임입니다.</Notice>}
      {isUnique === false && <Notice>이미 사용 중인 닉네임입니다.</Notice>}
      {isUnique === null && <Notice></Notice>}
      {isUnique === true && (
        <Submit
          id="Submit"
          disabled={isUnique !== true}
          type="submit"
          value="저장"
          title={isUnique !== true ? CHECK_UNIQUE : undefined}
        />
      )}
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
  #isUnique,
  #Submit {
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

const Notice = styled.span`
  height: 20px;
`;

const Submit = styled.input``;

export default NicknameForm;
