import citizenImg from '../assets/image/character/양_시민.png'
import mafiaImg from '../assets/image/character/늑대_.png'
import doctorImg from '../assets/image/character/의사_양.png'
import policeImg from '../assets/image/character/경찰.png'
import reporterImg from '../assets/image/character/양_기자.png'

export default [
  {
    id: 1,
    name: 'citizen',
    title: '시민',
    explain:
      '마피양 게임의 가장 기본적인 직업군이다.다른 양들과 함께 양인 척하는 늑대를 잡아 마피양 마을의 평화를 지켜야 한다. 특별한 능력은 없다.',
    img: citizenImg,
  },
  {
    id: 2,
    name: 'mafia',
    title: '마피아',
    explain:
      '마피양 마을에서 양인 척하며 양들을 잡아먹는 늑대이다. 마피아는 밤마다 양을 한 마리씩 잡아먹을 수 있다.',
    img: mafiaImg,
  },
  {
    id: 3,
    name: 'doctor',
    title: '의사',
    explain:
      '마피양 마을에서 병원을 운영하는 의사 양이다. 시민 양들과 함께 늑대를 잡는 것이 목표이다. 의사 양은 밤마다 본인을 제외한 다른 사람들을 살릴 수 있다.',
    img: doctorImg,
  },
  {
    id: 4,
    name: 'police',
    title: '경찰',
    explain:
      '마피양 마을을 지키는 경찰 양이다. 시민 양들과 함께 늑대를 잡는 것이 목표이다. 경찰 양은 밤마다 누가 마피아인지 아닌지 정체를 탐색할 수 있다.',
    img: policeImg,
  },
  {
    id: 5,
    name: 'reporter',
    title: '기자',
    explain:
      '마피양 마을에 수상한 일이 벌어진 것을 보고 취재하러 온 기자 양이다. 기자는 한 게임에 딱 한 번 능력을 사용하여 선택한 양의 직업을 모두에게 밝힐 수 있다.',
    img: reporterImg,
  },
]
