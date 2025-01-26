import styled from "styled-components";
import { IDiary, userState } from "../atoms";
import { useState } from "react";
import { motion } from "framer-motion";
import { useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";

interface IDiaryComponent {
  diary: IDiary;
}

function Diary({ diary: { date, title, text } }: IDiaryComponent) {
  const navigate = useNavigate();
  const setUser = useSetRecoilState(userState);
  const [preview, setPreview] = useState(false);

  const OnPreviewClicked = () => {
    setPreview((prev) => !prev);
  };

  const onModifyClicked = () => {
    const confirmed = window.confirm("정말로 수정하시겠습니까?");
    if (confirmed) {
      // 해당 Diary 의 date, title, text 데이터를 Write 페이지로 보냄 (navigate)
      const state: { diary: IDiary } = { diary: { date, title, text } };
      navigate(`write?mode=modify&diary_id=${date}`, { state }); // id 속성을 추가할 예정임(임시로 date 사용).
    }
  };

  const onDeleteClicked = () => {
    const confirmed = window.confirm("정말로 삭제하시겠습니까?");
    if (confirmed) {
      setUser((prev) => {
        const newDiaries = prev.userRecord.diaries.filter(
          (diary) => diary.date !== date
        );
        return {
          ...prev,
          userRecord: { ...prev.userRecord, diaries: newDiaries },
        };
      });
    }
  };

  return (
    <Wrapper>
      <Preview onClick={() => OnPreviewClicked()}>
        {preview ? (
          <ModifyBtn
            title="수정"
            onClick={() => onModifyClicked()}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            🔄
          </ModifyBtn>
        ) : null}

        <Title animate={{ x: preview ? 30 : 0 }} transition={{ duration: 0 }}>
          {title}
        </Title>
        <TimeStamp
          animate={{ x: preview ? -30 : 0 }}
          transition={{ duration: 0 }}
        >
          {date}
        </TimeStamp>
        {preview ? (
          <DeleteBtn
            title="삭제"
            onClick={() => onDeleteClicked()}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            🗑️
          </DeleteBtn>
        ) : null}
      </Preview>
      {preview ? <Text>{text}</Text> : null}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  border: 1px solid black;
  border-radius: 5px;
`;

const Preview = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  transition: all 0.3s;
  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
  cursor: pointer;
`;

const ModifyBtn = styled(motion.div)`
  position: absolute;
  left: 10px;
`;

const Title = styled(motion.div)`
  font-size: 20px;
  font-weight: bold;
`;

const TimeStamp = styled(motion.div)``;

const DeleteBtn = styled(motion.div)`
  position: absolute;
  right: 10px;
`;

const Text = styled.div`
  padding: 10px;
  white-space: pre;
`;

export default Diary;
