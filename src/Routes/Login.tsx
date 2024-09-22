import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const CLIENT_ID = "Ov23likK8jCwRyDMDNi8";

interface IForm {
  id: string;
  pw: string;
}

function Login() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<IForm>();
  const onValid = (data: IForm) => {
    navigate(`/userinfo?id=${data.id}&pw=${data.pw}`);
  };
  return (
    <Wrapper>
      <Popup>
        <ExitBtn>
          <Link to="/">❌</Link>
        </ExitBtn>
        <Title>Log In</Title>
        <LoginForm onSubmit={handleSubmit(onValid)}>
          <IDPWBox>
            <input
              placeholder="ID"
              {...register("id", { required: true, minLength: 4 })}
            />
            <input
              type="password"
              placeholder="PW"
              {...register("pw", { required: true, minLength: 4 })}
            />
          </IDPWBox>
          <LoginButton>log in</LoginButton>
        </LoginForm>
        <GithubButton>
          <FontAwesomeIcon icon={faGithub} size="2x" />
          <Link
            to={`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=read:user user:email`}
          >
            log in with a github
          </Link>
        </GithubButton>
      </Popup>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
  box-sizing: border-box;
`;
const Popup = styled.div`
  position: relative;
  width: 400px;
  height: 300px;
  box-sizing: border-box;
  border-radius: 10px;
  background-color: darkcyan;
  display: flex;
  flex-direction: column;
  padding: 50px;
  gap: 20px;
`;

const ExitBtn = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.8);
  cursor: pointer;
  a {
    text-decoration: none;
  }
`;

const Title = styled.div`
  font-size: 34px;
  font-weight: 800;
  margin-bottom: 10px;
`;

const LoginForm = styled.form`
  display: grid;
  grid-template-columns: 4fr 1fr;
  gap: 5px;
`;

const IDPWBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  input {
    border-radius: 5px;
    padding: 5px;
  }
`;

const LoginButton = styled.button`
  border-radius: 10px;
`;

const GithubButton = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  box-sizing: border-box;
  gap: 20px;
  background-color: #1f2937;
  cursor: pointer;
  color: white;
  border-radius: 10px;
  width: 100%;
  a {
    color: white;
    text-decoration: none;
  }
`;

export default Login;
