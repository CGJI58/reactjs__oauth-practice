import styled from "styled-components";
import useGetUserByCookie from "../Hooks/useGetUserByCookie";
import useTempDiary from "../Hooks/useTempDiary";

function Profile() {
  useGetUserByCookie();
  useTempDiary();
  return (
    <Wrapper>
      <UserProfile>user profile</UserProfile>
    </Wrapper>
  );
}

const Wrapper = styled.div``;

const UserProfile = styled.div``;

export default Profile;
