import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { IUserState, userState } from "../atoms";
import {
  motion,
  useAnimation,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";

function Header() {
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  const navAnimation = useAnimation();
  const [user, setUser] = useRecoilState<IUserState>(userState);

  useMotionValueEvent(scrollY, "change", (scroll) => {
    if (scroll > 80) {
      navAnimation.start("scroll");
    } else {
      navAnimation.start("top");
    }
  });

  function onLogOutClick() {
    localStorage.removeItem("hashCode");
    setUser((prev) => ({ ...prev, hashCode: "" }));
    navigate("/");
  }

  return (
    <Wrapper variants={navVariants} initial="top" animate={navAnimation}>
      <Link to="/">
        <Col>Home</Col>
      </Link>
      {user.hashCode !== "" ? (
        <Link to={`/write`}>
          <Col>Write</Col>
        </Link>
      ) : null}
      {user.hashCode !== "" ? (
        <Col onClick={() => onLogOutClick()}>Log out</Col>
      ) : (
        <Link to="/login">
          <Col>Log in</Col>
        </Link>
      )}
    </Wrapper>
  );
}

const navVariants = {
  top: {
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  scroll: {
    backgroundColor: "rgba(0, 0, 0, 1)",
  },
};

const Wrapper = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 24px;
  a {
    height: 100%;
    text-decoration: none;
    color: whitesmoke;
  }
`;

const Col = styled.div`
  width: 1fr;
  padding: 0 10px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export default Header;
