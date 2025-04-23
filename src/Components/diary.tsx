import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { IDiary } from "../types/types";

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
    <Wrapper layout transition={{ duration: 0.1 }}>
      <StyledLink to="/read" state={{ diary }}>
        <DiaryHead>
          <Preview
            animate={{ rotate: preview ? 90 : 0 }}
            transition={{ duration: 0 }}
            onClick={(event: React.MouseEvent<HTMLDivElement>) => {
              event.stopPropagation();
              event.preventDefault();
              setFocused((prev) => (prev === Number(id) ? 0 : Number(id)));
            }}
          >
            <FontAwesomeIcon icon={faAngleRight} />
          </Preview>
          <Title $preview={preview}>{title}</Title>
          <TimeStamp>{date}</TimeStamp>
        </DiaryHead>
        {preview ? (
          <DiaryBody>
            <Text ref={textRef} $more={more}>
              {text}
            </Text>
            {isTruncated && (
              <More
                onClick={(event: React.MouseEvent<HTMLDivElement>) => {
                  event.stopPropagation();
                  event.preventDefault();
                  setMore((prev) => !prev);
                }}
              >
                {more ? "간략히" : "더보기"}
              </More>
            )}
          </DiaryBody>
        ) : null}
      </StyledLink>
    </Wrapper>
  );
}

const Wrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  max-width: 600px;
  min-width: 300px;
  box-shadow: ${(props) => props.theme.boxShadow};
  border-radius: 5px;
  transition: 100ms ease-out 100ms;
  &:hover {
    background-color: ${(props) => props.theme.backgroundDarker};
  }
`;

const StyledLink = styled(Link)`
  color: ${(props) => props.theme.text};
  text-decoration: none;
  cursor: default;
  &:visited {
    color: ${(props) => props.theme.text};
  }
`;

const DiaryHead = styled.div`
  display: grid;
  grid-template-columns: 20px 1fr 100px;
  height: 50px;
  min-height: max-content;
  gap: 10px;
  padding-right: 10px;
  & > * {
    padding: 10px 0px;
    display: flex;
    align-items: center;
  }
`;

const Preview = styled(motion.div)`
  justify-content: center;
  transition: 100ms linear;
  &:hover {
    color: ${(props) => props.theme.highlight};
  }
`;

const Title = styled.div<{ $preview: boolean }>`
  font-weight: bold;
  white-space: ${(props) => (props.$preview ? "pre-wrap" : "nowrap")};
  overflow: ${(props) => (props.$preview ? "visible" : "hidden")};
  text-overflow: ellipsis;
`;

const TimeStamp = styled.div`
  text-align: right;
  white-space: nowrap;
  font-size: 0.8rem;
  overflow: hidden;
`;

const DiaryBody = styled.div`
  width: 100%;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow: hidden;
  & > * {
    font-size: 0.9rem;
  }
`;

const Text = styled.div<{ $more: boolean }>`
  width: 100%;
  padding: 0px 30px;
  line-height: 180%;
  white-space: pre-wrap;
  overflow: ${(props) => (props.$more ? "visible" : "hidden")};
  display: ${(props) => (props.$more ? "flex" : "-webkit-box")};
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
`;

const More = styled.span`
  width: max-content;
  padding: 5px;
  margin-left: 30px;
  transition: 100ms linear;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
    color: ${(props) => props.theme.highlight};
  }
`;

export default Diary;
