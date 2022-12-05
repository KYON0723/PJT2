# Branch Name Convention

- 참고

  ```
  master  : 기준이 되는 브랜치로 제품을 배포하는 브랜치 입니다.
  develop : 개발 브랜치로 개발자들이 이 브랜치를 기준으로 각자 작업한 기능들을 합(Merge)칩니다.
  feature : 단위 기능을 개발하는 브랜치로 기능 개발이 완료되면 develop 브랜치에 합칩니다.
  release : 배포를 위해 master 브랜치로 보내기 전에 먼저 QA(품질검사)를 하기위한 브랜치 입니다.
  hotfix  : master 브랜치로 배포를 했는데 버그가 생겼을 떄 긴급 수정하는 브랜치 입니다.
  ```


### master branch

- 기준이 되는 브랜치로 제품을 배포하는 브랜치 입니다

### develop branch

- 개발 브랜치로 개발자들이 이 브랜치를 기준으로 각자 작업한 기능들을 합(Merge)칩니다

### feature branch

- 단위 기능을 개발하는 브랜치로 기능 개발이 완료되면 develop 브랜치에 합칩니다.
- feature branch naming convention
  - feature/{position}/{domain}/{verb}
    - feature/be/member/login
    - feature/fe/category/create
    - feature/ai/todo/create
- position 은 be, fe , ai

### fix branch

- 오류, 버그 수정

### refactor branch

- 컨벤션, 로직 수정

# Commit Message Convention

### **타입(Type)**

- Feat - 새로운 기능 추가
- Fix - 버그 수정
- Build - 빌드 관련 파일 수정
- Ci - CI관련 설정 수정
- Docs - 문서 (문서 추가, 수정, 삭제)
- Style - 스타일 (코드 형식, 세미콜론 추가: 비즈니스 로직에 변경 없는 경우)
- Refactor - 코드 리팩토링
- Test - 테스트 (테스트 코드 추가, 수정, 삭제: 비즈니스 로직에 변경 없는 경우)
- Chore - 기타 변경사항 (빌드 스크립트 수정 등)

### 제목**(Subject)**

- 제목은 50자를 넘기지 않고, 마침표를 붙이지 않습니다.
- 제목에는 commit 타입을 함께 작성합니다.
- 과거 시제를 사용하지 않고 명령조로 작성합니다.
- 제목의 첫 글자는 반드시 대문자로 씁니다.
- 이슈 번호가 명확 할 때는 뒤에 작성할 것을 권장합니다.

ex)

```bash
git commit -m "Feat: 로그인 기능 구현 [#이슈번호]"

git commit -m "Feat: 로그인 기능 구현 [#S07P11D202-21][#17]"

git commit -m "Feat: 로그인 기능 구현" 
```

## Issue

- 다른 사람들이 문제점 찾았을 때 이슈 발급.
- 앞에 `[관련 부서 이름] 문제점` 순으로 적기