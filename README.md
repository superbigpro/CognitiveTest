# CognitiveTest

## 기능

- 위에 위치한 심볼 패널을 보고 캐로셀에 나와있는 기호를 아래 다이얼에서 선택합니다.
- 검사가 끝난 후 평균 반응 시간, 가장 빠른 반응시간 등의 정보를 표시합니다.

## 프로젝트 구조

- src/

  - assets/ : 심볼 이미지 등 리소스 파일

  - components/ : UI 컴포넌트

    - NumberDial.tsx : 숫자 선택 다이얼 UI
    - QuestionCarousel.tsx : 문제 심볼을 보여주는 캐러셀
    - ReferencePanel.tsx : 상단 심볼-숫자 참조 패널
    - TestResultModal.tsx : 테스트 결과 모달

  - constant/ : 앱에서 사용하는 상수값 정의

    - 색상, 크기, 텍스트 등 하드코딩 방지

  - libs/ : 비즈니스 로직 및 유틸리티 함수

    - testUtils.ts : 테스트 데이터 생성, 결과 계산 함수
    - testHandlers.ts : 이벤트 처리 로직 (숫자 선택 등)

  - screens/ : 화면 단위 컴포넌트

    - Test.tsx : 메인 테스트 화면 및 상태 관리

  - types/ : 타입 정의
    - index.ts : SymbolItem, ResponseTime 등 타입 정의

### 주요 파일별 역할

- **Test.tsx**:
  앱의 핵심 화면으로 테스트 진행 상태, 점수 관리, 사용자 응답 처리를 담당합니다.
  React useState를 통해 상태를 관리하며, 자식 컴포넌트들에게 props로 데이터 전달합니다.

- **NumberDial.tsx**:
  사용자가 숫자를 선택할 수 있는 다이얼 UI를 제공합니다.
  사용자가 선택한 숫자는 Test 컴포넌트로 전달됩니다.

- **testHandlers.ts**:
  숫자 선택 시 실행되는 복잡한 로직을 분리해 관리합니다.
  정답 체크, 응답 시간 기록, 테스트 완료 처리 등을 담당합니다.

- **testUtils.ts**:
  테스트 데이터 생성 및 결과 계산 관련 유틸리티 함수들을 포함합니다.
  랜덤 문제 생성, 성능 통계 계산 등을 처리합니다.

## 로컬에서 실행하기

```bash
git clone https://github.com/superbigpro/CognitiveTest

npm install

npm run ios / npm run android
```
