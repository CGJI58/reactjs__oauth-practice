import styled from "styled-components";
import { IDiary, userState } from "../atoms";
import { useState } from "react";
import { motion } from "framer-motion";
import { useSetRecoilState } from "recoil";

interface IDiaryComponent {
  diary: IDiary;
  editMode: boolean;
}

function Diary({ diary: { date, title, text }, editMode }: IDiaryComponent) {
  const [previewClicked, setPreviewClicked] = useState(false);
  const setUser = useSetRecoilState(userState);

  const OnPreviewClicked = () => {
    setPreviewClicked((prev) => !prev);
  };

  const onDeleteClicked = () => {
    setUser((prev) => {
      const newDiaries = prev.userRecord.diaries.filter(
        (diary) => diary.date !== date
      );
      return {
        ...prev,
        userRecord: { ...prev.userRecord, diaries: newDiaries },
      };
    });
  };

  return (
    <Wrapper>
      <Preview onClick={() => OnPreviewClicked()}>
        {editMode ? (
          <DeleteBtn
            onClick={() => onDeleteClicked()}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            🗑️
          </DeleteBtn>
        ) : null}
        <Title animate={{ x: editMode ? 30 : 0 }} transition={{ duration: 0 }}>
          {title}
        </Title>
        <TimeStamp>{date}</TimeStamp>
      </Preview>
      {previewClicked ? <Text>{text}</Text> : null}
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

const Title = styled(motion.div)`
  font-size: 20px;
  font-weight: bold;
`;

const TimeStamp = styled.div``;

const DeleteBtn = styled(motion.div)`
  position: absolute;
  left: 10px;
`;

const Text = styled.div`
  padding: 10px;
  white-space: pre;
`;

export default Diary;
