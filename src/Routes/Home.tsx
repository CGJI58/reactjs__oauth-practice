import styled from "styled-components";
import { IUserState, userState } from "../atoms";
import { useRecoilState } from "recoil";
import { useForm } from "react-hook-form";

interface IForm {
  nickname: string;
}

function Home() {
  const [user, setUser] = useRecoilState<IUserState>(userState);
  const { register, setValue, handleSubmit } = useForm<IForm>();

  const onValid = ({ nickname }: IForm) => {
    setUser((prev) => ({ ...prev, userInfo: { ...prev.userInfo, nickname } }));
    //여기서 백엔드도 갱신해줘야됨.
    setValue("nickname", "");
  };

  return (
    <Wrapper>
      {user.login && !user.userInfo.nickname ? (
        <Form onSubmit={handleSubmit(onValid)}>
          <input
            {...register("nickname", { required: true })}
            type="text"
            placeholder="write your nickname"
          />
          <button>submit</button>
        </Form>
      ) : null}
      {user.login && user.userInfo.nickname ? (
        <span>{`Hello, ${user.userInfo.nickname}!`}</span>
      ) : null}
      {!user.login ? <div>{"로그인을 해주세요"}</div> : null}
    </Wrapper>
  );
}

const Wrapper = styled.div``;

const Form = styled.form``;

export default Home;
