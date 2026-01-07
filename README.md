배포 버전: v5

button type inputs:
포커스가 가능하도록 하고, tab / shift + tab 으로 이동할 수 있게 함.
포커스가 Layout-main 밖으로 벗어나지 않고 순환하도록 가두어 둠.
모달이 활성화 되었을 때는 모달 밖으로 벗어나지 않고 순환하도록 가두어 둠.

state flow:
노드 사이에 setter prop이 매개변수로 전달되던 로직을 모두 제거하고,
callback 함수를 통해 해당 기능을 대체함.

style bug fix(Diary, Read):
-web-kit-box 와 pre-wrap 이 충돌하여 줄바꿈이 안되던 버그 해결

UI:
모달창의 크기가 UIScale 의 영향을 받도록 함.

auth:
DB 접근에 관한 모든 request에 대해 쿠키를 통한 인증 여부(로그인 여부)를 검사하도록 함.

api:
user / auth / diary 세 가지로 분류하여 관리.

atom:
user / diary 두 가지로 분류하여 관리.

Diaries:
Board 로 이름 변경
본인이 작성한 diary들만 서버로부터 불러올 수 있도록 함.

Diary:
다이어리의 고유 아이디, 작성자 아이디, 작성 시점, 마지막 수정 시점 정보를 포함하게 하여 더 자세한 정보를 알 수 있게 함.
작성 시점은 상대시간과 절대시간 두 가지 버전으로 보여주어 더 쉽게 파악할 수 있도록 개선함.

RESTful API:
api들을 RESTful 원칙에 맞게 재구성함
서버와 클라이언트 간에 불필요하게 과한 정보를 포함하여 주고 받던 기존의 api들을 수정하여 최소한의 필요한 정보만을 주고 받도록 개선함.

tempSave:
기능 삭제함.

login:
email 로 로그인 여부를 판별하던 기존의 방식을 버리고
github id를 직접 사용하여 판별하도록 수정함

UI/UX:
다이어리 내용을 마크다운 문서의 형태로 출력되도록 하여 UX 개선.

UI/UX:
Read 라우트에 홈으로 이동할 수 있는 "뒤로" 버튼을 추가하여 UX 개선

기타:
프로젝트 이름 변경 (oauth practice -> my-memo)
