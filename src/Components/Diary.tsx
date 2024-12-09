import styled from "styled-components";
import { IDiary } from "../atoms";
import { useState } from "react";

function Diary({ diary: { date, title, text } }: { diary: IDiary }) {
  const [clicked, setClicked] = useState(false);
  const onClicked = () => {
    setClicked((prev) => !prev);
  };
  return (
    <Wrapper>
      <Preview onClick={() => onClicked()}>
        <Title>{title}</Title>
        <TimeStamp>{date}</TimeStamp>
      </Preview>
      {clicked ? <Text>{text}</Text> : null}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 80%;
  border: 1px solid black;
  border-radius: 5px;
`;

const Preview = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  transition: all 0.3s;
  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
  cursor: pointer;
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

const Text = styled.div`
  padding: 10px;
  white-space: pre;
`;

const TimeStamp = styled.div``;

export default Diary;
