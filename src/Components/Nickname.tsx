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
  const onValid = ({ nickname }: IForm) => {
    setUser((prev) => ({ ...prev, userInfo: { ...prev.userInfo, nickname } }));
    setValue("nickname", "");
  };
  return (
    <Wrapper className="Nickname">
      {nickname ? (
        <span>{`hello, ${nickname}!`}</span>
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
  padding: 10px;
  font-size: 18px;
`;

const Form = styled.form``;

export default Nickname;
