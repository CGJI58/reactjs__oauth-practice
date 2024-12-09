import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { userState } from "../atoms";

interface IForm {
  nickname: string;
}

interface INickname {
  nickname?: string;
}

function Nickname({ nickname }: INickname) {
  const setUser = useSetRecoilState(userState);
  const { register, setValue, handleSubmit } = useForm<IForm>();

  const EditNickname = () => {
    setUser((prev) => ({
      ...prev,
      userInfo: { ...prev.userInfo, nickname: undefined },
    }));
  };

  const onValid = ({ nickname }: IForm) => {
    setUser((prev) => ({ ...prev, userInfo: { ...prev.userInfo, nickname } }));
    setValue("nickname", "");
  };
  return (
    <Wrapper>
      {nickname ? (
        <Greeting>
          <div>{`hello, ${nickname}!`}</div>
          <EditNicknameBtn onClick={() => EditNickname()}>edit</EditNicknameBtn>
        </Greeting>
      ) : (
        <Form onSubmit={handleSubmit(onValid)}>
          <input
            {...register("nickname", { required: true, minLength: 2 })}
            type="text"
            placeholder="write your nickname"
          />
          <button>submit</button>
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

const EditNicknameBtn = styled.button``;

const Form = styled.form``;

export default Nickname;
