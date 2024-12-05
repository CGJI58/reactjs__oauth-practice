import styled from "styled-components";
import { IUserState, userState } from "../atoms";
import { useRecoilState } from "recoil";
import { useForm } from "react-hook-form";
import Diaries from "./Diaries";
import { useEffect } from "react";
import { updateUser } from "../utility/utility";

interface IForm {
  nickname: string;
}

function LoggedInHome() {
  const [user, setUser] = useRecoilState<IUserState>(userState);
  const { register, setValue, handleSubmit } = useForm<IForm>();

  useEffect(() => {
    updateUser(user);
  }, [user]);

  const onValid = ({ nickname }: IForm) => {
    setUser((prev) => ({ ...prev, userInfo: { ...prev.userInfo, nickname } }));
    setValue("nickname", "");
  };

  return (
    <Wrapper>
      {user.userInfo.nickname ? (
        <>
          <span>{`Hello, ${user.userInfo.nickname}!`}</span>
          <Diaries diaries={user.userInfo.diaries ?? []} />
        </>
      ) : (
        <Form onSubmit={handleSubmit(onValid)}>
          <input
            {...register("nickname", { required: true })}
            type="text"
            placeholder="write your nickname"
          />
          <button>submit</button>
        </Form>
      )}
      <>
        <ConsoleLogBtn onClick={() => console.log(user)}>
          FE userState
        </ConsoleLogBtn>
        <ConsoleLogBtn onClick={() => getUserBE(user.userInfo.email)}>
          BE userState
        </ConsoleLogBtn>
      </>
    </Wrapper>
  );
}

const getUser = async (email: string) => {
  const response = await fetch(`http://localhost:8000/users/${email}`);
  const user = await response.json();
  return user;
};

const getUserBE = (email: string) => {
  getUser(email).then((user) => console.log(user));
};

const Wrapper = styled.div``;

const Form = styled.form``;

const ConsoleLogBtn = styled.button`
  //확인 편의성을 위해 임시로 만들어둔거. 나중에 지울거임
  width: 100px;
`;

export default LoggedInHome;
