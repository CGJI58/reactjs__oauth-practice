import { Link, useLocation, useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import {
  defaultUserState,
  IDiary,
  IUserState,
  loginState,
  userState,
} from "../atoms";
import {
  motion,
  useAnimation,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { deleteCookie } from "../utility/utility";

function Header() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { scrollY } = useScroll();
  const navAnimation = useAnimation();
  const [user, setUser] = useRecoilState<IUserState>(userState);
  const setLogin = useSetRecoilState<boolean>(loginState);
  useMotionValueEvent(scrollY, "change", (scroll) => {
    if (scroll > 20) {
      navAnimation.start("scroll");
    } else {
      navAnimation.start("top");
    }
  });

  function saveIfTempDiary() {
    const stringTempDiary = localStorage.getItem("tempDiary");
    if (pathname === "/write" && stringTempDiary) {
      const confirmed = window.confirm("변경사항을 저장하시겠습니까?");
      if (confirmed) {
        const tempDiary: IDiary = JSON.parse(stringTempDiary);
        //아래 setUser 가 write 에 있는 코드의 반복인데, 합칠 수 있는 방법 찾아볼 것
        setUser((prev) => {
          const originalDiaries = prev.userRecord.diaries;
          const modifiedDiaries = originalDiaries.filter(
            (diary) => diary.id !== tempDiary.id
          );
          const newUser: IUserState = {
            ...prev,
            userRecord: {
              ...prev.userRecord,
              diaries: [tempDiary, ...modifiedDiaries],
            },
          };
          return newUser;
        });
      }
      localStorage.clear();
    }
  }

  async function onLogOutClick() {
    await deleteCookie();
    setUser(() => defaultUserState);
    setLogin(() => false);
    navigate("/");
  }

  return (
    <Wrapper variants={navVariants} initial="top" animate={navAnimation}>
      <Link to="/" onClick={() => saveIfTempDiary()}>
        <Col>Home</Col>
      </Link>
      {user.userInfo?.email !== "" ? (
        <Link
          to={{ pathname: "/write", search: "?mode=create" }}
          state={{ diary: { id: "", date: "", title: "", text: "" } }}
        >
          <Col>Write</Col>
        </Link>
      ) : null}
      {user.userInfo?.email !== "" ? (
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
  z-index: 99;
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
