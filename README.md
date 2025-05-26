# 모여라IT 
## 프로젝트 소개

### 시작하기

```bash

yarn dev

```

- 배포 url
- test id/password

## 아키텍처

**화면 구성/API**

- 파일 구조도

### components - atomic 디자인 : 중복되는 컴포넌트들 간의 재사용성을 높이기 위해 채택하였습니다. 
```
─ components/
  ├── ui/ -> shadcn/ui 
  ├── atoms/  -> 더 이상 분리될 수 없는 component
  ├── molecules/ -> atoms가 조합된 UI, 단일 기능을 수행하는 컴포넌트 
  ├── organisms/ -> molecules & atoms가 조합된 UI 영역, 페이지 내에서 독립적인 구조를 가짐
  └── templates/

```

## 주요 기능

- **프로젝트 주요 기능**
- 프론트의 경우 이미지를 함께 첨부해도 좋습니다.

## 트러블 슈팅

- 트러블 슈팅 경험에 대해 기술해 주세요.

## 사용 기술

**기술 스택, 사용 기술**

- 사용한 기술과 라이브러리

## 환경 변수
.env 파일 설정해두셔야합니다. 

```
NEXT_PUBLIC_API_BASE_URL=base api server
ACCESS_TOKEN=access token name
REFRESH_TOKEN=refresh token name
```