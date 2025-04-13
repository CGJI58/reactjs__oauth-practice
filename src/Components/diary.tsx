import styled from "styled-components";
import { IDiary } from "../States/atoms";
import { useEffect, useRef, useState } from "react";
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
  const textRef = useRef<null | HTMLDivElement>(null);
  const [more, setMore] = useState<boolean>(false);
  const [isTruncated, setIsTruncated] = useState<boolean>(false);
  useEffect(() => {
    if (textRef.current) {
      const { scrollHeight, clientHeight } = textRef.current;
      setIsTruncated(scrollHeight > clientHeight || more);
    }
  }, [more, preview]);

  useEffect(() => {
    if (focused === Number(id)) {
      setPreview(true);
    } else {
      setPreview(false);
      setMore(false);
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
      {preview ? (
        <DiaryBody>
          {/* $more 이렇게 앞에 $를 붙이면 more이 DOM으로 전달되지 않도록 할 수 있음. React에서 허용하지 않은 변수 전달 방지 */}
          <Text ref={textRef} $more={more}>
            {text}
          </Text>
          {isTruncated && (
            <More onClick={() => setMore((prev) => !prev)}>
              {more ? "간략히" : "더보기"}
            </More>
          )}
        </DiaryBody>
      ) : null}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  max-width: 800px;
  min-width: 300px;
  border: 1px solid black;
  border-radius: 5px;
  transition: 100ms ease-out 100ms;
  cursor: pointer;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const DiaryHead = styled.div`
  display: grid;
  grid-template-columns: 20px 1fr 100px;
  grid-template-rows: repeat(3, 100%);
  gap: 10px;
  padding: 0px 10px;
  box-sizing: border-box;
  & > * {
    padding: 10px 0px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
  }
`;

const Preview = styled.div`
  justify-content: center;
  transition: 100ms linear;
  &:hover {
    scale: 1.2;
    color: ${(props) => props.theme.highlight};
  }
`;

const Title = styled.div`
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const TimeStamp = styled.div`
  text-align: right;
  white-space: nowrap;
  font-size: 0.8rem;
  overflow: hidden;
`;

const DiaryBody = styled.div`
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  & > * {
    font-size: 0.9rem;
    margin-left: 30px;
    box-sizing: border-box;
  }
`;

const Text = styled.div<{ $more: boolean }>`
  line-height: 1.3rem;
  white-space: pre-wrap;
  overflow: ${(props) => (props.$more ? "visible" : "hidden")};
  display: ${(props) => (props.$more ? "flex" : "-webkit-box")};
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
`;

const More = styled.span`
  width: max-content;
  transition: 100ms linear;
  &:hover {
    color: ${(props) => props.theme.highlight};
  }
`;

export default Diary;
