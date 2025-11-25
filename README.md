배포 버전: v4

Nickname:
중복 검사 기능 추가.

Modal:
모달 호출 및 실행 로직 개선.
컴포넌트 내 로직과 모달 내 로직 간의 동기성 이슈 해결.
백그라운드 클릭 시 닫기 기능 추가.
modalOption 추가. 선택지 형태에 따라 YesNo 모달, Range 모달로 구분.
logOut, Write 모달 추가.

userConfig:
사용자가 UI scale 을 4 단계로 조절할 수 있도록 하는 기능 추가.

useTypeGuard:
타입 안정성 강화를 위해 타입 검사 로직을 담당하는 훅 추가.

Diary & tempDiary:
tempDiary 사용 목적과 조건을 고려하여 localStorage 대신 sessionStorage를 사용하도록 변경.
diary 의 상태 관리성 개선.
저장 로직 개선.

기타:
컴포넌트, 라우트 파일명 표준화.
각종 eventListener 메모리 누수 이슈 해결.
