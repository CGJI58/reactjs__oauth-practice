import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { IDiary } from "../types/types";

interface IDiaryComponent {
  diary: IDiary;
  focusIndex: number;
  focusIndexHandler: (index: number) => void;
}

function Diary({ diary, focusIndex, focusIndexHandler }: IDiaryComponent) {
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
    if (focusIndex === Number(id)) {
      setPreview(true);
    } else {
      setPreview(false);
      setMore(false);
    }
  }, [focusIndex]);

  return (
    <Wrapper>
      <StyledLink to="/read" state={{ diary }}>
        <DiaryHead>
          <Preview
            animate={{ rotate: preview ? 90 : 0 }}
            transition={{ duration: 0 }}
            onClick={(event: React.MouseEvent<HTMLDivElement>) => {
              event.stopPropagation();
              event.preventDefault();
              focusIndexHandler(Number(id));
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

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-shadow: ${(props) => props.theme.boxShadow};
  border-radius: 5px;
  user-select: none;
  & > *:hover,
  & > *:focus {
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
  grid-template-columns: auto 1fr auto;
  height: 50px;
  min-height: max-content;
  gap: 10px;
  & > * {
    padding: 10px 0px;
    display: flex;
    align-items: center;
  }
`;

const Preview = styled(motion.div)`
  justify-content: center;
  transition: 100ms linear;
  padding: 0 10px;
  &:hover {
    color: ${(props) => props.theme.highlightNegative};
  }
  * {
    font-size: ${(props) => props.theme.fontSizes.m}px;
  }
`;

const Title = styled.div<{ $preview: boolean }>`
  font-weight: bold;
  white-space: ${(props) => (props.$preview ? "pre-wrap" : "nowrap")};
  font-size: ${(props) => props.theme.fontSizes.m}px;
  overflow: ${(props) => (props.$preview ? "visible" : "hidden")};
  text-overflow: ellipsis;
`;

const TimeStamp = styled.div`
  text-align: right;
  white-space: nowrap;
  font-size: ${(props) => props.theme.fontSizes.s}px;
  padding: 0 10px;
`;

const DiaryBody = styled.div`
  width: 100%;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  overflow: hidden;
  & > * {
    font-size: ${(props) => props.theme.fontSizes.s}px;
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
    color: ${(props) => props.theme.highlightNegative};
  }
`;

export default Diary;
