import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { userState } from "../States/atoms";

interface IForm {
  nickname: string;
}

interface INickname {
  nickname: string;
}

function Nickname({ nickname }: INickname) {
  const setUser = useSetRecoilState(userState);
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>();

  const resetNickname = () => {
    setUser((prev) => ({
      ...prev,
      userRecord: { ...prev.userRecord, nickname: "" },
    }));
  };

  const onValid = ({ nickname }: IForm) => {
    setUser((prev) => ({
      ...prev,
      userRecord: { ...prev.userRecord, nickname },
    }));
    setValue("nickname", "");
  };
  return (
    <Wrapper>
      {nickname ? (
        <Greeting>
          <div>{`hello, ${nickname}!`}</div>
          <ResetNicknameBtn onClick={() => resetNickname()}>
            edit
          </ResetNicknameBtn>
        </Greeting>
      ) : (
        <Form onSubmit={handleSubmit(onValid)}>
          <label htmlFor="nickname">nickname: </label>
          <input
            id="nickname"
            {...register("nickname", {
              required: true,
              minLength: { value: 2, message: "2글자 이상 작성해주세요." },
            })}
            type="text"
            placeholder="write your nickname"
          />
          <button>submit</button>
          {errors.nickname && <span>{errors.nickname.message}</span>}
        </Form>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  font-size: 18px;
`;

const Greeting = styled.div`
  display: flex;
  gap: 10px;
`;

const ResetNicknameBtn = styled.button``;

const Form = styled.form`
  display: flex;
  gap: 5px;
`;

export default Nickname;
