# Among Earth
`#구글 스트리트 뷰` `#가상여행` `#Gif`
구글 스트리트 뷰로 떠나는 가상여행 웹 애플리케이션

## Table of Contents

- [Introduction](#Introduction)
- [Features](#Features)
- [Usage](#Usage)
- [Stack](#Stack)
- [Deploy](#Deploy)
- [Project Process](#Project-Process)
- [Team Log](#Team-Log)

## Introduction

Among Earth는 구글스트리트 뷰를 이용한 가상 여행을 경험할 수 있는 웹 애플리케이션 입니다.

#### 시연 영상

[![구동 영상](/readmeAssets/among-earth-gif.gif)](https://youtu.be/Vq6zGkEZacg)

[프로젝트 스탠드업 영상](https://youtu.be/jMw5MIxLY3o?t=3998)

#### 배포 사이트

[배포 링크](https://www.among-earth.site)

#### Repository

- [Frontend](https://github.com/dohee3520/among-earth-frontend)
- [Backend](https://github.com/dohee3520/among-earth-backend)

#### 프로젝트 기간

2020년 11월 30일 ~ 12월 18일

- 기획, 구조 설계 (1주)
- 개발 진행 (2주)

#### Motivation

코로나19의 확산으로 언제 또 다시 해외여행을 떠날 수 있을지 판단이 불가능해지면서 각종 랜선여행 콘텐츠에 대한 수요가 증가 하고 있습니다. 저 또한 여행을 즐겨하던 사람으로써 이러한 여행 콘텐츠의 변화를 주시해왔고 저와 같은 **집구석 여행자들에게 다시 세상을 여행하는 듯한 기분을 느낄 기회를 제공해주는 애플리케이션이 있으면 어떨까?** 하는 생각을 토대로 기획 되었습니다. 누군가에겐 그리운 여행지를 다시 가보는 색다른 경험을, 누군가에겐 작은 휴식과 모험심을 느낄 수 있는 위안이 되었으면 하는 마음으로 제작되었습니다.

## Features

- Google Maps API를 이용한 랜드마크 추천 기능
- Google Maps Directions API를 잉ㅇ한 경유지 추가 기능
- 전체 이동경로 사이의 좌표값 및 스트리트 뷰 카메라 앵글 각도 게산
- Canvas를 활용한 동적인 애니메이션 효과
- AWS s3를 사용하여 모든 유저의 여행 정보 관리

## Usage

#### Requirements

- 최신 버전의 크롬 브라우저 사용을 권장합니다.

#### Installation

Local 환경에서 실행하기 위한 사전 준비가 필요합니다.

- [Google Maps API Key](https://firebase.google.com/?hl=ko)
- [MongoDB](https://www.mongodb.com/)
- [Open SSL](https://www.ibm.com/support/knowledgecenter/SSMNED_5.0.0/com.ibm.apic.cmc.doc/task_apionprem_gernerate_self_signed_openSSL.html)

#### Frontend

Root 디렉토리에 `.env` 파일을 생성하고, 사전에 준비한 Firebase API Key를 입력합니다.

```

REACT_APP_FIREBASE_API_KEY=<YOUR Firebase API Key>
REACT_APP_FIREBASE_AUTH_DOMAIN=<Your Firebase Auth Domain>

```

```

git clone https://github.com/sool-tok/sool-tok-frontend
cd sool-tok
npm install
npm start

```

#### Backend

Root 디렉토리에 `.env` 파일을 생성하고, 사전에 준비한 MongoDB Url과 JWT의 Secret Key를 입력합니다.

```

MONGODB_URL=<Your MongoDB URL>
TOKEN_SECRET_KEY=<Your JWT Signature Secret KEY>

```

```

git clone https://github.com/sool-tok/sool-tok-backend
cd sool-tok
npm install
npm start

```

## Stack

#### Frontend

- JavaScript ES2015+
- React
- Redux
- Styled-components
- Jest for unit-test
- Enzyme for component-test
- ESLint

#### Backend

- JavaScript ES2015+
- Node.js
- Express
- AWS S3 for updloading file
- Chai / Mocha / Supertest for unit-test
- ESLint

## Deploy

#### Frontend

- Netlify를 사용하여 애플리케이션 배포 및 관리

#### Backend

- AWS Elastic Beanstalk를 사용하여 애플리케이션 배포 및 관리
- Amazon ACM (AWS Certificate Manager)을 사용하여 SSL 관리
- https-client와 http-server 간의 연결을 위해 load-balancer 사용
- 파이프라인 연결 후 배포 자동화 구현

## Project Process

- 기술 스택 검토
- figma를 이용한 목업 설계
- 데이터베이스 스키마 설계
- Notion을 이용한 태스크 매니지먼트
- Git Repo를 구분하여 Client와 Server를 독립적으로 관리
- Git flow를 이용한 기능별 브랜치 관리

## Challenge & Learning Point

#### 두 지점 사이의 좌표들 산출, 그리고 두 지점의 스트리트 뷰 카메라 앵글 설정

앱 내에서 사용자가 경유지를 총 5개 까지 설정할 수 있게끔 구현했습니다. 자연스러운 스트리트뷰 애니메이션 구동을 위해선 지정해 놓은 5개의 좌표 사이 외에도 일정 간격만큼의 또 다른 좌표값들을 산출 해내야 했습니다. 따라서 재귀적으로 두 좌표 사이의 Midpoint를 구하는 공식을 사용해 전체 경로의 좌표값을 구하는 계산을 진행했습니다. 하지만 각 경로의 거리가 모두 다르기 때문에 전체 거리 제한을 둔다고 해도 모든 상황을 예측할 수 없을 뿐더러 경로에 직선구간만 존재하지 않는다는 점 때문에 만족스럽지 못했습니다. 더 찾아보니 구글 경로 API에서 보내주는 응답에 제가 원하는 좌표값들이 포함되어 있다는 것을 알고 이를 사용해 알고리즘을 완성 할 수 있었습니다.

위의 과정으로 산출된 좌표값들 사이의 각도를 `Math.atan2()` 를 이용해 구했습니다. `atan2()` 는 두 점 사이의 평면 각도를 반환합니다. 모든 좌표의 방위각을 구해야 했기 때문에 이 또한 재귀를 통해 계산 할 수 있었고, 각 좌표의 위,경도 값과 카메라 앵글을 Street View API 의 요청 매개변수로 지정해주어 데이터를 가져 올 수 있었습니다. 후에는 Google Geometry API 에 있는 `ComputeHeading` 메소드를 사용해 불필요한 로직을 줄일 수 있었습니다.

#### 캔버스의 Fps 조절하기

캔버스 애니메이션을 자연스럽게 연결시키기 위해 requestAnimationFrame 을 사용 할 수 있습니다. requestAnimationFrame 메서드는 브라우저에 애니메이션을 수행하고 싶다고 요청하면 브라우저가 다음 애니메이션을 그리기 전에 애니메이션을 업데이트 하기 위해 지정된 함수를 호출하도록 요청합니다. 하지만 Google Street View API를 통해 가져온 이미지들을 requestAnimatonFrame(rAF) 을 통해 하나씩 보여주려고 하니 애니메이션의 속도 조절이 중요했습니다. rAF는 가장 이상적인 프레임 속도인 60FPS를 제공해주기 때문에 24FPS로 애니메이션이 실행되게끔 설정해 두어도 각 컴퓨터의 성능에 따라서 프레임 속도가 달라질 수 있습니다. 따라서 window.performance.now() 라는 고해상도 타이머를 이용해 페이지가 로드 되기 시작한 이후의 밀리세컨즈를 측정하여 프레임 속도를 조절하게끔 하였습니다.

## Things To Do

1. 캔버스 애니메이션 버벅임 최소화
2. Redis DB를 도입시켜 데이터 응답 시간 최소화

## Conclusions

## 주도적 계획과 능동적 실행

개인프로젝트를 진행함에 앞서 걱정이 컸습니다. 팀 프로젝트 때는 팀원들 끼리 회의를 자주 진행한 후 결과를 도출해 냈지만, 기획과 실행 모두를 스스로 결정하여 진행하다보니 '내가 이렇게 하는게 맞는건가?' 라는 생각에 난관을 많이 겪었습니다. 하지만 프로젝트를 모두 끝낸 시점에서 되돌아보니 무엇을 고민했고, 어떤 문제점을 정확히 파악해 어떻게 개선시켰는가의 모든 과정을 스스로 해냈다는게 이 프로젝트에서 가장 많이 배운 점입니다.

## 아키텍처의 중요성

기획 초반에 세밀한 구성 설계를 했다고 생각했음에도 불구하고 예기치 못한 상황 때문에 계획을 일부 수정해야 했습니다. 초반 설계과정에서는 모든 이미지를 gif로 변환을 시킨 후 이를 s3에 저장시키는 것이였으나, 하나의 gif를 만들기 위해서는 평균 100개정도의 이미지가 사용되어야 하기 때문에 불필요한 데이터베이스 낭비가 발생 할 수 있었습니다. 따라서 이를 캔버스에 애니메이션화 시키는 방법으로 변경시켰으나, 이러한 상황을 미리 기획단계에 구체적으로 고민하고 설계했다면 구현에 더욱 집중할 수 있을 것 같다는 아쉬움이 남아 아키텍처의 중요성을 상기했습니다.