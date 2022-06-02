
<img width="1243" alt="Screen Shot 2022-06-03 at 1 16 41 AM" src="https://user-images.githubusercontent.com/77870077/171676649-86f7ee65-e086-4b74-bfd8-a39a73cb33f0.png">


# 🐑 마피양
> 화상채팅으로 즐기는 온라인 마피아게임 마피양입니다.
> </br>
> 게임 특성상 실시간 소통을 가장 중요시 하며 즐겁게 제작했습니다.
<br/>

## ✨ 주요기능
- `게임` 투표시스템을 기반으로 누가 마피아인지 추론하며 게임을 즐겨요
- `채팅` 게임을 즐기며 채팅을 나눌 수 있어요! 특정직업끼리의 귓속말도 가능하답니다
- `화상` 실시간으로 화상을 공유하며 소통할 수 있어요

<details markdown="1">
<summary>주요 기능을 위해 사용된 기술</summary>

• Socket.io
- 백엔드와 프론트 환경이 node.js, 자바스크립트 기반인 점을 들어 스프링환경에서 사용하는 sockJS가 아닌 socket.io로 개발 진행하였음
- 기존의 단방향 통신인 HTTP 에도 폴링, 롱폴링 등의 방법이 있지만 서버와 클라이언트가 데이터를 교환하는 횟수가 늘어나면 가해지는 부하가 커지는점과, 지원되지 않는 브라우저가 존재한다는 점을 꼽아 웹소켓 라이브러리를 사용하여 단점을 상쇄하려고 하였음.

• WebRTC
- 실시간 화상 커뮤니케이션을 위해 브라우저 간 직접 통신하는 WebRTC를 사용하였으며, 처음에는 서버를 구축하고자 하였으나 3주 안에 완성을 하는 것을 목표로 하였기 때문에 IP와 포트번호를 대체한 peerId를 제공하는 peerJS 라이브러리를 도입
- 게임룸에 입장한 유저정보를 비디오와 함께 보여주기 위해 비디오를 포함한 추가 데이터  실시간 송수신
- RTC의 Signaling sever는 Socket 통신으로 동시성 제어

• CI/CD
- 게임 특성상 많은 변수가 생겼고 에러를 수정하고 수동 배포에 하는 시간이 점점 늘어나면서 github actions를 이용한 자동 배포를 도입했습니다. 커밋과 동시에 자동으로 s3 버킷에 빌드 된 파일이 올라가도록 하였으며 이는 배포 후에도 유저들의 피드백에 즉각적으로 처리에 매우 빠르고 효율적이었습니다.

</details>

<br />

## 📅 프로젝트 기간

> 2022.4.22 ~ 2022.6.3
> 
> 1차 배포 : 2022.5.25

<br />

## 📺 게임 플레이 사진
![image](https://user-images.githubusercontent.com/90598408/171531440-0d43a251-fa5d-46f9-86fa-21e7f5d112c4.png)

![image](https://user-images.githubusercontent.com/90598408/171531478-e12f9c45-a9df-45d5-87ba-e8eb30250018.png)


<br />


## 🎮 바로가기
- [서비스 바로가기](https://mafiyang.com)
- [프론트엔드 GitHub](https://github.com/Mafiagame-project/ReactFE)
- [백엔드 GitHib](https://github.com/dongsun1/last_project)
- [Team 노션](https://www.notion.so/TEAM-MAFIYANG-cb55eb1a08314f25bb1adef0231e9a7a)
- [시연영상](https://youtu.be/S_LhvYQpPkU)

<br />

## 🧑🏻‍💻 Team Member

| Name     | GitHub                             | Position  |
| -------- | ---------------------------------- | --------- |
| 조찬익🔰   | https://github.com/chamchipack    | 프론트엔드 |
| 김지나   | https://github.com/zzinao     | 프론트엔드 |
| 김동선🔰   | https://github.com/dongsun1        | 백엔드     |
| 이현승   | https://github.com/HYUNSEUNG91| 백엔드     |
| 김지수  |       | 디자이너    |


<br />

## 📚 기술스택
<div align=center><h3>프론트엔드</h1>
  <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"> 
  <img src="https://img.shields.io/badge/React-60d3f3?style=for-the-badge&logo=react&logoColor=black">
  <img src="https://img.shields.io/badge/Redux-7247b5?style=for-the-badge&logo=redux&logoColor=white"> 
  <br>
  <img src="https://img.shields.io/badge/styled-c260af?style=for-the-badge&logo=styledcomponents&logoColor=black">
  <img src="https://img.shields.io/badge/webrtc-333333?style=for-the-badge&logo=webrtc&logoColor=white">
  <img src="https://img.shields.io/badge/socket.io-000000?style=for-the-badge&logo=socket.io&logoColor=white">
  <br>
  <img src="https://img.shields.io/badge/cloud front-202c3c?style=for-the-badge&logo=amazonaws&logoColor=white">
  <img src="https://img.shields.io/badge/Amazon s3-569A31?style=for-the-badge&logo=Amazon S3s3&logoColor=white">
   <img src="https://img.shields.io/badge/github actions-2088FF?style=for-the-badge&logo=github actions&logoColor=white">
</div>

<div align=center> 
</div>


## 🕹 서비스 아키텍쳐
![아키텍쳐-수정](https://user-images.githubusercontent.com/77870077/171595223-8f1fb60b-bc49-41f6-80a4-bcb9c03df631.jpg)


## 📚 Library
|Name|Appliance|Version|
|:---:|:---:|:---:|
|React|리액트|18.0.0|
|React-redux|상태관리|8.0.1|
|Redux-actions|액션 관리|2.6.5|
|Redux-logger|리덕스 미들웨어|3.0.6|
|Redux-thunk|리덕스 미들웨어|2.4.1|
|React-dom|브라우저 렌더링|18.0.0|
|Axios|HTTP 클라이언트 라이브러리|0.26.1|
|connected-react-router|라우터|6.8.0|
|History|페이지 이동|4.10.1|
|Immer|불변성 유지|9.0.12|
|Socket.io-client|실시간 게임로직|4.4.1|
|peerJs|WebRTC 화상구현|1.3.2|
|formik|회원가입 폼 관리|2.2.9|
|Yup|회원가입 유효성 검사|0.32.11|
|Swiper|캐러셀 구현|8.1.5|
|dotenv|환경 변수 암호화|16.0.1|
|react-toastify|알림 팝업창|9.0.1|
|mui/material|rangeBar|5.6.4|
|Styled-components|CSS|5.3.5|


## 🔥  Trouble Shooting

<details markdown="1">
<summary>이벤트 리스너 처리</summary>

• 문제상황
- 투표 등 이벤트 발생 시 서버와 클라이언트 간 중복 통신 발생
- 응답받는 데이터의 수가 무한으로 늘어나는 이슈 발견
- 게임 방 생성시 A라는 사람이 게임룸을 만들 때 마다, 점차 A의 수가 늘어나는 현상 발생

• 해결방안
- 소켓의 이벤트리스닝이 중복으로 발생 : 중복 발생 억제
- 소켓 받는 부분을 한 곳으로 모아 리덕스로 관리
- 필요없어진 소켓을 off 처리

</details>

<details markdown="2">
<summary>WebRTC 데이터 전송</summary>
• 문제상황
- 게임룸에 입장한 유저의 비디오는 Peer로, 닉네임은 Socket으로 각각 통신이 되어 화면에 동시에 같이 띄울 시 유저들의 닉네임이 꼬이는 문제 발생
- 응답받는 데이터의 수가 무한으로 늘어나는 이슈 발견
- 게임 방 생성시 A라는 사람이 게임룸을 만들 때 마다, 점차 A의 수가 늘어나는 현상 발생

• 문제점 파악
- Peer와 Socket의 데이터 받아오는 속도가 서로 다르기 때문에 데이터 송수신 방식을 통일
  
  • 해결방안
- WebRTC가 비디오외의 다른 데이터도 주고받을 수 있다는 점을 활용
- Peer가 게임룸에 입장 시 peerId + 유저 닉네임을 송수신 후 비디오 스트림과 함께
닉네임 데이터를 받아 화면에 출력할 수 있도록 수정

</details>


<br />






