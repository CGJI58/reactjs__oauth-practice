import styled from "styled-components";
import { IDiary } from "../States/atoms";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleRight } from "@fortawesome/free-solid-svg-icons";

interface IDiaryComponent {
  diary: IDiary;
  focus: [
    focused: number,
    setFocused: React.Dispatch<React.SetStateAction<number>>
  ];
}

function Diary({ diary, focus: [focused, setFocused] }: IDiaryComponent) {
  const { id, date, title, text } = diary;
  const [preview, setPreview] = useState<boolean>(false);
  useEffect(() => {
    if (focused === Number(id)) {
      setPreview(true);
    } else {
      setPreview(false);
    }
  }, [focused]);

  return (
    <Wrapper>
      <DiaryHead>
        <Preview
          onClick={() =>
            setFocused((prev) => (prev === Number(id) ? 0 : Number(id)))
          }
        >
          {preview ? (
            <FontAwesomeIcon icon={faAngleDown} />
          ) : (
            <FontAwesomeIcon icon={faAngleRight} />
          )}
        </Preview>
        <Title>{title}</Title>
        <TimeStamp>{date}</TimeStamp>
      </DiaryHead>
      {preview ? <DiaryBody>{text}</DiaryBody> : null}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  max-width: 800px;
  min-width: 300px;
  border: 1px solid black;
  border-radius: 5px;
`;

const DiaryHead = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  transition: all 0.3s;
  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
  cursor: default;
`;

const Preview = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  cursor: pointer;
`;

const Title = styled(motion.div)`
  width: 50%;
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

// innerwidth가 일정 수준 이하로 내려가면 안 보이게 할 것
// Wrapper의 width가 400px 이하로 떨어지면 비활성화
const TimeStamp = styled(motion.div)`
  width: 50%;
  text-align: right;
  white-space: nowrap;
  font-size: 0.8rem;
  overflow: hidden;
`;

const DiaryBody = styled.div`
  font-size: 0.9rem;
  line-height: 1.3rem;
  margin: 10px 30px;
  white-space: pre-wrap;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
`;

export default Diary;
