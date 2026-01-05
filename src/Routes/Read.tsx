import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IDiary } from "../types/types";
import useModalContext from "../Hooks/useModalContext";
import { useEffect } from "react";
import useDiary from "../Hooks/useDiary";
import { backgroundGradient } from "../theme/animations";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";

function Read() {
  const location = useLocation();
  const navigate = useNavigate();
  const diary: IDiary = location.state.diary;
  const { diaryId, createdAt, modifiedAt, title, text } = diary;
  const { modalAction, modalResponse } = useModalContext();
  const { navigateToModifyPage, deleteDiary } = useDiary();

  useEffect(() => {
    if (modalResponse.confirm) {
      if (modalResponse.modalId === "modifyDiary") {
        navigateToModifyPage(diary);
      } else if (modalResponse.modalId === "deleteDiary") {
        if (!diaryId) return;
        deleteDiary(diaryId);
      }
    }
  }, [modalResponse]);

  return (
    <Wrapper>
      <Headline>
        <Buttons>
          <BackBtn type="button" value="뒤로" onClick={() => navigate("/")} />
          <div className="rightBtns">
            <ModifyBtn
              type="button"
              value="수정"
              onClick={() => modalAction({ modalId: "modifyDiary" })}
            />
            <DeleteBtn
              type="button"
              value="삭제"
              onClick={() => modalAction({ modalId: "deleteDiary" })}
            />
          </div>
        </Buttons>
        <DiaryDate>
          <div>작성일</div>
          <div>{createdAt.absTime}</div>
        </DiaryDate>
        {createdAt.absTime !== modifiedAt.absTime && (
          <DiaryDate>
            <div>수정일</div>
            <div>{modifiedAt.absTime}</div>
          </DiaryDate>
        )}
      </Headline>
      <Context>
        <DiaryTitle>{title}</DiaryTitle>
        <DiaryText>
          <ReactMarkdown rehypePlugins={[[rehypeHighlight, { detect: true }]]}>
            {text}
          </ReactMarkdown>
        </DiaryText>
      </Context>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  font-size: ${(props) => props.theme.fontSizes.m}px;
  margin-top: 30px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-self: center;
  justify-self: center;
  padding-bottom: 30px;
  gap: 10px;
`;

const Headline = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  input {
    color: ${(props) => props.theme.text};
    font-size: ${(props) => props.theme.fontSizes.l}px;
    font-weight: bold;
    cursor: pointer;
    user-select: none;
    padding: 5px 10px;
    background-color: ${(props) => props.theme.backgroundDarker};
  }
`;

const BackBtn = styled.input`
  &:focus {
    animation: ${({ theme }) =>
        backgroundGradient(theme.backgroundDarker, theme.highlightPositive)}
      1s infinite linear;
  }
  &:hover {
    background-color: ${(props) => props.theme.highlightPositive};
  }
`;

const ModifyBtn = styled.input`
  margin-right: 10px;
  &:focus {
    animation: ${({ theme }) =>
        backgroundGradient(theme.backgroundDarker, theme.highlightPositive)}
      1s infinite linear;
  }
  &:hover {
    background-color: ${(props) => props.theme.highlightPositive};
  }
`;

const DeleteBtn = styled.input`
  &:focus {
    animation: ${({ theme }) =>
        backgroundGradient(theme.backgroundDarker, theme.highlightNegative)}
      1s infinite linear;
  }
  &:hover {
    background-color: ${(props) => props.theme.highlightNegative};
  }
`;

const DiaryDate = styled.div`
  display: flex;
  margin-left: 10px;
  gap: 20px;
  justify-content: flex-end;
`;

const Context = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  & > * {
    margin: 0;
    padding: 10px;
    border-radius: 5px;
    background-color: ${(props) => props.theme.backgroundLighter};
    box-shadow: ${(props) => props.theme.boxShadow};
    width: 100%;
    line-height: 180%;
    overflow-wrap: break-word;
  }
`;

const DiaryTitle = styled.div`
  font-size: ${(props) => props.theme.fontSizes.l}px;
  font-weight: bold;
`;

const DiaryText = styled.div`
  white-space: pre-wrap;

  /* 코드 블록 전체 스타일 */
  pre {
    border-radius: 5px;
    line-height: 200%;
    overflow-x: auto; // 가로 스크롤 허용
    white-space: pre; // 줄바꿈 대신 원본 유지
    font-size: ${(props) => props.theme.fontSizes.s}px;
    font-weight: 600;
  }

  /* 인라인 코드 스타일 */
  code {
    font-family: "Courier New", monospace;
  }
`;

export default Read;

// /* 제목 */
// h1,
// h2,
// h3,
// h4,
// h5,
// h6 {
//   font-weight: bold;
//   margin: 1.2em 0 0.6em;
// }
// h1 {
//   font-size: 2em;
// }
// h2 {
//   font-size: 1.6em;
// }
// h3 {
//   font-size: 1.3em;
// }

// /* 문단 */
// p {
//   margin: 0.8em 0;
// }

// /* 리스트 */
// ul,
// ol {
//   margin: 0.8em 0 0.8em 1.5em;
//   list-style: disc;
// }
// ol {
//   list-style: decimal;
// }
// li {
//   margin: 0.4em 0;
// }

// /* 인용문 */
// blockquote {
//   margin: 1em 0;
//   padding-left: 1em;
//   border-left: 4px solid ${({ theme }) => theme.colors.text};
//   opacity: 0.8;
// }

// /* 구분선 */
// hr {
//   border: none;
//   border-top: 1px solid ${({ theme }) => theme.colors.text};
//   margin: 1.5em 0;
// }

// /* 테이블 */
// table {
//   border-collapse: collapse;
//   margin: 1em 0;
//   width: 100%;
// }
// th,
// td {
//   border: 1px solid ${({ theme }) => theme.colors.text};
//   padding: 6px 12px;
// }
// th {
//   background: ${({ theme }) => theme.colors.codeBackground};
// }

// /* 링크 */
// a {
//   color: ${({ theme }) => theme.colors.primary || "#1e90ff"};
//   text-decoration: underline;
// }
